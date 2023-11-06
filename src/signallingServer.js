export let signallingServerAddress = '';
export let application = '';
export let branch = '';
export let userMode = 'View';

// define our signallingServerProtocol to be used based on whether
// or not we're accessing our frontend via a tls
let signallingServerProtocol = 'ws:';
if (window.location.protocol === 'https:') {
  signallingServerProtocol = 'wss:';
}

export function getUserMode() {
  return userMode;
}

export function setUserMode(newMode) {
  userMode = newMode;
}

function extractAppName(url) {
  const urlParts = url.split('/');

  if (urlParts.length > 1) {
    if (urlParts[1] === 'edit')
      return urlParts.length > 2 ? urlParts[2] : urlParts[0].split('.')[0];
    else
      return urlParts[1];
  } else {
    return urlParts[0].split('.')[0];
  }
}

function getUrlPart(url) {
  url = url.startsWith('https://')
    ? url.slice('https://'.length)
    : url;

  url = url.startsWith('http://')
    ? url.slice('http://'.length)
    : url;

  url = url.replace(/\/$/g, '');

  const baseUrlRegex = /(.+)\.palatialxr\.com(\/edit)?/;

  if (!url.match(baseUrlRegex)) {
    return null;
  }

  branch = url.match(baseUrlRegex)[1];

  if (url.includes("/edit")) {
    userMode = 'Edit';
  }

  return extractAppName(url);
}

const lookupProjectId = async (data) => {
  try {
    const response = await fetch('https://api.palatialxr.com/v1/lookup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });

    if (response.ok) {
      console.log('ok');
      const data = await response.json();
      console.log(data);
      if (data.length === 1) {
        application = data[0].projectId;
        console.log('Editing ' + application);
      }
    } else {
      console.error('Lookup request failed');
    }
  } catch (error) {
    console.error(error);
  }
};

application = getUrlPart(window.location.href);

if (application === null) {
  console.log("Could not parse URL for application. Defaulting to dev");
  application = "dev";
}

if (userMode === 'Edit') {
  await lookupProjectId({ name: `edit/${application}` });
}

// build the websocket endpoint based on the protocol used to load the frontend
signallingServerAddress = signallingServerProtocol + '//' +
  'sps.tenant-palatial-platform.lga1.ingress.coreweave.cloud/' + application + '/ws';

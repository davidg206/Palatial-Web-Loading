export let signallingServerAddress = '';
export let application = '';
export let branch = '';
export let userMode = 'View';
export let projectId = '';

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

const lookup = async (data) => {
  try {
    const response = await fetch('https://api.palatialxr.com/v1/lookup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });

    if (response.ok)
      return await response.json();
    console.error('Lookup request failed');
  } catch (error) {
    console.error(error);
  }
}

application = getUrlPart(window.location.hostname + window.location.pathname);
if (application === null) {
  console.log("Could not parse URL for application. Defaulting to dev");
  application = "dev";
}

async function initialize() {
  if (userMode === 'Edit') {
    console.log(`edit/${application}`);

    const p1 = await lookup({ "payload.application": `edit/${application}` });
    const p2 = await lookup({ event: "import complete", subjectId: p1.subjectId });

    projectId = p1.subjectId;
    application = p2.application;
  } else {
    const p = await lookup({ application: application });
    console.log("result = ", p);
    if (p) {
      projectId = p.subjectId;
    }
  }

  application = application.toLowerCase();

  console.log('ProjectId: ' + projectId);
  console.log('application = ' + application);
  // build the websocket endpoint based on the protocol used to load the frontend
  signallingServerAddress = signallingServerProtocol + '//' +
    'sps.tenant-palatial-platform.lga1.ingress.coreweave.cloud/' + application + '/ws';
}

await initialize();

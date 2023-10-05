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

application = getUrlPart(window.location.href);

if (application === null) {
  console.log("Could not find application in URL. Defaulting to dev");
  application = "dev";
}

// build the websocket endpoint based on the protocol used to load the frontend
signallingServerAddress = signallingServerProtocol + '//' +
  'sps.tenant-palatial-platform.lga1.ingress.coreweave.cloud/' + application + '/ws';

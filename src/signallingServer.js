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

function getUrlPart(url) {
  url = url.startsWith('https://')
    ? url.slice('https://'.length)
    : url;

  url = url.startsWith('http://')
    ? url.slice('http://'.length)
    : url;

  const baseUrlRegex = /(.+)\.palatialxr\.com(\/edit)?/;
  const projectUrlRegex = /^(.+)\.palatialxr\.com(?:\/(?:edit\/)?)?(\w+)$/;

  if (url.match(baseUrlRegex)) {
    branch = url.match(baseUrlRegex)[1];
  }

  if (url.includes("/edit")) {
    userMode = 'Edit';
  }

  if (url.match(projectUrlRegex)) {
    return url.match(projectUrlRegex)[2];
  } else if (url.match(baseUrlRegex)) {
    return url.match(baseUrlRegex)[1];
  } else {
    return null;
  }
}

application = getUrlPart(window.location.href);

if (application === null) {
  application = "dev";
}

// build the websocket endpoint based on the protocol used to load the frontend
signallingServerAddress = signallingServerProtocol + '//' +
  'sps.tenant-palatial-platform.lga1.ingress.coreweave.cloud/' + application + '/ws';

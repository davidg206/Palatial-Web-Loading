export let signallingServerAddress = '';
export let application = '';

// define our signallingServerProtocol to be used based on whether
// or not we're accessing our frontend via a tls
let signallingServerProtocol = 'ws:';
if (window.location.protocol === 'https:') {
  signallingServerProtocol = 'wss:';
}

application = window.location.hostname.split('.');

if (application.length < 2)
  application = "dev";
else
  application = application[0];
if (!/^[a-zA-Z0-9]+$/.test(application))
  application = "dev";

// build the websocket endpoint based on the protocol used to load the frontend
signallingServerAddress = signallingServerProtocol + '//' +
  'sps.tenant-palatial-platform.lga1.ingress.coreweave.cloud/' + application + '/ws';

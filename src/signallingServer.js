<<<<<<< HEAD
    export let signallingServerAddress = '';
    export let application = '';
    let apps = ["demo","dev","banyan","epic","prophet","tankhouse","officedemo","test","andpartners","experimental"];
    if (signallingServerAddress == '') {
        // define our signallingServerProtocol to be used based on whether
        // or not we're accessing our frontend via a tls
        var signallingServerProtocol = 'ws:';
        if (window.location.protocol === 'https:') {
            signallingServerProtocol = 'wss:';
        }
        application = window.location.hostname.split('.');

        if (application.length === 0)
		application = "demo";
	else
		application = application[0];
	if (!/^[a-zA-Z0-9]+$/.test(application) || !apps.includes(application)) {
            application = "demo";
        }
        // build the websocket endpoint based on the protocol used to load the frontend
        signallingServerAddress = signallingServerProtocol + '//' + 'sps.tenant-palatial-platform.lga1.ingress.coreweave.cloud/' + application;
        // if the frontend for an application is served from a base-level domain
        // it has a trailing slash, so we need to account for this when appending the 'ws' for the websocket ingress
        signallingServerAddress += '/ws';
    }
=======
export let signallingServerAddress = '';
export let application = '';

// define our signallingServerProtocol to be used based on whether
// or not we're accessing our frontend via a tls
let signallingServerProtocol = 'ws:';
if (window.location.protocol === 'https:') {
  signallingServerProtocol = 'wss:';
}
>>>>>>> d6cbc96bac98e28ea3fc42733fe07527aecc22ba

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

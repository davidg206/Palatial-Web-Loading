    export let signallingServerAddress = '';
    export let application = '';
    if (signallingServerAddress == '') {
        // define our signallingServerProtocol to be used based on whether
        // or not we're accessing our frontend via a tls
        var signallingServerProtocol = 'ws:';
        if (window.location.protocol ===
            'https:') {
            signallingServerProtocol = 'wss:';
        }
        application = window.location.hostname.split('.');

        if (application.length === 0)
		application = "demo";
	else
		application = application[0];
	if (!/^[a-zA-Z0-9]+$/.test(application)) {
            application = "demo";
        }
        // build the websocket endpoint based on the protocol used to load the frontend
        signallingServerAddress = signallingServerProtocol + '//' + 'sps.tenant-palatial-platform.lga1.ingress.coreweave.cloud/' + application;
        // if the frontend for an application is served from a base-level domain
        // it has a trailing slash, so we need to account for this when appending the 'ws' for the websocket ingress
        signallingServerAddress += '/ws';
	console.log(signallingServerAddress);
    }


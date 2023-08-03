import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { delegate, emitUIInteraction, config, playerElement } from './DOMDelegate';
import { signallingServerAddress, application } from './signallingServer';
import { isDesktop, isIPad13, isTablet, isMobile, osName, browserName } from 'react-device-detect';
import { port, waitForLevelReady, waitForProjectName, getScreenOrientation, onPlayAction } from './utils/miscUtils';

var libspsfrontend = require("backend-dom-components-1");


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
console.log(signallingServerAddress);
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

delegate.onStreamReady(async () => {
  delegate.onPlayAction();
  console.log(application, `joining ${process.env.REACT_APP_VIRT_DNS_ADDRESS}:` + process.env.REACT_APP_DEDICATED_SERVER_PORT);
  emitUIInteraction({
    join: `${process.env.REACT_APP_VIRT_DNS_ADDRESS}:` + process.env.REACT_APP_DEDICATED_SERVER_PORT,
    orientation: isMobile ? getScreenOrientation() : ""
  });
  delegate.loadingProgress = 90;
  waitForLevelReady().then(async () => {
    delegate.loadingProgress = 100;
  }).catch(error => {});
});

if (isMobile) {
  window.addEventListener('orientationchange', () => {
    emitUIInteraction({ orientation: getScreenOrientation() });
  });
}

/*let backgroundImage = 'default-background';
switch (application) {
case "osloworks": case "oslodemo":
  backgroundImage = 'oslo-background';
  break;
case "abnormal":
  backgroundImage = 'abnormal-background';
  break;
}

document.addEventListener('DOMContentLoaded', () => {
  document.body.classList.add(backgroundImage);
});*/

// Create and return a new webRtcPlayerController instance
var RTCPlayer = create(config, delegate);

// create takes in a delegate interface type which our NativeDomDelegate class implements
function create(config, delegate) {
  return new libspsfrontend.webRtcPlayerController(config, delegate);
}

// On a touch device we will need special ways to show the on-screen keyboard.
if ('ontouchstart' in document.documentElement) {
    config.isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !('MSStream' in window);
    createOnScreenKeyboardHelpers(playerElement);
}

function createOnScreenKeyboardHelpers(
    htmlElement) {
    var hiddenInput = null;
    var editTextButton = null;
    if (document.getElementById('hiddenInput') === null) {
        hiddenInput = document.createElement('input');
        hiddenInput.id = 'hiddenInput';
        //hiddenInput.maxLength = 0;
        hiddenInput.type = 'text';
        hiddenInput.autocomplete = "off";
        hiddenInput.autocapitalize = "off";
        if (!config.isIOS)
            hiddenInput.style.width = "0px";
        htmlElement.appendChild(hiddenInput);
    }
    hiddenInput.addEventListener('input',
        function (event) {
            if (hiddenInput.value.length > 1) {
                hiddenInput.value = hiddenInput.value.slice(1);
            }
            var lastChar = hiddenInput.value[0];
            if (!config.isIOS && event.inputType != 'deleteContentBackward')
                document.onkeypress(new KeyboardEvent("keypress", {
                    charCode: lastChar.charCodeAt(0)
                }));
        });

    hiddenInput.addEventListener('keydown', function (event) {
        if (event.keyCode === 13) { // check if the key pressed is "Enter"
            hiddenInput.blur(); // remove the focus from the input element
        }
    });

    if (document.getElementById('editTextButton') === null) {
        editTextButton = document.createElement('button');
        editTextButton.id = 'editTextButton';
        editTextButton.innerHTML = 'edit';
        htmlElement.appendChild(editTextButton);
        // Hide the 'edit text' button.
        editTextButton.classList.add('hiddenState');
        editTextButton.addEventListener("touchend", (function (e) {
            hiddenInput.focus();
            hiddenInput.setSelectionRange(hiddenInput.value.length, hiddenInput.value.length);
            editTextButton.classList.add('hiddenState');
            e.preventDefault();
        }));
    }
    libspsfrontend.DataChannelController.hiddenInput = hiddenInput;
    libspsfrontend.DataChannelController.editTextButton = editTextButton;
}

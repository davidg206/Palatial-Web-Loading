import 'react-app-polyfill/ie11';
import 'core-js/features/array/find';
import 'core-js/features/array/includes';
import 'core-js/features/number/is-nan';

import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { isMobile } from 'react-device-detect';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { delegate, sendCommand, emitUIInteraction, config, playerElement } from './DOMDelegate';
import { signallingServerAddress, branch, application, getUserMode, setUserMode, projectId } from './signallingServer';
import { waitForLevelReady, getScreenOrientation, onPlayAction } from './utils/miscUtils';

const libspsfrontend = require("backend-dom-components-1");
//const jwt = require('jsonwebtoken');

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

const deleteInstance = async (instanceId) => {
  await fetch('https://api.palatialxr.com/v1/remove-instance', {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      podName: instanceId
    })
  });
};

const urlParams = new URLSearchParams(window.location.search);

const token = urlParams.get('access_token');

if (token) {
  const response = await fetch('https://api.palatialxr.com/v1/mythia-jwt', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      token: token,
      secret: process.env.REACT_APP_MYTHIA_JWT_SECRET
    })
  });

  if (response.ok) {
    const data = await response.json();
    if (getUserMode() === "Edit" && !data.editAllowed) {
      //console.error('Not allowed to edit');
      delegate.onStreamReady(async () => {
        //sendCommand("disconnectUser");
        //deleteInstance(delegate.id);
      });
    }
  }
} else {
  // redirect to https://palatial.mithyalabs.com/project/${projectId}/share?redirect=true
   delegate.onStreamReady(async () => {
     //sendCommand("disconnectUser");
     console.log('deleting');
     //await deleteInstance(delegate.id)
   });
}

delegate.onStreamReady(async () => {
  const response = await fetch('https://api.palatialxr.com/v1/send-message', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      event: "log instance",
      createdAt: new Date(),
      subjectId: projectId,
      subjectType: "projects",
      payload: {
        podName: delegate.id,
        streamURL: window.location.href,
	pixelStreamingId: delegate.id,
        isRequestingEdit: getUserMode() === 'Edit'
      }
    }),
  });

  console.log('Project ID: ' + projectId);

  if (response.ok) {
    const data = await response.json();
    console.log('Message sent successfully');
    console.log('PixelStreamingID: ' + data.podName);
  } else {
    console.error('Error sending message');
  }

  delegate.onPlayAction();
  const dropdown = document.getElementById('dropdown');
  if (dropdown) {
    console.log('Setting the new usermode to ' + dropdown.value);
    setUserMode(dropdown.value);
    dropdown.disabled = true;
  }

  console.log('Sending { UserMode: ' + getUserMode() + ' }');
  emitUIInteraction({ UserMode: getUserMode() });

  const port = process.env['REACT_APP_DEDICATED_SERVER_PORT_' + application.toUpperCase()];
  console.log(`joining ${process.env.REACT_APP_VIRT_DNS_ADDRESS}:${port}`);
  emitUIInteraction({
    join: `${process.env.REACT_APP_VIRT_DNS_ADDRESS}:${port}`,
    orientation: isMobile ? getScreenOrientation() : ""
  });
  delegate.loadingProgress = 90;
  waitForLevelReady().then(async () => {
    delegate.loadingProgress = 100;
    if (delegate.formSubmitted) {
      onPlayAction();
    }
  }).catch(error => {});
});

window.addEventListener('orientationchange', () => {
  emitUIInteraction({ orientation: getScreenOrientation() });
});

document.getElementById('root').classList.add(`${application}-background`);

// Check if the current URL matches the desired URL
if (branch === "dev") {
  // Create the new HTML element
  const newElement = document.createElement("div");
  newElement.className = "holder";

  const buttonElement = document.createElement("button");
  buttonElement.type = "button";
  buttonElement.id = "bt1";

  const imgElement = document.createElement("img");
  imgElement.src = "https://orig00.deviantart.net/4c1b/f/2009/060/d/f/round_glossy_green_button_by_fbouly.png";

  buttonElement.appendChild(imgElement);
  newElement.appendChild(buttonElement);

  buttonElement.addEventListener('click', () => { emitUIInteraction({ print: "str" }); console.log('printed'); });
  // Add the new element to the body
  document.body.appendChild(newElement);
}

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
            if (!config.isIOS && event.inputType !== 'deleteContentBackward')
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

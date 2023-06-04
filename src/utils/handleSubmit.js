import { osName, browserName } from 'react-device-detect';
import { delegate, emitUIInteraction, config } from '../DOMDelegate';
import React, { useState, useEffect, useRef } from 'react';

const handleSubmit = (userName, password, firstTimeUser, consentAccepted, device, setFormStep, setStep, setProgress) => {
  if (userName && password && firstTimeUser !== null && consentAccepted) {
    const port = {
      tankhouse: 1111,
      dev: 2222,
      officedemo: 3333,
      epic: 4444,
      demo: 5555,
      prophet: 7777,
    };

    const data = {
      deviceType: device,
      osName: osName,
      browserName: browserName,
      mobileUser: config.isMobile,
      userName: userName,
      consentAccepted: consentAccepted,
      firstTimeUser: firstTimeUser ? "Yes" : "No",
      password: password,
      timestamp: new Date().getTime(), // current time in Epoch time
      join: 'palatial.tenant-palatial-platform.coreweave.cloud:' + port[delegate.appName]
    };

    const passwordQuery = (password) => {
      return new Promise((resolve, reject) => {
        const checkPassword = () => {
          if (delegate.passwordResponse) {
            resolve(delegate.passwordResponse.data.isValid);
          } else {
            setTimeout(checkPassword, 100);
          }
        };
      });
    };

    const waitForLevelReady = () => {
      return new Promise((resolve, reject) => {
        const checkReady = () => {
          if (delegate.levelReady) {
            resolve(true);
          } else {
            setTimeout(checkReady, 100);
          }
        };
        checkReady();
      });
    };

    const proceedButton = document.querySelector('.proceedButton');

    const videoElement = document.getElementById("myVideo");
    videoElement.play();

    delegate.checkStreamReady(async () => {
      emitUIInteraction(data);

      document.querySelector(".loadingStep").textContent = "Starting";

      waitForLevelReady().then(() => {
        const root = document.getElementById("root");
        const player = document.getElementById("player");
        delegate.loadingProgress = 100;

        root.classList.add("fade-out");
        setFormStep(1);
        delegate.levelReady = false;
        document.querySelector(".loadingStep").textContent = "Ready";
      }).catch((e) => {
	console.log(e);
      });
    });
  } else {
    // handle incomplete form
  }
};

export default handleSubmit;

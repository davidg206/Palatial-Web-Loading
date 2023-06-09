import { osName, browserName, isMobile } from 'react-device-detect';
import { delegate, emitUIInteraction } from '../DOMDelegate';
import React, { useState, useEffect, useRef } from 'react';
import { waitForLevelReady } from './awaitMethods';

const handleSubmit = (userName, password, firstTimeUser, consentAccepted, device, setFormStep) => {
  if (userName && password && firstTimeUser /*&& consentAccepted*/) {
    const port = {
      tankhouse:  1111,
      dev:        2222,
      officedemo: 3333,
      epic:       4444,
      demo:       5555,
      prophet:    7777,
      "45Main":  3333,
      PalatialDev: 2222
    };

    const data = {
      deviceType: device,
      osName: osName,
      browserName: browserName,
      mobileUser: isMobile,
      userName: userName,
      consentAccepted: consentAccepted,
      firstTimeUser: firstTimeUser ? "Yes" : "No",
      password: password,
      timestamp: new Date().getTime(), // current time in Epoch time
    };

    const loadingStep = document.querySelector('.loadingStep');
    const videoElement = document.getElementById("myVideo");
    videoElement.play();

    waitForLevelReady(delegate).then(() => { emitUIInteraction(data); }).then(() => {
      delegate.loadingProgress = 100;
      console.log('Entering palatial.tenant-palatial-platform.coreweave.cloud:' + port[delegate.appName]);
      const root = document.getElementById("root");
      const player = document.getElementById("playerUI");
      player.classList.remove("no-events");
      root.classList.add("fade-out");
      setTimeout(() => {
        setFormStep(1);
	loadingStep.textContent = "Ready";
	delegate.levelReady = false;
      }, 1000);
    });
  } else {
    // handle incomplete form
    console.error('Submit check failed');
  }
};

export default handleSubmit;

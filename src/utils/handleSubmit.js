import { osName, browserName, isMobile } from 'react-device-detect';
import { delegate, emitUIInteraction } from '../DOMDelegate';
import React, { useState, useEffect, useRef } from 'react';
import { waitForLevelReady } from './awaitMethods';
import { port } from './palatial-ports';

const handleSubmit = (userName, password, firstTimeUser, consentAccepted, device, setFormStep) => {
  if (userName && password && firstTimeUser /*&& consentAccepted*/) {
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

    const myVideo = document.getElementById("myVideo");
    myVideo.play();

    waitForLevelReady(delegate).then(() => { emitUIInteraction(data); }).then(() => {
      delegate.loadingProgress = 100;
      console.log('Entering palatial.tenant-palatial-platform.coreweave.cloud:' + port[delegate.appName]);
      const root = document.getElementById("root");
      const player = document.getElementById("playerUI");
      root.classList.add("fade-out");
      setTimeout(() => {
        setFormStep(1);
	delegate.levelReady = false;
      }, 1000);
    });
  } else {
    // handle incomplete form
    console.error('Submit check failed');
  }
};

export default handleSubmit;

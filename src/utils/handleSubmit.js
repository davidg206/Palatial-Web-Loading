import { osName, browserName, isMobile } from 'react-device-detect';
import { delegate, emitUIInteraction } from '../DOMDelegate';
import React, { useState, useEffect, useRef } from 'react';
import { waitForLevelReady } from './awaitMethods';
import { port } from './palatial-ports';

const handleSubmit = (firstTimeUser, setFormStep) => {
  const data = {
    firstTimeUser: firstTimeUser ? "Yes" : "No",
    timestamp: new Date().getTime(), // current time in Epoch time
  };

  const myVideo = document.getElementById("myVideo");
  myVideo.play();

  waitForLevelReady().then(() => { emitUIInteraction(data); }).then(() => {
    delegate.onPlayAction();
    console.log('Entering on palatial.tenant-palatial-platform.coreweave.cloud:' + port[delegate.appName]);
    const root = document.getElementById("root");
    root.classList.add("fade-out");
    setTimeout(() => {
      setFormStep(1);
      delegate.levelReady = false;
    }, 1000);
  });
};

export default handleSubmit;

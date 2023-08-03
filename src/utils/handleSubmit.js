import { osName, browserName, isMobile } from 'react-device-detect';
import { delegate, emitUIInteraction } from '../DOMDelegate';
import React, { useState, useEffect, useRef } from 'react';
import { port, waitForLevelReady, onPlayAction } from './miscUtils';
import { application } from '../signallingServer';

const handleSubmitImpl = (firstTimeUser) => {
  const data = {
    firstTimeUser: firstTimeUser ? "Yes" : "No",
    timestamp: new Date().getTime(), // current time in Epoch time
  };

  waitForLevelReady().then(async () => {
    emitUIInteraction(data);
    delegate.loadingProgress = 100;
    console.log(`Entering on ${process.env.REACT_APP_VIRT_DNS_ADDRESS}:` + process.env.REACT_APP_DEDICATED_SERVER_PORT);
    onPlayAction();
    delegate.formSubmitted = true;
  }).catch(error => {});
};

export default handleSubmitImpl;

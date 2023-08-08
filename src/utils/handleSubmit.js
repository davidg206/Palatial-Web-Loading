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
    delegate.formSubmitted = true;
    onPlayAction();
  }).catch(error => {});
};

export default handleSubmitImpl;

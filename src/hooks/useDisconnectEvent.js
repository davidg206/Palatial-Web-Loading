import { useEffect } from 'react';
import { delegate, sendCommand } from '../DOMDelegate';

const useDisconnectEvent = (setFormStep, setPassword, setUserName, setActiveButton, setProgress, setStep) => {
  useEffect(() => {
    delegate.onDisconnectHook(isTimeout => {
      setFormStep(1);
      setPassword('');
      setUserName('');
      setActiveButton(null);
      if (delegate.streamReady) sendCommand("disconnectUser");
      if (isTimeout) {
        delegate.loadingProgress = 0;
	setProgress(0);
        setStep(0);
      }
    });
  }, [setFormStep, setPassword, setUserName, setActiveButton, setProgress, setStep]);
}

export default useDisconnectEvent;
import { useEffect } from 'react';
import { isMobile } from 'react-device-detect';
import { osName, browserName } from 'react-device-detect';
import { delegate, emitUIInteraction } from '../DOMDelegate';

const useJoinEvents = (userNameRef, device) => {
  useEffect(() => {
    delegate.onStreamReady(() => {
      emitUIInteraction({
        mobileUser: isMobile,
        userName: userNameRef.current,
        osName: osName,
        browserName: browserName,
        deviceType: device
      });
    });
  }, [userNameRef, device]);
}

export default useJoinEvents;
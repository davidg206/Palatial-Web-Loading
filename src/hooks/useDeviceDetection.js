import { useEffect } from 'react';
import { isMobile, isTablet, isIPad13 } from 'react-device-detect';
import { delegate, sendCommand, emitUIInteraction } from '../DOMDelegate';

export const useDeviceDetection = () => {
    useEffect(() => {
        const setAppHeight = () => {
            const vh = window.innerHeight * 0.01;
            document.documentElement.style.setProperty('--vh', `${vh}px`);
        };
        
        const preventContext = (e) => { e.preventDefault(); };
        document.addEventListener('contextmenu', preventContext);
        
        const disconnectUser = () => sendCommand('disconnectUser');
        window.addEventListener('beforeunload', disconnectUser);
      
        let updateHeight;
        let preventScroll;
      
        // Resize and touchmove events are added only for mobile or tablet devices
        if (isMobile || isTablet || isIPad13) {
          updateHeight = () => {
            document.body.style.height = `${window.innerHeight}px`;
          };
          updateHeight();
          window.addEventListener('resize', updateHeight);
      
          preventScroll = (event) => {
            event.preventDefault();
          };
          window.addEventListener('touchmove', preventScroll, { passive: false });
        }
      
        return () => {
          window.removeEventListener('beforeunload', disconnectUser);
          document.removeEventListener('contextmenu', preventContext);
          if (isMobile || isTablet || isIPad13) {
            window.removeEventListener('resize', updateHeight);
            window.removeEventListener('touchmove', preventScroll);
          }
        };
    }, []);
};

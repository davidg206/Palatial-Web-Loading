import { useEffect } from 'react';
import { isMobile, isTablet, isIPad13 } from 'react-device-detect';

const useSetAppHeight = () => {
  useEffect(() => {
    const setAppHeight = () => {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    };
    
    const preventContext = (e) => { e.preventDefault(); };
    document.addEventListener('contextmenu', preventContext);
    
    const updateHeight = () => {
      document.body.style.height = `${window.innerHeight}px`;
    };
    
    const preventScroll = (event) => {
      event.preventDefault();
    };

    window.addEventListener('resize', setAppHeight);
    
    if (isMobile || isTablet || isIPad13) {
      updateHeight();
      window.addEventListener('resize', updateHeight);
      window.addEventListener('touchmove', preventScroll, { passive: false });
    }
    
    return () => {
      window.removeEventListener('resize', setAppHeight);
      document.removeEventListener('contextmenu', preventContext);
      if (isMobile || isTablet || isIPad13) {
        window.removeEventListener('resize', updateHeight);
        window.removeEventListener('touchmove', preventScroll);
      }
    };
  }, []);
};

export default useSetAppHeight;

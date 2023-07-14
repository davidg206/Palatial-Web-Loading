import React, { useState, useEffect, useRef } from 'react';
import { isDesktop, isIPad13, isTablet, isMobile, osName, browserName } from 'react-device-detect';
import './App.css'
import logoPng from './assets/Images/png/Palatial-Logo_White 1.png';
import ProgressBar from './components/ProgressBar';
import useDeviceDetect from './hooks/useDeviceDetect';
import { delegate, sendCommand, emitUIInteraction } from './DOMDelegate';
import handleSubmitImpl from './utils/handleSubmit';
import checkPassword from './utils/checkPassword';
import passwordVisibleImg from './assets/Images/svg/toggle_password_visible.svg';
import passwordinvisibleImg from './assets/Images/svg/toggle_password_Invisible.svg';
import { port, waitForProjectName, waitForLevelReady, } from './utils/miscUtils';
import { application } from './signallingServer';
import sample from './Video/sample.mp4';
import ToolTip from './assets/Images/png/ToolTip.png';
import MobileToolTip from './assets/Images/png/MobileToolTip.png';

function App() {
  const setAppHeight = () => {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
  };

  // State management
  const { device } = useDeviceDetect();
  const [showPassword, setShowPassword] = useState(false);
  const [popUpVisible, setPopUpVisible] = useState(true);
  /*const { serverResponseMessage, popUpVisible, checkPassword } = usePasswordValidation();*/ //password validation result from server
  const [userName, setUserName] = useState('');
  const [activeButton, setActiveButton] = useState(null);
  const [consentAccepted, setConsentAccepted] = useState(true);
  const [progress, setProgress] = useState(0);
  const [step, setStep] = useState(0);
  const [formStep, setFormStep] = useState(1);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isInputFocused, setInputFocused] = useState(false);
  // add the names of the actual loading steps to the following and change the progress bar step value to 100/# of actual steps at :89 and :96
  const loadingSteps = ['Authenticating', 'Setting up', 'Connecting to server', 'Requesting Instance', 'Building Level', 'Ready']; // Add your loading steps here
  const stepTimeoutRef = useRef();
  const [shouldFadeOut, setShouldFadeOut] = useState(false);
  const userNameRef = useRef('');
  const videoRef = useRef(null);
  const [ToolTipPopupVisible, setToolTipPopupVisible] = useState(false);
  const [isTooltipVisible, setIsTooltipVisible] = useState(false);
  const [RefreshMsgBox, setRefreshMsgBox] = useState(false);
  const [isLogoVisible, setIsLogoVisible] = useState(true);

const handleSubmit = async () => {
  const proceedButton = document.querySelector('.submitButton');
  const passwordInput = document.querySelector('.passwordInput');
  if (!checkPassword(password)) {
    setError("Wrong password. Please try again.");
    return;
  } else {
    setError("");
  }
  proceedButton.disabled = true;
  passwordInput.disabled = true;
  // below causes 'Operation was aborted' error on iOS upon rentry
  //videoRef.current.play();
  handleSubmitImpl(true);
  setShouldFadeOut(true);
  setIsLogoVisible(false); 
  setToolTipPopupVisible(true);
  setTimeout(() => {
    setIsTooltipVisible(false);
    setTimeout(() => {
      setPopUpVisible(true);
    }); 
  }, 100);  

  setFormStep(3);
};

  const handleKeyPress = (e) => {
    if (e.key == 'Enter' && !document.querySelector('.submitButton').disabled) {
	handleSubmit();
    }
  };

  const handleOnInput = (e) => {
    if (e.target.value == '') {
      setError('');
    }
  };

  useEffect(() => {
    userNameRef.current = userName;
  }, [userName]);

  useEffect(() => {
    const timeoutId = setTimeout(() => setRefreshMsgBox(true), 60000);
    return () => clearTimeout(timeoutId); // Clean up on component unmount
  }, []);

  // join events
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
  }, []);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // disconnect events
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
  }, []);

  // Device detection logic
  useEffect(() => {
    setAppHeight();
    window.addEventListener('resize', setAppHeight);
    document.addEventListener('contextmenu', e => { e.preventDefault(); });
    const disconnectUser = () => { sendCommand("disconnectUser"); };
    window.addEventListener('beforeunload', disconnectUser);

    if (isMobile || isTablet || isIPad13) {
      const updateHeight = () => {
        document.body.style.height = `${window.innerHeight}px`;
      };
      updateHeight();
      window.addEventListener('resize', updateHeight);
      const preventScroll = event => {
        event.preventDefault();
      };
      window.addEventListener('touchmove', preventScroll, { passive: false });
      return () => {
        window.removeEventListener('resize', setAppHeight);
        window.removeEventListener('resize', updateHeight);
        window.removeEventListener('touchmove', preventScroll);
      };
    }
    return () => {
      window.removeEventListener('beforeunload', disconnectUser);
    };
  }, []);

  // progress bar animation
  useEffect(() => {
    let interval = setInterval(() => {
      setProgress((prevProgress) => {
        return delegate.getLoadingProgress();
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);


  useEffect(() => {
    stepTimeoutRef.current && clearTimeout(stepTimeoutRef.current);
    if (progress >= (step + 1) * 20) {
      stepTimeoutRef.current = setTimeout(() => {
        setStep(step + 1);
      }, 100);
    }
  }, [progress, step]);


  // maintain page after exiting keyboard
  useEffect(() => {window.goBack = ()=>{setFormStep(1);};
    if (isInputFocused) {
      document.body.classList.add('prevent-scroll');
    } else {
      document.body.classList.remove('prevent-scroll');
    }
  }, [isInputFocused]);

  const handleConsent = () => {
    setConsentAccepted(!consentAccepted);
  };

  // hook for transitioning form from username input to password input
  const handleFormTransition = () => {
    if (formStep === 1) {
      if (userName !== null && userName.trim() !== "" && consentAccepted) {
	setFormStep(2);
        setError('');
      } else {
        setError('Please enter a name');
      }
    } else if (formStep === 2) {
      if (password) {
        setFormStep(3);
        setError('');
      } else {
        setError('Please enter a password');
      }
    }
  };

  const hftHelper = (e) => {
    if (e.key === 'Enter') {
      handleFormTransition();
    }
  };

  const handleOnFocus = (e) => {
    const passwordInput = document.querySelector('.passwordInput');
    const hiddenInput = e.target;
    hiddenInput.setAttribute('type', 'password');
    hiddenInput.style.display = 'none';
    passwordInput.focus();
  }

  const handleGoBack = () => {
    setFormStep(1);
  };

  const videoStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    display: 'none',
    width: '0%',
    height: '0%',
    zIndex: -1,
    objectFit: 'cover'
  };

  return (
    <div className="App">
        {RefreshMsgBox && (
        <div className="refreshMsgBox fadeIn">
          Refresh the page if loading takes longer than 1 minute </div>
      )}
      <div style={{ display: 'none' }}>
        <video id="myVideo" ref={videoRef} style={videoStyle} hidden playsInline muted>
          <source src={sample} type="video/mp4" />
        </video>
      </div>
      <div className={popUpVisible ? "PopUp" : "PopUp hidden"}>
        <div className={`Logo ${isLogoVisible ? '' : 'fadeOut'}`}>
          <img src={logoPng} style={{width:'10em'}} alt='logo'/>
        </div>
        <div>
            {formStep === 1 && (
              <div className='PopUpContent fadeIn'>
                <div className="inputPrompt">
                  <p>Enter Your Name</p>
                  <input
                    className="userNameInput"
                    type="text"
                    value={userName}
                    onFocus={() => setInputFocused(true)}
                    onBlur={() => setInputFocused(false)}
                    onChange={(e) => { setError(""); setUserName(e.target.value) } }
                    onKeyPress={hftHelper}
                    required
                  />
                </div>
                {error && <p className="error">{error}</p>}
                <p style={{fontweight:'100'}}>By proceeding you agree to our terms and conditions</p>
                <div className='passwordButtons'>
                <button className="proceedButton" onClick={handleFormTransition}>Proceed</button>
                </div>
              </div>
            )}
            {formStep === 2 && (
              <div className='PopUpContent fadeIn'>
                <div className="inputPrompt">
                  <p>Enter Your Password</p>
                  <div className="passwordWrapper">
                    <input
                      className="passwordInput"
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onFocus={() => setInputFocused(true)}
                      onBlur={() => setInputFocused(false)}
                      onChange={(e) => { setError(""); setPassword(e.target.value); }}
                      onInput={handleOnInput}
                      onKeyDown={handleKeyPress}
                      autoComplete="new-password"
                      required
                    />
                    <button className="togglePasswordButton" onClick={togglePasswordVisibility}>
                    {showPassword ?
                    <img src={passwordVisibleImg} alt="hide password" style={{width: '1.2em', height: '1.2em'}} /> :
                    <img src={passwordinvisibleImg} alt="show password" style={{width: '1.2em', height: '1.2em'}} />
                    }
                    </button>
                  </div>
                </div>
                {error && <p className="error">{error}</p>}
                <div className="passwordButtons" style={{display:'flex',flexDirection:'row', paddingTop:'1em'}}> 
                  <button className="backButton" onClick={handleGoBack}>Go Back</button>
                  <button className="submitButton" onClick={handleSubmit}>Start</button>
                </div>
              </div>
            )}
        </div>
            {formStep === 3 && (
                <div className="ToolTipPopup fadeIn">
                  <img 
                    className={isMobile ? "mobile-tooltip" : "desktop-tooltip"} 
                    src={isMobile ? MobileToolTip : ToolTip} 
                    alt="Tool Tip Popup" 
                  />
                  </div>
            )} 
      </div>

      <ProgressBar progress={progress} />
      <div className="loadingStep">
        {loadingSteps[step]}
      </div>
    </div>
  );
}

export default App;

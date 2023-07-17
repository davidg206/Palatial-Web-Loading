import React, { useState, useEffect, useRef } from 'react';
import './App.css'
import logoPng from './assets/Images/png/Palatial-Logo_White 1.png';
import ProgressBar from './components/ProgressBar';
import useDeviceDetect from './hooks/useDeviceDetect';
import { delegate } from './DOMDelegate';
import useFormHandling from './hooks/useFormHandling';  
import passwordVisibleImg from './assets/Images/svg/toggle_password_visible.svg';
import passwordinvisibleImg from './assets/Images/svg/toggle_password_Invisible.svg';
import ToolTipPopup from './components/ToolTipPopup';
import useDisconnectEvent from './hooks/useDisconnectEvent';
import useJoinEvents from './hooks/useJoinEvents';
import useSetAppHeight from './hooks/useSetAppHeight';
import { isMobile } from 'react-device-detect';

const loadingSteps = ['Authenticating', 'Setting up', 'Connecting to server', 'Requesting Instance', 'Building Level', 'Ready']; 

function App() {
  // States
  const {
    userName,
    password,
    error,
    formStep,
    isInputFocused,
    shouldFadeOut,
    showPassword,
    userNameRef,
    setUserName,
    setPassword,
    setInputFocused,
    setFormStep,
    handleSubmit,
    handleKeyPress,
    handleOnInput,
    togglePasswordVisibility,
    handleFormTransition,
    hftHelper,
    handleGoBack,
    setError
  } = useFormHandling();

  const [popUpVisible, setPopUpVisible] = useState(true);
  const [consentAccepted, setConsentAccepted] = useState(true);
  const [progress, setProgress] = useState(0);
  const [step, setStep] = useState(0);
  const [ToolTipPopupVisible, setToolTipPopupVisible] = useState(false);
  const [isTooltipVisible, setIsTooltipVisible] = useState(false);
  const [RefreshMsgBox, setRefreshMsgBox] = useState(false);
  const [isLogoVisible, setIsLogoVisible] = useState(true);
  const [activeButton, setActiveButton] = useState(null);

  // Refs
  const { device } = useDeviceDetect();
  const videoRef = useRef(null);
  const stepTimeoutRef = useRef();

  const handleConsent = () => {
    setConsentAccepted(!consentAccepted);
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

  // set progressbar animation interval
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

  useEffect(() => {
    userNameRef.current = userName;
  }, [userName]);

  useEffect(() => {
    const timeoutId = setTimeout(() => setRefreshMsgBox(true), 60000);
    return () => clearTimeout(timeoutId); // Clean up on component unmount
  }, []);

  // maintain page after exiting keyboard
  useEffect(() => {
    window.goBack = ()=>{setFormStep(1);};
    if (isInputFocused) {
      document.body.classList.add('prevent-scroll');
    } else {
      document.body.classList.remove('prevent-scroll');
    }
  }, [isInputFocused]);

  useSetAppHeight();
  useDeviceDetect();
  useDisconnectEvent(setFormStep, setPassword, setUserName, setActiveButton, setProgress, setStep);
  useJoinEvents(userNameRef, device);

  return (
    <div className="App">
        {RefreshMsgBox && (
        <div className="refreshMsgBox fadeIn">
          Refresh the page if loading takes longer than 1 minute </div>
      )}
      <div style={{ display: 'none' }}>
        <video id="myVideo" ref={videoRef} style={videoStyle} hidden playsInline muted>
        
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
        {formStep === 3 && <ToolTipPopup isMobile={isMobile} />}
             
      </div>

      <ProgressBar progress={progress} />
      <div className="loadingStep">
        {loadingSteps[step]}
      </div>
    </div>
  );
}

export default App;
 
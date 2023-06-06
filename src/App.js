import React, { useState, useEffect, useRef } from 'react';
import { isDesktop, isIPad13, isTablet, isMobile, osName, browserName } from 'react-device-detect';
import './App.css';
import logoPng from './assets/Images/png/Palatial-Logo_White 1.png';
import ProgressBar from './components/ProgressBar';
import useDeviceDetect from './hooks/useDeviceDetect';
import { delegate, sendCommand } from './DOMDelegate';
import handleSubmit from './utils/handleSubmit';
import checkPassword from './utils/checkPassword';

function App() {

  const setAppHeight = () => {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
  };

  // State management
  const { device } = useDeviceDetect();
  const [popUpVisible, setPopUpVisible] = useState(true);
  /*const { serverResponseMessage, popUpVisible, checkPassword } = usePasswordValidation();*/ //password validation result from server
  const [userName, setUserName] = useState('');
  const [activeButton, setActiveButton] = useState(null);
  const [consentAccepted, setConsentAccepted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [step, setStep] = useState(0);
  const [formStep, setFormStep] = useState(1);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isInputFocused, setInputFocused] = useState(false);
  // add the names of the actual loading steps to the following and change the progress bar step value to 100/# of actual steps at :89 and :96
  const loadingSteps = ['Authenticating', 'Setting up', 'Connecting to server', 'Requesting Instance', 'Building', 'Ready']; // Add your loading steps here
  const stepTimeoutRef = useRef();

  const checkLevelReady = async () => {
    const proceedButton = document.querySelector('.proceedButton');
    if (!checkPassword(password)) {
      setError("Wrong password. Please try again.");
      return;
    } else {
      setError("");
    }
    proceedButton.disabled = true;
    handleSubmit(userName, password, consentAccepted, device, setFormStep);
  };

  document.addEventListener('contextmenu', e => { e.preventDefault(); })
  window.addEventListener('beforeunload', () => { if (delegate.streamReady) sendCommand("disconnectUser"); });

  const handleKeyPress = (e) => {
    if (e.key == 'Enter' && !document.querySelector('.proceedButton').disabled) {
	checkLevelReady();
    }
  };

  const handleOnInput = (e) => {
    if (e.target.value == '') {
      setError('');
    }
  };

  useEffect(() => {
    delegate.onDisconnectHook(fromDisconnect => {
      setFormStep(1);
      setPassword('');
      setUserName('');
      setActiveButton(null);
      setConsentAccepted(false);
      if (fromDisconnect) {
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
  }, []);

  // progress bar animation
  useEffect(() => {
    let interval = setInterval(() => {
      setProgress((prevProgress) => {
        return delegate.getLoadingProgress();
      });
    }, 1000); // increase progress every 1 second
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

  const handleClick = isFirstTime => {
    setActiveButton(isFirstTime ? 'yes' : 'no');
  };

  const handleConsent = () => {
    setConsentAccepted(!consentAccepted);
  };

  // hook for transitioning form from username input to password input
  const handleFormTransition = () => {
    if (formStep === 1) {
      if (userName !== null && consentAccepted) {
	setFormStep(2);
        setError('');
      } else {
        setError('Please complete all fields');
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

  const videoStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    zIndex: -1,  
    objectFit: 'cover' 
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

  return (
    <div className="App">
      <video id="myVideo" style={videoStyle}></video>
      <div className={popUpVisible ? "PopUp" : "PopUp hidden"}>
      <div className="Logo">
          <img src={logoPng} style={{width:'10em'}} alt='logo'/>
        </div>
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
                onChange={(e) => setUserName(e.target.value)}
                required
              />
            </div>

            <div className="consentCTA">
              <div className="consentCheckBox" onClick={handleConsent}>
                <input type="checkbox" checked={consentAccepted} readOnly />
                <p>I agree to the terms and conditions</p>
              </div>
            </div>
            {error && <p className="error">{error}</p>}
            <button className="proceedButton" onClick={handleFormTransition}>Proceed</button>
          </div>
        )}
        {formStep === 2 && (
          <div className='PopUpContent fadeIn'>
            <div className="inputPrompt">
              <p>Enter Your Password</p>
	      <input type="text" id="hiddenInput" style={{ display: "none" }} onFocus={handleOnFocus} />
              <input
                className="passwordInput"
                type="password"
                value={password}
		onInput={handleOnInput}
		onKeyPress={handleKeyPress}
                onChange={(e) => setPassword(e.target.value)}
                required
		autoComplete="off"
              />
            </div>
            {error && <p className="error">{error}</p>}
            <button className="proceedButton" onClick={checkLevelReady}>Submit</button>
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

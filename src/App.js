import React, { useState, useEffect, useRef } from 'react';
import { isDesktop, isIPad13, isTablet, isMobile, osName, browserName } from 'react-device-detect';
import './App.css'
import logoPng from './assets/Images/png/Palatial-Logo_White 1.png';
import ProgressBar from './components/ProgressBar';
import useDeviceDetect from './hooks/useDeviceDetect';
import { delegate, sendCommand, emitUIInteraction } from './DOMDelegate';
import handleSubmit from './utils/handleSubmit';
import checkPassword from './utils/checkPassword';
import { waitForProjectName, waitForLevelReady } from './utils/awaitMethods';
import passwordVisibleImg from './assets/Images/svg/toggle_password_visible.svg';
import passwordinvisibleImg from './assets/Images/svg/toggle_password_Invisible.svg';

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
  const loadingSteps = ['Authenticating', 'Setting up', 'Connecting to server', 'Requesting Instance', 'Building', 'Ready']; // Add your loading steps here
  const stepTimeoutRef = useRef();

  const checkLevelReady = async () => {
    const proceedButton = document.querySelector('.submitButton');
    if (!checkPassword(password)) {
      setError("Wrong password. Please try again.");
      return;
    } else {
      setError("");
    }
    proceedButton.disabled = true;
    handleSubmit(userName, password, true, consentAccepted, device, setFormStep);
  };

  document.addEventListener('contextmenu', e => { e.preventDefault(); })

  const handleKeyPress = (e) => {
    if (e.key == 'Enter' && !document.querySelector('.submitButton').disabled) {
	checkLevelReady();
    }
  };

  const handleOnInput = (e) => {
    if (e.target.value == '') {
      setError('');
    }
  };

  // dedicated server ports
  const port = {
    "tankhouse":  1111,
    "dev":        2222,
    "officedemo": 3333,
    "epic":       4444,
    "demo":       5555,
    "prophet":    7777,
    "45Main":      3333,
    "PalatialDev": 2222
  };

  // join events
  useEffect(() => {
    delegate.checkStreamReady(async () => {
      emitUIInteraction({});
      waitForProjectName(delegate).then(name => {
        emitUIInteraction({
	  join: 'palatial.tenant-palatial-platform.coreweave.cloud:' + port[name],
	  orientation: window.screen.orientation.type
        });
	delegate.loadingProgress = 90;
        waitForLevelReady(delegate).then(() => {
          delegate.loadingProgress = 100;
        });
      });
    });
  }, []);

  // mobile orientation
  useEffect(() => {
    window.screen.orientation.addEventListener('change', (e) => {
        emitUIInteraction({ orientation: e.currentTarget.type });
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
      setConsentAccepted(false);
      sendCommand("disconnectUser");
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
    document.addEventListener('contextmenu', e => { e.preventDefault(); })
    window.addEventListener('beforeunload', () => {
      if (delegate && delegate.streamReady) {
        sendCommand("disconnectUser");
      }
    });

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

  return (
    <div className="App">
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
                onChange={(e) => { setError(""); setUserName(e.target.value) } }
                onKeyPress={hftHelper}
                required
              />
            </div>
            {error && <p className="error">{error}</p>}
            <button className="proceedButton" onClick={handleFormTransition}>Proceed</button>
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
              <button className="submitButton" onClick={checkLevelReady}>Proceed</button>
            </div>
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

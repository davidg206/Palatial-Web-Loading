import React, { useState, useEffect, useRef } from 'react';
import { isDesktop, isIPad13, isTablet, isMobile, osName, browserName } from 'react-device-detect';
import './App.css';
import logoPng from './assets/Images/png/Palatial-Logo_White 1.png';
import ProgressBar from './components/ProgressBar';
import useDeviceDetect from './hooks/useDeviceDetect';
import { delegate } from './DOMDelegate';
import handleSubmit from './utils/handleSubmit';

Object.defineProperty(exports, "__esModule", { value: true });
var libspsfrontend = require("backend-dom-components");

function App() {

  // State management
  const { device } = useDeviceDetect();
  const [popUpVisible, setPopUpVisible] = useState(true);
  /*const { serverResponseMessage, popUpVisible, checkPassword } = usePasswordValidation();*/ //password validation result from server
  const [userName, setUserName] = useState('');
  const [firstTimeUser, setFirstTimeUser] = useState(null);
  const [activeButton, setActiveButton] = useState(null);
  const [consentAccepted, setConsentAccepted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [step, setStep] = useState(0);
  const [formStep, setFormStep] = useState(1);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isInputFocused, setInputFocused] = useState(false);
  // add the names of the actual loading steps to the following and change the progress bar step value to 100/# of actual steps at :89 and :96
  const loadingSteps = ['Loading assets', 'Setting up', 'Connecting to server', 'Finalizing', 'Done']; // Add your loading steps here
  const stepTimeoutRef = useRef();


    //uncomment this block for passing password validation msg in order to trigger window fadeout

    /*const checkPassword = async (password) => {
      // simulate a call to the server to check the password
      const passwordIsCorrect = await someServerFunction(password);
       setPopUpVisible(false);
      if (!passwordIsCorrect) {
        setServerResponseMessage('Password incorrect, please try again');
      } else {
        setServerResponseMessage('Success!');
        setPopUpVisible(false); // hides the PopUp div
      }
    };*/


  document.addEventListener('contextmenu', e => { e.preventDefault(); })

  const handleKeyPress = (e) => {
    if (e.key == 'Enter' && !document.querySelector('.proceedButton').disabled) {
      handleSubmit(userName, password, firstTimeUser, consentAccepted, device, setError)(e);
    }
  };

  // Device detection logic
  useEffect(() => {
    if (isMobile || isTablet || isIPad13) {
      document.body.style.height = `${window.innerHeight}px`;
      const preventScroll = event => {
        event.preventDefault();
      };
      // Prevent scrolling when a mobile/tablet device is detected
      window.addEventListener('touchmove', preventScroll, { passive: false });

      return () => {
        // Clean up event listener on unmount
        window.removeEventListener('touchmove', preventScroll);
      };
    }
  }, []);

  // progress bar animation
  useEffect(() => {
    let val = 0;
    let interval = setInterval(() => {
      setProgress((prevProgress) => {
	val += 1;
        if (prevProgress >= 100) {
          //setStep(0); // reset the step as well
          //return 0; // this line should be removed when connecting to the actual server
	  return 100;
	}
        //return prevProgress + 20;
	if (delegate) {
	  const nextVal = delegate.getLoadingProgress() + val;
	  if (nextVal >= 100) { setStep(4); return 100; }
          return nextVal;
	}
	return 0;
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
  useEffect(() => {
    if (isInputFocused) {
      document.body.classList.add('prevent-scroll');
    } else {
      document.body.classList.remove('prevent-scroll');
    }
  }, [isInputFocused]);

  const handleClick = isFirstTime => {
    setFirstTimeUser(isFirstTime);
    setActiveButton(isFirstTime ? 'yes' : 'no');
  };

  const handleConsent = () => {
    setConsentAccepted(!consentAccepted);
  };

  // hook for transitioning form from username input to password input
  const handleFormTransition = () => {
    if (formStep === 1) {
      if (userName && firstTimeUser !== null && consentAccepted) {
        setFormStep(2);
        setError('');
      } else {
        setError('Please complete all fields before proceeding.');
      }
    } else if (formStep === 2) {
      if (password) {
        setFormStep(3);
        setError('');
      } else {
        setError('Please enter a password before proceeding.');
      }
    }
  };

    const videoStyle = {
        display: 'inline',
        opacity: 0,
        height: 0,
        width: 0
    };

  return (
    <div className="App">
      <div className={popUpVisible ? "PopUp" : "PopUp hidden"}>
       <video id="myVideo" style={videoStyle}></video>
      <div className="Logo">
          <img src={logoPng} alt='logo'/>
        </div>
        {formStep === 1 && (
          <div className='PopUpContent fadeIn'>
            <div className="inputPrompt">
              <p>ENTER YOUR NAME</p>
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
            <div className="firstTimeToggle">
              <p>IS THIS YOUR FIRST TIME USING PALATIAL? </p>
              <div className="toggleButtons">
                <button className={`yesButton ${activeButton === 'yes' ? 'active' : ''}`} onClick={() => handleClick(true)}>YES</button>
                <button className={`noButton ${activeButton === 'no' ? 'active' : ''}`} onClick={() => handleClick(false)}>NO</button>
              </div>
            </div>
            <div className="consentCTA">
              <div className="consentCheckBox" onClick={handleConsent}>
                <input type="checkbox" checked={consentAccepted} readOnly />
                <p>By clicking this box, I’m accepting the Terms and Conditions of using this platform.</p>
              </div>
            </div>
            <button className="proceedButton" onClick={handleFormTransition}>PROCEED</button>
          </div>
        )}
        {formStep === 2 && (
          <div className='PopUpContent fadeIn'>
            <div className="inputPrompt">
              <p>ENTER YOUR PASSWORD</p>
              <input
                className="passwordInput"
                type="password"
                value={password}
		onKeyPress={handleKeyPress}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button className="proceedButton" onClick={handleSubmit(userName, password, firstTimeUser, consentAccepted, device, setError)}>SUBMIT</button>
          </div>
        )}
        {error && <p className="error">{error}</p>}
      </div>
      <ProgressBar progress={progress} />
      <div className="loadingStep">
        {loadingSteps[step]}
      </div>
    </div>
  );
}

export default App;

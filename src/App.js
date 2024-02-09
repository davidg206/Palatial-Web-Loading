import React, { useState, useEffect, useRef } from 'react';
import './App.css'
import logoPng from './assets/Images/png/Palatial-Logo_White 1.png';
import ProgressBar from './components/ProgressBar';
import useDeviceDetect from './hooks/useDeviceDetect';
import { emitUIInteraction, delegate } from './DOMDelegate';
import useFormHandling from './hooks/useFormHandling';
import passwordVisibleImg from './assets/Images/svg/toggle_password_visible.svg';
import passwordinvisibleImg from './assets/Images/svg/toggle_password_Invisible.svg';
import ToolTipPopup from './components/ToolTipPopup';
import useDisconnectEvent from './hooks/useDisconnectEvent';
import useJoinEvents from './hooks/useJoinEvents';
import useSetAppHeight from './hooks/useSetAppHeight';
import { isMobile } from 'react-device-detect';
import RefreshMessageBox from './components/RefreshMessageBox';
import UserNameInput from './components/FormSteps/UserNameInput';
import PasswordInput from './components/FormSteps/PasswordInput';
import ToolTips from './components/FormSteps/ToolTips';
import { branch, application, userMode } from './signallingServer';
import { fetchProjectInfo, fetchUserInfo, fetchProjectMembers } from './hooks/useRequests';

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
    setError,
    isLogoVisible
  } = useFormHandling();

  const [popUpVisible, setPopUpVisible] = useState(true);
  const [consentAccepted, setConsentAccepted] = useState(true);
  const [progress, setProgress] = useState(0);
  const [step, setStep] = useState(0);
  const [ToolTipPopupVisible, setToolTipPopupVisible] = useState(false);
  const [isTooltipVisible, setIsTooltipVisible] = useState(false);
  const [RefreshMsgBox, setRefreshMsgBox] = useState(false);
  const [activeButton, setActiveButton] = useState(null);

  const [canEdit, setCanEdit] = useState(false);
  const [token, setToken] = useState(null);

  // Refs
  const { device } = useDeviceDetect();
  const videoRef = useRef(null);
  const stepTimeoutRef = useRef();

  const handleConsent = () => {
    setConsentAccepted(!consentAccepted);
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
    const urlParams = new URLSearchParams(window.location.search);
    const urlToken = urlParams.get('access_token');

    if (!urlToken)
      return;

    setToken(urlToken);
    console.log("my token " + token);

    fetch('https://api.palatialxr.com/v1/mythia-jwt', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        token: urlToken,
        secret: process.env.REACT_APP_MYTHIA_JWT_SECRET
      })
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      console.log(response.json());
      return response.json();
    })
  }, []);

/*
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('access_token');

    fetch('https://api.palatialxr.com/v1/mythia-jwt', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        token: token,
        secret: process.env.REACT_APP_MYTHIA_JWT_SECRET
      })
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      const projectId = data.projectId;
      // Handle the response data here
      fetchProjectInfo({ projectId: data.projectId, authToken: token }, data => {
        console.log(data);
        let email = null;
        fetchUserInfo(token, data => { console.log("User: ", data); email = data.email; });
        fetchProjectMembers({ authToken: token, projectId: projectId, email: email }, data => console.log("Members: ", data));
      });
    })
    .catch(error => {
      // Handle any errors that occurred during the fetch
      console.error('There was a problem with the fetch operation:', error);
    });
  }, []);
*/

  useSetAppHeight();
  useDeviceDetect();
  useDisconnectEvent(setFormStep, setPassword, setUserName, setActiveButton, setProgress, setStep);
  useJoinEvents(userNameRef, device);

  const [ selectedOption, setSelectedOption ] = useState(userMode)

  const handleOptionChange = (e) => {
    console.log(e.target.value);
    setSelectedOption(e.target.value);
  };

  return (
    <div className="App">
        <RefreshMessageBox />
{/*
        { branch === "test" && (
        <select id="dropdown" value={selectedOption} onChange={handleOptionChange}>
          <option value="View">View</option>
          <option value="Edit">Edit</option>
        </select>
        )}
*/}

      <div className={popUpVisible ? "PopUp" : "PopUp hidden"}>
      <div className={`Logo ${isLogoVisible ? '' : 'fadeOut'}`}>
        <img src={logoPng} style={{width:'10em'}} alt='logo'/>
      </div>

      <div>
        {formStep === 1 && (
          <UserNameInput
            userName={userName}
            setInputFocused={setInputFocused}
            setError={setError}
            setUserName={setUserName}
            hftHelper={hftHelper}
            handleFormTransition={handleFormTransition}
          />
        )}
        {false && formStep === 2 && (
          <PasswordInput
            password={password}
            showPassword={showPassword}
            setInputFocused={setInputFocused}
            setError={setError}
            setPassword={setPassword}
            handleOnInput={handleOnInput}
            handleKeyPress={handleKeyPress}
            togglePasswordVisibility={togglePasswordVisibility}
            handleGoBack={handleGoBack}
            handleSubmit={handleSubmit}
          />
        )}
        {formStep === 3 && (
          <ToolTips />
        )}
      </div>

      </div>


      <ProgressBar progress={progress} />
      <div className="loadingStep">
        {loadingSteps[step]}
      </div>
    </div>
  );
}

export default App;

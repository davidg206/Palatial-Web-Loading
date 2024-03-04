import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
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
import { branch, application, userMode, getUserMode, projectId } from './signallingServer';

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
    isLogoVisible,
    userId,
    setUserId,
    memberPassword,
    setMemberPassword
  } = useFormHandling();

  const [popUpVisible, setPopUpVisible] = useState(true);
  const [consentAccepted, setConsentAccepted] = useState(true);
  const [progress, setProgress] = useState(0);
  const [step, setStep] = useState(0);
  const [ToolTipPopupVisible, setToolTipPopupVisible] = useState(false);
  const [isTooltipVisible, setIsTooltipVisible] = useState(false);
  const [RefreshMsgBox, setRefreshMsgBox] = useState(false);
  const [activeButton, setActiveButton] = useState(null);
  const [token, setToken] = useState(null);
  const [basicSettings, setBasicSettings] = useState(null);
  const [podName, setPodName] = useState(null);

  // Refs
  const { device } = useDeviceDetect();
  const videoRef = useRef(null);
  const stepTimeoutRef = useRef();

  const handleConsent = () => {
    setConsentAccepted(!consentAccepted);
  };

  const deleteInstance = async (instanceId) => {
    await fetch('https://api.palatialxr.com/v1/remove-instance', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        podName: instanceId
      })
    });
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
    if (application === "bwpgfyw8ri") {
      setToken(process.env.REACT_APP_DEFAULT_ACCESS_TOKEN);
    } else {
      setToken(urlParams.get('access_token'));
    }

    if (!token)
      return;

    console.log("TOKEN = " + token);

    const response = fetch('https://api.palatialxr.com/v1/mythia-jwt', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        token: token,
        secret: process.env.REACT_APP_MYTHIA_JWT_SECRET
      })
    }).then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json(); // Parse JSON response
    }).then(data => {
      console.log(data); setBasicSettings(data);
    }).catch((error) => console.error(error) );
  }, [token]);

  useEffect(() => {
    delegate.onStreamReady(async () => {
      const response = await fetch('https://api.palatialxr.com/v1/send-message', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          event: "log instance",
          createdAt: new Date(),
          subjectId: projectId,
          subjectType: "projects",
          payload: {
            podName: delegate.id,
            streamURL: window.location.href,
            pixelStreamingId: delegate.id,
            isRequestingEdit: getUserMode() === 'Edit'
          }
        }),
      });

      console.log('Project ID: ' + projectId);

      if (response.ok) {
        const data = await response.json();
        console.log('Message sent successfully');
        console.log('PixelStreamingID: ' + data.podName);
        console.log("we got " + data.podName);
        setPodName(data.podName);
      } else {
        console.error('Error sending message');
      }
    });
  }, []);

  useEffect(() => {
    if (!token || !basicSettings || !podName)
      return;
    fetch('https://palatial-api.palatialxr.com/users/me', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json(); // Parse JSON response
    })
    .then(data => {
      console.log('User data:', data); // Handle the response data
      const userData = data;
      setUserId(userData.id);

      setInterval(async () => {
        console.log('tick ' + podName);
        const response = await axios.post('https://api.palatialxr.com/v2/streamTick', { "userId": data.id });
        console.log(response.data.expired);
        if (response.data.expired) {
          deleteInstance(podName);
        }
      }, 1000);

      fetch(`https://palatial-api.palatialxr.com/projects/${projectId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      }).then(response => {
        if (!response.ok) throw new Error('Network response was not ok');
        return response.json();
      }).then(data => {
        console.log('Project data: ', data);
        if (data.members.length > 0) {
          setMemberPassword(data.members[0].password);
        }
      }).catch(error => { console.error(error); });
    })
    .catch(error => {
      console.error('There was a problem with the user fetch operation:', error);
    });
  }, [token, memberPassword, basicSettings, podName]);



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
        {memberPassword && formStep === 2 && (
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

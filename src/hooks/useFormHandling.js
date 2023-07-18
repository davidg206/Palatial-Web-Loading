// ./hooks/useFormHandling.js
import { useState, useRef, useEffect } from 'react';
import checkPassword from '../utils/checkPassword';
import handleSubmitImpl from '../utils/handleSubmit';

const useFormHandling = () => {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [formStep, setFormStep] = useState(1);
  const [isInputFocused, setInputFocused] = useState(false);
  const [shouldFadeOut, setShouldFadeOut] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isLogoVisible, setIsLogoVisible] = useState[true];

  const userNameRef = useRef('');


  useEffect(() => {
    if (formStep === 3) {
      setIsLogoVisible(false);
    } else {
      setIsLogoVisible(true);
    }
  }, [formStep]);

  const handleSubmit = async () => {
    if (!checkPassword(password)) {
      setError("Wrong password. Please try again.");
      return;
    } else {
      setError("");
    }
    handleSubmitImpl(true);
    setShouldFadeOut(true);
    setFormStep(3);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };

  const handleOnInput = (e) => {
    if (e.target.value === '') {
      setError('');
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleFormTransition = () => {
    if (formStep === 1) {
      if (userName && userName.trim() !== "") {
        setFormStep(2);
        setError('');
      } else {
        setError('Please enter a name');
      }
    } else if (formStep === 2) {
      if (password) {
        handleSubmit();
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

  const handleGoBack = () => {
    setFormStep(1);
  };

  return {
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
  };
};

export default useFormHandling;

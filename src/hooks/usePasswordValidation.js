import { useState } from 'react';

/**
 * usePasswordValidation Hook
 *
 * This is a custom React hook that simulates password validation with a server.
 * The hook handles checking the password, managing the server response, and 
 * controlling the visibility of a pop-up div based on the server response.
 *
 * @returns {Object} Object containing serverResponseMessage, popUpVisible, and checkPassword.
 * 
 * @property {string} serverResponseMessage - Represents the server response message. 
 * If the password is incorrect, it will be set to 'Password incorrect, please try again'. 
 * If the password is correct, it will be set to 'Success!'.
 *
 * @property {boolean} popUpVisible - Controls the visibility of a pop-up div. It will be 
 * set to false when the password is correct, otherwise, it stays true.
 *
 * @property {function} checkPassword - An async function that takes in a password as an 
 * argument and simulates a call to the server to check the password.
 *
 * Note: This function is a placeholder for server integration. In a live application, it will need
 *       to be replaced or modified to make actual requests to your back-end server. Be sure to handle
 *       errors and edge cases as needed in your implementation.
 */

const usePasswordValidation = () => {
  const [serverResponseMessage, setServerResponseMessage] = useState('');
  const [popUpVisible, setPopUpVisible] = useState(true);

  const checkPassword = async (password) => {
    // simulate a call to the server to check the password
    const passwordIsCorrect = await someServerFunction(password);

    if (!passwordIsCorrect) {
      setServerResponseMessage('Password incorrect, please try again');
    } else {
      setServerResponseMessage('Success!');
      setPopUpVisible(false); // hides the PopUp div
    }
  };

  return { serverResponseMessage, popUpVisible, checkPassword };
};

export default usePasswordValidation;
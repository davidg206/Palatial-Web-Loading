import passwordVisibleImg from '../assets/Images/svg/toggle_password_visible.svg';
import passwordinvisibleImg from '../assets/Images/svg/toggle_password_Invisible.svg';



const PasswordForm = ({ password, setPassword, error, handleSubmit, handleGoBack, showPassword, togglePasswordVisibility, setInputFocused, setError }) => {
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

  return (
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
  );
};

export default PasswordForm;
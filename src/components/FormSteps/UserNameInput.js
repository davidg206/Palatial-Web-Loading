import React from 'react';
import '../../App.css'


const UserNameInput = ({ userName, setInputFocused, setError, setUserName, hftHelper, handleFormTransition }) => {
    return (
        <div className='PopUpContent fadeIn'>
            <div className="inputPrompt">
                <p>Enter Your Name</p>
                <input
                    className="userNameInput"
                    type="text"
                    value={userName}
                    onFocus={() => setInputFocused(true)}
                    onBlur={() => setInputFocused(false)}
                    onChange={(e) => { setError(""); setUserName(e.target.value) }}
                    onKeyPress={hftHelper}
                    required
                />
            </div>
            <p style={{ fontWeight: '300' }}>By proceeding you agree to our terms and conditions</p>
            <div className='passwordButtons'>
                <button className="proceedButton" onClick={handleFormTransition}>Proceed</button>
            </div>
        </div>
    );
}

export default UserNameInput;

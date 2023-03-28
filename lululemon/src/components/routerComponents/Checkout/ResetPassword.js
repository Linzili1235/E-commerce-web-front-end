import React from 'react';
import { TextField } from "@mui/material";
import { useState } from "react";
import '../ResetPassword.scss'

const ResetPassword = () => {
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');


    // validate email input
    const validateEmail = (email) => {
        // Basic email validation using a regular expression
        const emailRegex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
        return emailRegex.test(email);
    };

    // validate email input
    const handleSubmit = () => {
        console.log('email entered', email)
    }
    const handleEmailChange = (e) => {
        const emailInput = e.target.value;
        setEmail(emailInput);

        if (!validateEmail(emailInput)) {
            setEmailError('Please enter a valid email format');
        } else {
            setEmailError('');
        }
    };
    // validate password input
    const validatePassword = (password) => {
        return password.length >= 8 && password.length <= 30;
    }
    const handlePasswordChange = (e) => {
        const passwordInput = e.target.value
        setPassword(passwordInput);
        if(validatePassword(passwordInput)) {
            setPasswordError('');
        } else {
            setPasswordError('Password must be at least 8 characters long.');
        }
    };
    return (
        <div className='reset-password'>
            <div className="set-new">
                <span>Set a new password</span>
            </div>
            <div className="description">
                <span>Enter the email address associated with your lululemon account and we'll send you a link to set a new password.</span>
            </div>
            <TextField id="outlined-basic" label="Email Address" type='Email' variant="outlined"
                       sx={{
                           '& .MuiOutlinedInput-root': {
                               '&.Mui-focused': {
                                   boxShadow: '0 4px 6px rgba(0, 0, 0, 0.3)'
                               }
                           }}}
                       error={!!emailError} // Show error state when emailError is not empty
                       helperText={emailError}
                       value={email}
                       onChange={handleEmailChange}
                       style={{ width: '40%' }}/>
            <div className="enter-email-button" onClick={handleSubmit}>
                <span>Send Email</span>
            </div>

            <div className="set-new">
                <span>Change password (dev)</span>
            </div>
            {/*//////////////////////////////////////////////////////////*/}
            <TextField id="outlined-basic" label="Email Address" type='Email' variant="outlined"
                       sx={{
                           '& .MuiOutlinedInput-root': {
                               '&.Mui-focused': {
                                   boxShadow: '0 4px 6px rgba(0, 0, 0, 0.3)'
                               }
                           }}}
                       error={!!emailError} // Show error state when emailError is not empty
                       helperText={emailError}
                       value={email}
                       onChange={handleEmailChange}
                       style={{ width: '40%' }}/>
            <TextField id="outlined-basic" label="New password" type="password" variant="outlined"
                       sx={{
                           '& .MuiOutlinedInput-root': {
                               '&.Mui-focused': {
                                   boxShadow: '0 4px 6px rgba(0, 0, 0, 0.3)'
                               }
                           }}}
                       value={password}
                       error={!!passwordError}
                       helperText={passwordError}
                       inputProps={{ minLength: 8 }}
                       onChange={handlePasswordChange}
                       style={{ width: '40%', marginTop: '1rem'}}/>
            <div className="enter-email-button" onClick={handleSubmit}>
                <span>Change password</span>
            </div>
            <div className="logIn-button" onClick={handleSubmit}>
                <span>SIGN IN</span>
            </div>
        </div>
    );
};

export default ResetPassword;
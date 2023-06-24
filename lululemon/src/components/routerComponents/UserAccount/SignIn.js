import React, { useRef } from 'react';
import {TextField} from "@mui/material";
import { useState } from "react";
import './SignIn.scss'
import {useLocation, useNavigate} from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import axios,{api_routes} from "../../../api/axios";

export const SignIn = () => {
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const navigate = useNavigate()
    const location = useLocation()
    const from = location.state?.from?.pathname || '/'

    const [errMessage, setErrMessage] = useState(null);



    // By using useRef, you can directly access the current value of the input fields without having to manage the state
    // using useState every time the input value changes.
    // Why? ------ Performance! Since the reference doesn't trigger re-render when it's updated, using useRef can be more
    // performant compared to useState for handling input values.
    // set auth information in AuthContext
    // const {setAuth} = useContext(AuthContext)
    const {setAuth} = useAuth()
    const emailRef = useRef(null);
    const passwordRef = useRef(null);
    const savedEmail = window.localStorage.getItem('user')

    // validate email input
    const validateEmail = (email) => {
        // Basic email validation using a regular expression
        const emailRegex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
        return emailRegex.test(email);
    };

    // validate email input
    const handleSubmit = async (e) => {
        e.preventDefault()
        const email = emailRef.current.value
        const password = passwordRef.current.value

        try {
            await axios.post(api_routes.logIn,
                JSON.stringify({
                    email, password
                }),
                {
                    headers: {'Content-Type': 'application/json'},
                    withCredentials: true
                }).then(res => {
                console.log(JSON.stringify(res?.data))
                const accessToken = res?.data?.accessToken
                setAuth({email, accessToken})
                window.localStorage.setItem('user', email)


                // where the user wanted to go before sending to sign in page
                // on createuser page, there is no where user want it to go
                navigate(from, {replace: true})
            });

        } catch (e) {
            if (!e?.response) {
                setErrMessage('No Server Response')
            } else {
                console.log(e.response)
                setErrMessage(e.response.data.msg)
            }

        }
        // console.log('send old email', {email: emailRef.current.value})
        // console.log('new email entered', {email: newEmailRef.current.value, password: newPasswordRef.current.value})
    }

    const handleEmailChange = () => {
        const emailInput = emailRef.current.value
        console.log('new email input', emailInput)
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
    const handlePasswordChange = () => {
        const passwordInput = passwordRef.current.value
        if(validatePassword(passwordInput)) {
            setPasswordError('');
        } else {
            setPasswordError('Password must be at least 8 characters long.');
        }
    };

    const clickToCreate = () => {
        navigate('/createUser')
    }
    return (
        <div className="sign-in-container">
        <div className='sign-in'>
            <div className="sign-in-title">
                <span>Sign in to your member account</span>
                <span className='red-line'></span>
            </div>


            <div className="set-new">
                <span>Email Address</span>
            </div>
            {/*//////////////////////////////////////////////////////////*/}
            <TextField id="outlined-bas" label="Email Address" type='Email' variant="outlined"
                       defaultValue={savedEmail}
                       sx={{
                           '& .MuiOutlinedInput-root': {
                               '&.Mui-focused': {
                                   boxShadow: '0 4px 6px rgba(0, 0, 0, 0.3)'
                               }
                           }}}
                       error={!!emailError} // Show error state when emailError is not empty
                       helperText={emailError}
                       inputRef={emailRef}
                       onChange={handleEmailChange}
                       style={{ width: '70%', boxSizing: 'border-box',marginBottom: '1rem'}}/>
            <div className="set-new">
                <span>Password</span>
            </div>
            <TextField id="outlined-basic" label="Password" type="password" variant="outlined"
                       sx={{
                           '& .MuiOutlinedInput-root': {
                               '&.Mui-focused': {
                                   boxShadow: '0 4px 6px rgba(0, 0, 0, 0.3)'
                               }
                           }}}
                       inputRef={passwordRef}
                       error={!!passwordError}
                       helperText={passwordError}
                       onChange={handlePasswordChange}
                       style={{ width: '70%', marginBottom: '1rem'}}/>
            <div className="errorMsg">
                <span>{errMessage}</span>
            </div>
            <div className="logIn-button" onClick={handleSubmit}>
                <span>SIGN IN</span>
            </div>

            <div className="create-user" onClick={clickToCreate}>
                <span className="create-user-span">Create a member account</span>

            </div>

        </div>

        </div>
    );

};
import React, { useState, useRef, useEffect } from 'react';
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import './Login.scss'
import axios from "axios";
import {api_routes} from "../../../api/axios";

const Login = () => {
    const navigate = useNavigate();
    const [arrowClicked, setArrowClicked] = useState(false);
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [successMsg, setSuccessMsg] = useState(null);
    const [errMessage, setErrMessage] = useState(null);

    const emailRef = useRef(null)
    const passwordRef = useRef(null)


    const handleArrowToggle = () => {
        setArrowClicked(prevState => !prevState)
    }
    const handleLogIn = (e) => {
        e.preventDefault();
        arrowClicked ? setArrowClicked(false) : setArrowClicked(true);
    };
    const handleSubmit = async () => {
        const email = emailRef.current.value;
        const password = passwordRef.current.value;
        if (!arrowClicked) setArrowClicked(true)
        if (!email) {
            setEmailError('Please enter an email')
        } else if (!password) {
            setPasswordError('Please enter a password')
        } else {
            console.log({
                email,
                password,
                // Add more input values here
            });
            // Send the data to the server (not implemented here)
            await axios.post(api_routes.logIn,
                {
                        email: emailRef.current.value,
                        password: passwordRef.current.value
                })
                .then((res) => {
                    console.log(res.data)
                    setSuccessMsg(res.data.error.msg)
                    window.localStorage.setItem('user', emailRef.current.value)
                })
                .catch((err) => {
                    console.log(err)
                    setErrMessage(err.response.data.msg)
                })
        }
    };

    const handleAlert = () => {
        if (successMsg !== null) {
            alert(successMsg)
            setSuccessMsg(null)
        }
        if (errMessage !== null) {
            alert(errMessage)
            setErrMessage(null)
        }
    }

    const validateEmail = (email) => {
        // Basic email validation using a regular expression
        const emailRegex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
        return emailRegex.test(email);
    };
    const validatePassword = (password) => {
        return password.length >= 8 && password.length <= 30;
    }
    const handlePasswordChange = () => {
        const passwordInput = passwordRef.current.value;
        if(validatePassword(passwordInput)) {
            setPasswordError('');
        } else {
            setPasswordError('Password must be at least 8 characters long.');
        }
    };
    const handleEmailChange = () => {
        const emailInput = emailRef.current.value;
        if (!validateEmail(emailInput)) {
            setEmailError('Please enter a valid email format');
        } else {
            setEmailError('');
        }
    };

    useEffect(() => {
        handleAlert();
    }, [successMsg, errMessage]);

    return (
        <div>
            <div className="title">Have an account</div>
            <div className="content">
                <a href="" onClick={handleLogIn}>
                    Log in
                </a> &nbsp;to checkout more quickly and easily
                <div className={arrowClicked ? 'arrow-clicked' : 'arrow'} onClick={handleArrowToggle}>
                    {arrowClicked ? <KeyboardArrowUpIcon/> : <KeyboardArrowDownIcon/>}
                </div>
            </div>
            <div className={arrowClicked ? 'email' : 'email-hide'}>
                <div>
                    {
                        <TextField id="outlined-basic" label="Email Address" type='Email' variant="outlined"
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
                                style={{ width: '120%' }}/>
                    }
                </div>
                <div>{<TextField id="outlined-basic" label="Password" type="password" variant="outlined"
                                 sx={{
                                     '& .MuiOutlinedInput-root': {
                                         '&.Mui-focused': {
                                             boxShadow: '0 4px 6px rgba(0, 0, 0, 0.3)'
                                         }
                                     }}}
                                 inputRef={passwordRef}
                                 error={!!passwordError}
                                 helperText={passwordError}
                                 inputProps={{ minLength: 8 }}
                                 onChange={handlePasswordChange}
                                 style={{ width: '120%' }}/>}
                    <div className="forgot-password">
                        <a href="" onClick={()=> { navigate('/reset') }}>Forgot your password?</a>
                    </div>
                </div>
            </div>
            <div className="signIn-button" onClick={handleSubmit}>
                <span>SIGN IN</span>
            </div>
        </div>
    );
};

export default Login;
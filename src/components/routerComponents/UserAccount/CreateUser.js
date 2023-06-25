import React, {useEffect, useRef} from 'react';
import {TextField} from "@mui/material";
import { useState } from "react";
import './CreateUser.scss'
import {useNavigate} from "react-router-dom";
import axios from  "../../../api/axios";
import {api_routes} from "../../../api/axios";


export const CreateUser = () => {
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [successMsg, setSuccessMsg] = useState(null);
    const [errMessage, setErrMessage] = useState(null);
    const navigate = useNavigate()

    // By using useRef, you can directly access the current value of the input fields without having to manage the state
    // using useState every time the input value changes.
    // Why? ------ Performance! Since the reference doesn't trigger re-render when it's updated, using useRef can be more
    // performant compared to useState for handling input values.
    const emailRef = useRef(null);
    const passwordRef = useRef(null);
    const firstNameRef = useRef(null);
    const lastNameRef = useRef(null);

    // once email or password change, the error msg should be deleted
    useEffect(()=>{
        setEmailError('')

    },[emailRef])

    useEffect(() => {
        setPasswordError('')
    },[passwordRef])


    // validate email input
    const validateEmail = (email) => {
        // Basic email validation using a regular expression
        const emailRegex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
        return emailRegex.test(email);
    };

    // validate email input

    const handleEmailChange = () => {
        const emailInput = emailRef.current.value
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

    const handleSubmit = async (e) => {
        e.preventDefault()
        const email = emailRef.current.value;
        const password = passwordRef.current.value;
        const firstName = firstNameRef.current.value;
        const lastName = lastNameRef.current.value;
        let jsonOb = ''
        if (!email) {
            setEmailError('Please enter an email')
        } else if (!password) {
            setPasswordError('Please enter a password')
        } else {
            jsonOb = JSON.stringify({
                email, password, firstName, lastName
            })
            console.log(JSON.stringify({
                email:email,
                password: password,
                firstName: firstName,
                lastName:lastName,
            }))

            // Send the data to the server (not implemented here)
            await axios.post(api_routes.createUser,
                jsonOb,
                {
                    headers:{'Content-Type': 'application/json'},
                    withCredentials: true
                }
                )
                .then((res) => {
                    console.log(res.data)
                    setSuccessMsg(res.data)
                    window.localStorage.setItem('user', emailRef.current.value)
                    setErrMessage('')
                    setPasswordError('')
                    setEmailError('')
                    navigate('/signIn')
                })
                .catch((err) => {
                    if (!err?.response) {
                        setErrMessage("No Server Connection")
                    }
                    console.log(err)
                    setErrMessage(err.response.data.msg)
                })
        }
    };

    return (
        <div className="create-user-container">
            <div className='create-user'>
                <div className="create-user-title">
                    <span>Create a member account</span>
                </div>


                <div className="set-new">
                    <span>First Name</span>
                </div>
                {/*//////////////////////////////////////////////////////////*/}
                <TextField id="outlined-basic"  variant="outlined"
                           sx={{
                               '& .MuiOutlinedInput-root': {
                                   '&.Mui-focused': {
                                       boxShadow: '0 4px 6px rgba(0, 0, 0, 0.3)'
                                   }
                               }}}
                           inputRef={firstNameRef}
                           style={{ width: '70%', boxSizing: 'border-box',marginBottom: '1rem'}}/>
                <div className="set-new">
                    <span>Last Name</span>
                </div>
                <TextField id="outlined-basic" variant="outlined"
                           sx={{
                               '& .MuiOutlinedInput-root': {
                                   '&.Mui-focused': {
                                       boxShadow: '0 4px 6px rgba(0, 0, 0, 0.3)'
                                   }
                               }}}
                           inputRef={lastNameRef}
                           style={{ width: '70%', marginBottom: '1rem'}}/>

                <div className="set-new">
                    <span>Email Address</span>
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
                           inputRef={emailRef}
                           onChange={handleEmailChange}
                           style={{ width: '70%', boxSizing: 'border-box',marginBottom: '1rem'}}/>
                <div className="set-new">
                    <span>Password</span>
                </div>
                <TextField id="outlined-basic" label="password" type="Password" variant="outlined"
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
                           style={{ width: '70%', marginBottom: '1rem'}}/>
                <div className="errorMsg">
                    <span>{errMessage}</span>
                </div>

                <div className={(emailError==='') && (passwordError==='') ? "create-button": 'hide'} onClick={handleSubmit}>
                    <span>Create member account</span>
                </div>
                <div className="term-of-use">
                    <span>By clicking "Create Member Account"
                        you agree to the Terms of Use and to join lululemon
                        Membership. See our Privacy Policy for details about
                        our information practices. California consumers, also
                        see our Notice of Financial Incentives. lululemon will
                        use information you submit (including identifiers,
                        commercial information, and internet or other electronic
                        network activity information) to fulfill this request.</span>
                </div>



            </div>

        </div>
    );

};
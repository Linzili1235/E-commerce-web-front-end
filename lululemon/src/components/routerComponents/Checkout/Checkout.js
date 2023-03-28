import React, { useState } from 'react';
import './Checkout.scss';
import { TextField } from "@mui/material";
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import ArriveDate from "../Cart/ArriveDate";
import { CheckoutSummary } from "./CheckoutSummary";
import { useNavigate } from "react-router-dom";

export const Checkout = () => {
    const navigate = useNavigate();
    const [arrowClicked, setArrowClicked] = useState(false)
    // Make sure the formats of email and password are correct
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');

    // Grab input values
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogIn = (e) => {
        e.preventDefault();
        arrowClicked ? setArrowClicked(false) : setArrowClicked(true);
    };
    const handleNextStep = () => {
        alert("Proceeding to the next step");
        // Add your logic for the next step here
    };
    const handleSubmit = () => {
        if (!arrowClicked) setArrowClicked(true)
        if (!email) {
            setEmailError('Please enter an email')
        } else if (!password) {
            setPasswordError('Please enter a password')
        } else {
            alert('Logged In')
            console.log({
                email,
                password,
                // Add more input values here
            });
            // Send the data to the server (not implemented here)
        }
    };
    // validate email input
    const validateEmail = (email) => {
        // Basic email validation using a regular expression
        const emailRegex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
        return emailRegex.test(email);
    };
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
    const handleEmailChange = (e) => {
        const emailInput = e.target.value;
        setEmail(emailInput);

        if (!validateEmail(emailInput)) {
            setEmailError('Please enter a valid email format');
        } else {
            setEmailError('');
        }
    };
    const handleArrowToggle = () => {
        setArrowClicked(prevState => !prevState)
    }

    return (
        <>
            <div className="checkout-main-border">
                <div className="checkout-title">Checkout</div>
                <div className="checkout-main-container">
                    <div className="information">
                        <div className="info-box have-an-account">
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
                                <div>{<TextField id="outlined-basic" label="Email Address" type='Email' variant="outlined"
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
                                                 style={{ width: '120%' }}/>}</div>
                                <div>{<TextField id="outlined-basic" label="Password" type="password" variant="outlined"
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
                                                 style={{ width: '120%' }}/>}
                                     <div className="forgot-password">
                                         <a href="" onClick={()=> { navigate('/reset') }}>Forgot your password?</a></div>
                                </div>
                            </div>
                            <div className="signIn-button" onClick={handleSubmit}>
                                <span>SIGN IN</span>
                            </div>
                        </div>
                        <div className="info-box contact-information">
                            <div className="title">Contact Information</div>
                            <div className="email">Email address (for order notification)</div>
                            <div className='input'>{<TextField id="outlined-basic" variant="outlined"
                                                               sx={{
                                                                   '& .MuiOutlinedInput-root': {
                                                                       '&.Mui-focused': {
                                                                           boxShadow: '0 4px 6px rgba(0, 0, 0, 0.3)'
                                                                       }
                                                                   }}}
                                                               style={{ width: '100%' }}/>}</div>
                            <div className="sign-up">
                                <div className="checkbox"></div>
                                <input type="checkbox" />
                                Sign me up for lululemon emails (you can unsubscribe at any time). See our privacy policy for details.
                            </div>

                        </div>
                        <div className="info-box shipping-address">
                            <div className="title">Shipping Address</div>
                            <div className="names-input">
                                <div className='name-input fName'>
                                    {<TextField id="outlined-basic" label="First Name" variant="outlined" style={{ width: '100%' }}
                                                sx={{
                                                    '& .MuiOutlinedInput-root': {
                                                        '&.Mui-focused': {
                                                            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.3)'
                                                        }
                                                    }}} />}
                                    </div>
                                <div className='name-input lName'>
                                    {<TextField id="outlined-basic" label="Last Name" variant="outlined" style={{ width: '100%' }}
                                                sx={{
                                                    '& .MuiOutlinedInput-root': {
                                                        '&.Mui-focused': {
                                                            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.3)'
                                                        }
                                                    }}} />}
                                </div>
                            </div>
                            <div className="phone-input">
                                <div className='name-input fName'>
                                    {<TextField
                                        id="outlined-basic" label="Phone Number" variant="outlined" style={{ width: '100%' }}
                                        sx={{
                                            '& .MuiOutlinedInput-root': {
                                                '&.Mui-focused': {
                                                    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.3)', // Add your desired boxShadow value here
                                                },
                                            },
                                        }} />}
                                </div>
                                <p>This will be only used for delivery related issues.</p>
                            </div>
                            <div className="address-input">
                                    {<TextField
                                        id="outlined-basic" label="Address" variant="outlined" style={{ width: '100%' }}
                                        sx={{
                                            '& .MuiOutlinedInput-root': {
                                                '&.Mui-focused': {
                                                    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.3)', // Add your desired boxShadow value here
                                                },
                                            },
                                        }} />}
                            </div>
                            <div className="location">
                                <div className='location-input city'>
                                    {<TextField
                                        id="outlined-basic" label="City" variant="outlined" style={{ width: '80%' }}
                                        sx={{
                                            '& .MuiOutlinedInput-root': {
                                                '&.Mui-focused': {
                                                    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.3)', // Add your desired boxShadow value here
                                                },
                                            },
                                        }} />}
                                </div>
                                <div className='location-input province'>
                                    {<TextField
                                        id="outlined-basic" label="Province" variant="outlined" style={{ width: '80%' }}
                                        sx={{
                                            '& .MuiOutlinedInput-root': {
                                                '&.Mui-focused': {
                                                    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.3)', // Add your desired boxShadow value here
                                                },
                                            },
                                        }} />}
                                </div>
                                <div className='location-input PostalCode'>
                                    {<TextField
                                        id="outlined-basic" label="Postal Code" variant="outlined" style={{ width: '80%' }}
                                        sx={{
                                            '& .MuiOutlinedInput-root': {
                                                '&.Mui-focused': {
                                                    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.3)', // Add your desired boxShadow value here
                                                },
                                            },
                                        }} />}
                                </div>
                            </div>

                        </div>
                        <div className="info-box shipping-gift">
                            <div className="title">Shipping & gift options</div>
                            <div className="arrivalDate">
                                <div className="days">3 business days</div>
                                <div className="shipping-type">Standard Shipping (Free)</div>
                                <div className="arrive-title">Arrives by:</div>
                                <div className="date"><ArriveDate/></div>
                            </div>
                        </div>

                        <div className="next-step">
                                <div className="next-step-button" onClick={handleNextStep}>
                                    <span>GO TO NEXT STEP</span>
                                </div>
                        </div>
                    </div>
                    <div className="product-summary">
                        <CheckoutSummary />
                    </div>
                </div>

            </div>
        </>
    );
};
import React, { useState } from 'react';
import './Checkout.scss';
import { TextField } from "@mui/material";
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
export const Checkout = () => {
    const [arrowClicked, setArrowClicked] = useState(false)

    const handleArrowToggle = () => {
        setArrowClicked(prevState => !prevState)
    }

    return (
        <>
            <div className="checkout-main-border">
                <div className="checkout-title">CheckOut</div>
                <div className="checkout-main-container">
                    <div className="information">
                        <div className="info-box have-an-account">
                            <div className="title">Have an account</div>
                            <div className="content">
                                <a href="">Log in</a> to checkout more quickly and easily <div className={arrowClicked ? 'arrow-clicked' : 'arrow'} onClick={handleArrowToggle}>{<KeyboardArrowUpIcon/>}</div></div>
                            <div className={arrowClicked ? 'email' : 'email-hide'}>
                                <div>{<TextField id="outlined-basic" label="Email Address" variant="outlined" style={{ width: '120%' }}/>}</div>
                                <div>{<TextField id="outlined-basic" label="Password" variant="outlined" style={{ width: '120%' }}/>}
                                     <div className="forgot-password"><a href="">Forgot your password?</a></div>
                                </div>
                            </div>
                            <div className="signIn-button">
                                <span>SIGN IN</span>
                            </div>
                        </div>
                        <div className="info-box contact-information">
                            <div className="title">Contact Information</div>
                            <div className="email">Email address (for order notification)</div>
                            <div className="input-box"></div>
                            <div className="sign-up">
                                <div className="checkbox"></div>
                                Sign me up for lululemon emails (you can unsubscribe at any time). See our privacy policy for details.
                            </div>

                        </div>
                        <div className="info-box shipping-address">
                            <div className="title">Shipping Address</div>

                        </div>
                        <div className="info-box shipping-gift">
                            <div className="title">Shipping & gift options</div>

                        </div>
                    </div>
                    <div className="product-summary">summary</div>
                </div>
            </div>
        </>
    );
};
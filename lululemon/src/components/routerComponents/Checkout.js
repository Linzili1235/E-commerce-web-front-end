import React from 'react';
import './Checkout.scss';
export const Checkout = () => {
    return (
        <>
            <div className="checkout-main-border">
                <div className="checkout-title">CheckOut</div>
                <div className="checkout-main-container">
                    <div className="information">
                        <div className="info-box have-an-account">
                            <div className="title">Have an account</div>
                            <div className="content">Log in to checkout more quickly and easily </div>
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
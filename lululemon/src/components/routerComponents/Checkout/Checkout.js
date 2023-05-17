import React, { useRef, useState } from 'react';
import './Checkout.scss';
import { TextField } from "@mui/material";
import ArriveDate from "../Cart/ArriveDate";
import { CheckoutSummary } from "./CheckoutSummary";
import Login from "./Login";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";

export const Checkout = () => {
    const navigate = useNavigate();
    // shipping info
    const fName = useRef(null)
    const lName = useRef(null)
    const phone = useRef(null)
    const address = useRef(null)
    const city = useRef(null)
    const province = useRef(null)
    const postalCode = useRef(null)
    // Make sure the formats of email and password are correct
    const [contactEmailError, setContactEmailError] = useState('');
    const {addedProducts} = useSelector(state=>state?.productReducer)
    const products = []
    const quantities = []
    let total = 0

    // change user to normal user email
    const user = window.localStorage.getItem('user');
    const shippingAddress = `First Name: ${fName.current.value}\nLast Name: ${lName.current.value}\nPhone: ${phone.current.value}\nCity: ${city.current.value}\nProvince: ${province.current.value}\nPostal Code: ${postalCode.current.value}`;
    console.log('shipping',shippingAddress)
    const payment = 1

    const generateSlug = (productId, color, size) => {
        const slugParts = [productId]
        // if (color) {
        //     const newColor = color.replace(' ', '-')
        slugParts.push(color)
        // }
        if (size) {
            slugParts.push(size)
        }
        return slugParts.join('-')
    }

    for (const pro of addedProducts) {
        const {price, size,color} = pro.productInfo
        const {quantity, productId} = pro
        const updatedPrice = price.split("-")[0]
        const numericValue = parseFloat(updatedPrice.replace(/[^0-9.]/g, ''))
        const slug = generateSlug(productId, color, size)
        products.push(slug)
        quantities.push(quantity)
        total += numericValue * quantity

    }


    const handleNextStep = async () => {
        // alert("Proceeding to the next step");
        // place order here
        await axios.post("http://localhost:8000/order/create", {
            total, payment, shippingAddress,
            user, products, quantity: quantities
            // for reviewing order
        }).then(res => window.localStorage.setItem('orderNumber', JSON.stringify(res.data.orderNumber))
        ).catch(err => console.log(err))

        navigate('/orderPlaced')
    }

    // Grab input values
    const contactEmailRef = useRef(null)

    // validate email input
    const validateEmail = (email) => {
        // Basic email validation using a regular expression
        const emailRegex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
        return emailRegex.test(email);
    };

    const handleContactEmailChange = () => {
        const emailInput = contactEmailRef.current.value;
        if (!validateEmail(emailInput)) {
            setContactEmailError('Please enter a valid email format');
        } else {
            setContactEmailError('');
        }
    };

    return (
        <>
            <div className="checkout-main-border">
                <div className="checkout-title">Checkout</div>
                <div className="checkout-main-container">
                    <div className="information">
                        <div className="info-box have-an-account">
                            <Login />
                        </div>
                        <div className="info-box contact-information">
                            <div className="title">Contact Information</div>
                            <div className="email">Email address (for order notification)</div>
                            <div className='input'>
                                {
                                    <TextField
                                        id="outlined-basic"
                                        variant="outlined"
                                        sx={{
                                            '& .MuiOutlinedInput-root': {
                                                '&.Mui-focused': {
                                                    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.3)'
                                                }
                                            }}}
                                        error={!!contactEmailError} // Show error state when emailError is not empty
                                        inputRef={contactEmailRef}
                                        onChange={handleContactEmailChange}
                                        style={{ width: '100%' }}/>
                                }
                            </div>
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
                                    {<TextField id="outlined-basic"
                                                label="First Name"
                                                variant="outlined"
                                                style={{ width: '100%' }}
                                                inputRef={fName}
                                                sx={{
                                                    '& .MuiOutlinedInput-root': {
                                                        '&.Mui-focused': {
                                                            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.3)'
                                                        }
                                                    }}} />}
                                    </div>
                                <div className='name-input lName'>
                                    {<TextField id="outlined-basic"
                                                label="Last Name"
                                                variant="outlined"
                                                style={{ width: '100%' }}
                                                inputRef={lName}
                                                sx={{
                                                    '& .MuiOutlinedInput-root': {
                                                        '&.Mui-focused': {
                                                            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.3)'
                                                        }
                                                    }}} />}
                                </div>
                            </div>
                            <div className="phone-input">
                                <div className='name-input'>
                                    {<TextField
                                        id="outlined-basic"
                                        label="Phone Number"
                                        variant="outlined"
                                        style={{ width: '100%' }}
                                        inputRef={phone}
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
                                        id="outlined-basic"
                                        label="Address"
                                        variant="outlined"
                                        style={{ width: '100%' }}
                                        inputRef={address}
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
                                        id="outlined-basic"
                                        label="City"
                                        variant="outlined"
                                        style={{ width: '80%' }}
                                        inputRef={city}
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
                                        id="outlined-basic"
                                        label="Province"
                                        variant="outlined"
                                        style={{ width: '80%' }}
                                        inputRef={province}
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
                                        id="outlined-basic"
                                        label="Postal Code"
                                        variant="outlined"
                                        style={{ width: '80%' }}
                                        inputRef={postalCode}
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
                                    <span>Place Order</span>
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
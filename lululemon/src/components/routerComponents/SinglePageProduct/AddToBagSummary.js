import React, {useEffect, useState} from 'react';
import './AddToBagSummary.scss'
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import { useDispatch, useSelector } from "react-redux";
import actions from "../../../actions";
import {useNavigate} from "react-router-dom";
import {ShoppingBagOutlined} from "@mui/icons-material";

const AddToBagSummary = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const addedProducts = useSelector(state => state?.productReducer.addedProducts)
    const currTotal = useSelector(state => state?.productReducer.currTotal)
    const { isClosed } = useSelector(state => state?.productReducer)

    /////////////////////////   Local storage   //////////////////////////////////
    useEffect(() => {
        const data = window.localStorage.getItem('Added Products')
        const recoveredProduct = JSON.parse(data)
        // when refreshing, data in redux store will lose, then should recover data using localStorage
        dispatch(actions?.productActions?.addWhenRefresh(recoveredProduct))
    },[])


    useEffect(() => {
            window.localStorage.setItem('Added Products', JSON.stringify(addedProducts));
    }, [addedProducts]);


    ////////////////////////////////////////////////////////////////////////////////////////////////

    const handleClose = (e) => {
        // preventing the default behavior of the anchor tag (a tag)
        // (i.e., navigating to an empty href), which might cause a page refresh
        // and lead to losing the current state of your application.
        e.preventDefault();
        dispatch(actions?.productActions?.toggleSummaryBox(true))
    }
    const removeLocal = () => {
        window.localStorage.removeItem('Added Products');
        dispatch(actions?.productActions?.removeProduct())
    }

    const goToCart = () => {
        dispatch(actions?.productActions?.toggleSummaryBox(true))
        navigate('/mybag')
    }

    const totalQ = () => {
        let count = 0
        for (const obj of addedProducts) {
            count += obj.quantity
        }
        return count
    }

    const totalQuantity = totalQ()

    return (
        <>
            <div className={ isClosed ? 'hidden-summary-box' : 'summary-container' }>
                <button onClick={removeLocal}>Remove</button>
                <div className="summary-container-background" onClick={handleClose}></div>
                <div className="summary-box">
                    <div className="summary-content">
                        <div className="summary-header">
                            <div className="summary-title">
                                Added To Your Bag
                            </div>
                            <div className="shopping-bag-icon">
                                <ShoppingBagOutlined fontSize={"large"} />
                                <span className="shopping-total"><strong>{totalQuantity}  {`${totalQuantity > 1 ? 'Items': 'Item'}`}</strong></span>                            </div>
                        </div>
                        <div className="close-button">
                            <CloseOutlinedIcon fontSize={'large'} onClick={handleClose}/>
                        </div>
                        <div className="breakLine"></div>
                        <div className="notification">
                            <p>Items are not reserved. Checkout now to get your gear.</p>
                        </div>

                        <div className="product-summary-list">
                            {
                                addedProducts && addedProducts.filter(product => product !== null).reverse().map((product, indx) => {
                                    const {img, name, price, size} = product.productInfo
                                    const {quantity} = product
                                    const updatedPrice = price.split("-")[0]
                                    const numericValue = parseFloat(updatedPrice.replace(/[^0-9.]/g, ''));

                                    return <div className='product-summary' key={indx}>
                                        <img className='product-img' src={img} alt="product-img"/>
                                        <div className="title-price-container">
                                            <div className="product-title">{name}</div>
                                            <div className="product-size">Size: {size}</div>
                                            <div className="product-price">
                                                {
                                                    quantity > 1 ? `$${(numericValue * quantity).toFixed(2)} CAD` : `$${numericValue.toFixed(2)} CAD`
                                                }
                                            </div>
                                            <div className="product-quantity">Quantity: {quantity}</div>
                                        </div>
                                    </div>
                                })
                            }
                            <div className="vertical-break-line"></div>
                            <div className="checkout-area">
                                <div className="subtotal">
                                    <div className="sub-left">
                                        Subtotal:
                                    </div>
                                    <div className="sub-right">
                                        ${currTotal.toFixed(2)} CAD
                                    </div>
                                </div>
                                <div className="checkout-button-container" onClick={()=>goToCart()}>
                                    <div className="checkout-button">VIEW BAG & CHECKOUT</div>
                                </div>
                                <div className="continue-button">
                                    <a href="" onClick={handleClose}>CONTINUE SHOPPING</a>
                                </div>
                            </div>
                        </div>

                    </div>

                </div>
            </div>
        </>
    );
};

export default AddToBagSummary;
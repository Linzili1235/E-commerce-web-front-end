import React, { useEffect, useState } from 'react';
import './AddToBagSummary.scss'
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import { useDispatch, useSelector } from "react-redux";
import { actionType } from "../../../Helper";


const AddToBagSummary = () => {
    const dispatch = useDispatch()
    const addedProducts = useSelector(state => state?.productReducer.addedProducts)
    const currTotal = useSelector(state => state?.productReducer.currTotal)
    const { isClosed } = useSelector(state => state?.productReducer)

    /////////////////////////   Local storage   //////////////////////////////////
    const [addedItems, setAddedItems] = useState([])
    const [loaded, setLoaded] = useState(false)
    console.log('added items length',addedItems.length)
    useEffect(() => {
        const data = window.localStorage.getItem('Added Products')
        if (data) {
            setAddedItems(JSON.parse(data))
        } else {
            setAddedItems(addedProducts)
        }
        setLoaded(true)
    }, [])

    useEffect(() => {
        if (loaded) {
            const updatedAddedItems = [...addedItems, ...addedProducts];
            console.log('updated added', updatedAddedItems)
            setAddedItems(updatedAddedItems);
            window.localStorage.setItem('Added Products', JSON.stringify(updatedAddedItems));
        }
    }, [addedProducts]);

    ////////////////////////////////////////////////////////////////////////////////////////////////

    const handleClose = (e) => {
        // preventing the default behavior of the anchor tag (a tag)
        // (i.e., navigating to an empty href), which might cause a page refresh
        // and lead to losing the current state of your application.
        e.preventDefault();
        dispatch({
            type: actionType.TOGGLE_SUMMARY_BOX,
            payload: {isClosed: true}
        })
    }
    const removeLocal = () => {
        setAddedItems([])
        window.localStorage.removeItem('Added Products');
    }

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
                            {/*   todo: Add shopping bag icon    */}
                            </div>
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
                                addedItems && addedItems.filter(product => product !== null).map((product, indx) => {
                                    const {img, title, price, size} = product.productInfo
                                    const {quantity} = product
                                    const numericValue = parseFloat(price.replace(/[^0-9.]/g, ''));

                                    return <div className='product-summary' key={indx}>
                                        <img className='product-img' src={img} alt="product-img"/>
                                        <div className="title-price-container">
                                            <div className="product-title">{title}</div>
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
                                <div className="checkout-button-container">
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
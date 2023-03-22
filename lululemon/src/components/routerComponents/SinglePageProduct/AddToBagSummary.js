import React, { useEffect, useState } from 'react';
import './AddToBagSummary.scss'
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import { useDispatch, useSelector } from "react-redux";
import { actionType } from "../../../Helper";
import actions from "../../../actions";


const AddToBagSummary = () => {
    const dispatch = useDispatch()
    const addedProducts = useSelector(state => state?.productReducer.addedProducts)
    const currTotal = useSelector(state => state?.productReducer.currTotal)
    const { isClosed } = useSelector(state => state?.productReducer)

    /////////////////////////   Local storage   //////////////////////////////////
    // const [addedItems, setAddedItems] = useState([])
    const [loaded, setLoaded] = useState(false)
    // useEffect(() => {
    //     const data = window.localStorage.getItem('Added Products')
    //     if (data) {
    //         setAddedItems(JSON.parse(data))
    //         console.log("new item", JSON.parse(data))
    //     } else {
    //         setAddedItems(addedProducts)
    //     }
    //     setLoaded(true)
    // }, [])
    useEffect(() => {
        const data = window.localStorage.getItem('Added Products')
        console.log("print once refresh", JSON.parse(data))
        const recoveredProduct = JSON.parse(data)
        // when refreshing, data in redux store will lose, then should recover data using localStorage
        dispatch(actions?.productActions?.addWhenRefresh(recoveredProduct)).then()
        // if (data) {
        //     const item = JSON.parse(data)
        //     setAddedItems(prevState => [...prevState, item])
        //     console.log("new item", JSON.parse(data))
        //     console.log("whether added to bag", addedItems)
        //         } else {
        //             setAddedItems(addedProducts)
        //         }

    },[])


    useEffect(() => {
        // if (loaded) {
        //     const updatedAddedItems = [...addedProducts]
            // const updatedAddedItems = [...addedItems, ...addedProducts];
            // console.log('updated added', updatedAddedItems)
            // setAddedItems(addedProducts);
            window.localStorage.setItem('Added Products', JSON.stringify(addedProducts));
        // const items = JSON.parse(data)
        // }
    }, [addedProducts]);
    // console.log('added items length',addedItems.length)


    ////////////////////////////////////////////////////////////////////////////////////////////////

    const handleClose = (e) => {
        // preventing the default behavior of the anchor tag (a tag)
        // (i.e., navigating to an empty href), which might cause a page refresh
        // and lead to losing the current state of your application.
        e.preventDefault();
        dispatch(actions?.productActions?.toggleSummaryBox(true)).then()
    }
    const removeLocal = () => {
        // setAddedItems([])
        window.localStorage.removeItem('Added Products');
        dispatch(actions?.productActions?.removeProduct()).then()
        console.log("addedProduct after removal", addedProducts)

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
                                addedProducts && addedProducts.filter(product => product !== null).map((product, indx) => {
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
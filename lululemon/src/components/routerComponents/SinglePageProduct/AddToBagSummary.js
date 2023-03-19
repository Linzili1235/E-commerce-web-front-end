import React from 'react';
import './AddToBagSummary.scss'
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import { useDispatch, useSelector } from "react-redux";
import { actionType } from "../../../Helper";

const AddToBagSummary = () => {
    const dispatch = useDispatch()
    const { addedProducts, isClosed } = useSelector(state => state?.productReducer)
    console.log('added products', addedProducts)
    const handleClose = () => {
        dispatch({
            type: actionType.TOGGLE_SUMMARY_BOX,
            payload: {isClosed: true}
        })
    }
    return (
        <>
            <div className={ isClosed ? 'hidden-summary-box' : 'summary-container' }>
                <div className="summary-container-background"></div>
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
                                addedProducts.map((product, indx) => {
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
                                            <div className="product-quantity">{quantity}</div>
                                        </div>
                                    </div>
                                })
                            }
                        </div>
                    </div>

                </div>
            </div>
        </>
    );
};

export default AddToBagSummary;
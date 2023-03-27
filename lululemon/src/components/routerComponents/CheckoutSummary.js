import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { useSelector } from "react-redux";
import './CheckoutSummary.scss';
import React from "react";

export const CheckoutSummary = () => {
    const { currTotal } = useSelector(state => state?.productReducer)
    const { addedProducts } = useSelector(state => state?.productReducer)

    return <>
        <section className="checkout-summary">
            <div className="title">Order Summary</div>
            {/*<div className="products-images">*/}
            {/*    <div className='summary-container'>*/}
            {/*                <div className="product-summary-list">*/}
            {/*                    {*/}
            {/*                        addedProducts && addedProducts.filter(product => product !== null).reverse().map((product, indx) => {*/}
            {/*                            const {img, title, price, size} = product.productInfo*/}
            {/*                            const {quantity} = product*/}
            {/*                            const updatedPrice = price.split("-")[0]*/}
            {/*                            const numericValue = parseFloat(updatedPrice.replace(/[^0-9.]/g, ''));*/}

            {/*                            return <div className='product-summary' key={indx}>*/}
            {/*                                <img className='product-img' src={img} alt="product-img"/>*/}
            {/*                                <div className="title-price-container">*/}
            {/*                                    <div className="product-title">{title}</div>*/}
            {/*                                    <div className="product-size">Size: {size}</div>*/}
            {/*                                    <div className="product-price">*/}
            {/*                                        {*/}
            {/*                                            quantity > 1 ? `$${(numericValue * quantity).toFixed(2)} CAD` : `$${numericValue.toFixed(2)} CAD`*/}
            {/*                                        }*/}
            {/*                                    </div>*/}
            {/*                                    <div className="product-quantity">Quantity: {quantity}</div>*/}
            {/*                                </div>*/}
            {/*                            </div>*/}
            {/*                        })*/}
            {/*                    }*/}
            {/*                </div>*/}
            {/*    </div>*/}
            {/*</div>*/}

            <div className="summary-details">
                <div className="detail">
                    <span>Subtotal</span>
                    <span>${currTotal.toFixed(2)}</span>
                </div>
                <hr/>
                <div className="detail">
                    <span>Shipping  &nbsp;<span>{<InfoOutlinedIcon fontSize={'small'}/>}</span></span>
                    <span>Free</span>
                </div>
                <hr/>
                <div className="detail">
                    <span>Tax &nbsp;<span>{<InfoOutlinedIcon fontSize={'small'}/>}</span></span>
                    <span>Calculated at next step</span>
                </div>
                <hr/>
            </div>
            <div className="estimate">
                <span className="estTotal">Estimate Total</span>
                <span className="totalPrice">${currTotal.toFixed(2)}</span>
            </div>
        </section>
    </>
}
import "./OrderedProduct.scss"
import {useState} from "react";

import {useDispatch} from "react-redux";


export const OrderedProduct = ({product,index}) => {
    const dispatch = useDispatch()
    const {productInfo, quantity} = product
    // for some reasons, here the properties won't change with product
    const {img, name, color, price, size} = productInfo

    const updatedPrice = price.split("-")[0]
    const numericPrice = parseFloat(updatedPrice.replace(/[^0-9.]/g, ''))
    const twoDigitPrice = `$${numericPrice.toFixed(2)}`
    const twoDigitTotalPrice = `$${(numericPrice * quantity).toFixed(2)}`





    return <>
    <div className="productInBag-container">
    <div className="productInBag">
        <div className="product-image-container">
            <img className="productImg" src={img} alt={name} />
        </div>
        <div className="product-details-container">
            <h3 className="product-title" ><strong>{name}</strong></h3>
            <p className="product-color">{color}</p>
            <div className="product-moreDetails">
                <div className="product-size">
                    <p className="detail-title">Size {size}</p>

                </div>
                <div className="rowWrapper">
                    <div className="product-price">
                        <p className="detail-title">Item Price</p>
                        <span className="product-value">{twoDigitPrice}</span>
                    </div>
                    <div className="rowWrapper">
                        <div className="product-quantity">
                        <p className="detail-title">Quantity</p>
                            <span>{quantity}</span>
                        </div>
                    </div>
                    <div className="product-totalPrice">
                        <p className="detail-title">Total Price</p>
                        <span>{twoDigitTotalPrice}</span>

                    </div>

                </div>

            </div>

        </div>


    </div>
        <hr className="thinLine"/>
    </div>
    </>
}
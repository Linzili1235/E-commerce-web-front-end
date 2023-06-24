import { useSelector } from "react-redux";
import './CheckoutSummary.scss';
import React, {useState} from "react";
import {ShoppingBagOutlined} from "@mui/icons-material";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

export const CheckoutSummary = () => {
    const { currTotal } = useSelector(state => state?.productReducer)
    const { addedProducts } = useSelector(state => state?.productReducer)
    const [isOpen, setIsOpen] = useState(true)

    const toggleDropdown = () => {
        setIsOpen(!isOpen)
    }
    const totalQ = () => {
        let count = 0
        for (const obj of addedProducts) {
            count += obj.quantity
        }
        return count
    }

    const totalQuantity = totalQ()
    return <>
        <div className="checkout-summary">
            <h2 className= "checkout-order-title">Order summary</h2>
            <div className="checkout-shoppingbag">
                <div className="shoppingTotalItem">
                    <ShoppingBagOutlined fontSize={"large"} />
                    <span>{totalQuantity}  {`${totalQuantity > 1 ? 'Items': 'Item'}`}</span>
                    <div className="dropdown-products" onClick={toggleDropdown}>
                        {isOpen ? <KeyboardArrowUpIcon className="arrow-icon open"/> : <KeyboardArrowDownIcon className="arrow-icon"/>}
                    </div>
                </div>
                <div className="checkout-payment">
                    <strong>${currTotal.toFixed(2)}</strong>

                </div>

            </div>
            {isOpen && <div className='checkout-summary-container'>
                            <div className="checkout-product-summary-list">
                                {
                                    addedProducts && addedProducts.filter(product => product !== null).reverse().map((product, indx) => {
                                        const {img, title, price, size,color} = product.productInfo
                                        const {quantity} = product
                                        const updatedPrice = price.split("-")[0]
                                        const numericValue = parseFloat(updatedPrice.replace(/[^0-9.]/g, ''));

                                        return <div className='checkout-product-summary' key={indx}>
                                            <img className='product-img' src={img}  alt="product-img"/>
                                            <div className="title-price-container">
                                                <div className="product-title">{title}</div>
                                                <div className="product-color">{color}</div>
                                                <div className="product-size">Size: {size}</div>
                                                <div className="checkout-quantity-price">
                                                    <div className="product-quantity">Quantity: {quantity}</div>

                                                    <div className="product-price">
                                                        {
                                                            quantity > 1 ? `$${(numericValue * quantity).toFixed(2)} CAD` : `$${numericValue.toFixed(2)} CAD`
                                                        }
                                                    </div>
                                                </div>

                                            </div>
                                        </div>
                                    })
                                }
                            </div>
                </div>}
            <div className="checkout-money">
            <div className="summary-details">
                <div className="detail subtotal">
                    <span>Subtotal</span>
                    <span>${currTotal.toFixed(2)}</span>
                </div>
                <hr/>
                <div className="detail">
                    <span>Shipping  &nbsp;</span>
                    <span>FREE</span>
                </div>
                <hr/>
                <div className="detail tax">
                    <span>Tax &nbsp;</span>
                    <span>Calculated at next step</span>
                </div>
                <hr/>
                <div className="detail estimate">
                    <span className="estTotal">Order Total</span>
                    <span className="totalPrice">${currTotal.toFixed(2)}</span>
                </div>
            </div>

            </div>
        </div>
    </>
}
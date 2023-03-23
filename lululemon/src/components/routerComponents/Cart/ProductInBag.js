import "./ProductInBag.scss"
import {containerClasses} from "@mui/material";
import {useState} from "react";

export const ProductInBag = ({product}) => {
    const {productInfo, quantity} = product
    const {img, title, color, price, size} = productInfo
    const numericPrice = parseFloat(price.replace(/[^0-9.]/g, ''))
    const twoDigitPrice = `$${numericPrice.toFixed(2)} CAD`
    const twoDigitTotalPrice = `$${(numericPrice * quantity).toFixed(2)} CAD`
    const optionList = Array.from({length: 10}, (_,i)=> i+1)

    const [selectedValue, setSelectedValue] = useState(quantity)

    const handleChange = (event) => {
        setSelectedValue(event.target.value)
    }
    return <div className="productInBag-container">
    <div className="productInBag">
        <div className="product-image-container">
            {/*TODO: add edit to product page here*/}
            <img className="productImg" src={img} alt={title}/>
        </div>
        <div className="product-details-container">
            <h3 className="product-title"><strong>{title}</strong></h3>
            <p className="product-color">{color}</p>
            <div className="product-moreDetails">
                <div className="product-size">
                    {/*TODO: add edit to product page here*/}
                    <p className="detail-title">Size {size}</p>
                    <span className="product-edit">Edit</span>

                </div>
                <div className="rowWrapper">
                    <div className="product-price">
                        <p className="detail-title">Item Price</p>
                        <span className="product-value">{twoDigitPrice}</span>
                    </div>
                    <div className="dropDown-container">
                        <p className="detail-title">Quantity</p>
                        <select id="dropdown" value={selectedValue} onChange={handleChange}>
                            {optionList.map(value => {
                                return <option key={value}>{value}</option>
                            })}

                        </select>
                    </div>
                    <div className="product-totalPrice">
                        <p className="detail-title">Total Price</p>
                        <span>{twoDigitTotalPrice}</span>

                    </div>

                </div>

            </div>
            <div className="productAction-container">
                <div className="product-return">
                    <span>Free Shipping + Free Returns</span>
                </div>
                <div className="save-for-later">
                    <a className="save-link" href="">Save for Later</a>

                </div>
                <div className="remove-product">
                    <span className="remove-work">Remove</span>
                </div>

            </div>

        </div>


    </div>
        <hr className="thinLine"/>
    </div>
}
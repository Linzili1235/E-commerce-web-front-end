import "./ProductInBag.scss"
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import {useEffect, useState} from "react";

import {useDispatch} from "react-redux";
import actions from "../../../actions";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import {CircularProgress} from "@mui/material";

export const ProductInBag = ({product,ind}) => {
    const dispatch = useDispatch()
    const {productInfo, quantity, productId} = product
    const {img, title, color, price, size} = productInfo
    const numericPrice = parseFloat(price.replace(/[^0-9.]/g, ''))
    const twoDigitPrice = `$${numericPrice.toFixed(2)}`
    const twoDigitTotalPrice = `$${(numericPrice * quantity).toFixed(2)}`
    const optionList = Array.from({length: 10}, (_,i)=> i+1)

    const [selectedValue, setSelectedValue] = useState(quantity)
    const [isOpen, setIsOpen] = useState(false)
    const [isRemoveClose, setIsRemoveClose] = useState(true)
    const [isProductClose, setIsProductClose] = useState(true)
    const [isLoading, setIsLoading] = useState(true)

    const handleChange = (value) => {
        setSelectedValue(value)
    }
    // useEffect and dispatch, or the change of quantity will delay
    useEffect(()=> dispatch(actions?.productActions?.changeWithQuantity(ind, selectedValue)), [selectedValue])
    const toggleDropdown = () => {
        setIsOpen(!isOpen)
    }

   const handleClose = () => {
        setIsRemoveClose(!isRemoveClose)
   }
   const handleProductClose = () => {
        setIsProductClose(!isProductClose)
   }

   const handleRemove = (ind) => {
       dispatch(actions?.productActions?.removeSpecificProduct(ind)).then()
       setIsRemoveClose(!isRemoveClose)
   }
   const onClickFetch = (productId) => {
        dispatch(actions?.productActions?.fetchOneProduct(productId))
            .then(()=> setIsLoading( false))
   }

    return <>
    <div className="productInBag-container">
    <div className="productInBag">
        <div className="product-image-container">
            {/*TODO: add edit to product page here*/}
            <img className="productImg" src={img} alt={title} onClick={handleProductClose}/>
        </div>
        <div className="product-details-container">
            <h3 className="product-title" onClick={handleProductClose}><strong>{title}</strong></h3>
            <p className="product-color">{color}</p>
            <div className="product-moreDetails">
                <div className="product-size">
                    {/*TODO: add edit to product page here*/}
                    <p className="detail-title">Size {size}</p>
                    <span className="product-edit" onClick={handleProductClose}>Edit</span>

                </div>
                <div className="rowWrapper">
                    <div className="product-price">
                        <p className="detail-title">Item Price</p>
                        <span className="product-value">{twoDigitPrice}</span>
                    </div>
                    <div className="dropDown-container">
                        <p className="detail-title">Quantity</p>
                        <div className="dropdown-selected-value" onClick={toggleDropdown}>
                            <span>{selectedValue}</span>
                            {isOpen ? <KeyboardArrowUpIcon className="arrow-icon open"/> : <KeyboardArrowDownIcon className="arrow-icon"/>}

                        </div>
                        {isOpen && <div className="dropdown-options"  onClick={toggleDropdown}>
                            {optionList.map(value =>
                            {return <div key={value}
                                className="dropdown-option"
                                               onClick={()=> handleChange(value)}
                                >
                                <div className="option-value">{value}</div>

                            </div>
                            })}

                        </div>}
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
                <div className="remove-product" onClick={handleClose}>
                    <span className="remove-work">Remove</span>
                </div>
                <div className={`${isRemoveClose ? 'none-display': 'backdrop'}`} onClick={handleClose}></div>
                <div className={`${isRemoveClose ? 'none-display': 'remove-popup'}`}
                     >
                    <div className="remove-popup-content">
                    <div className="close-button">
                        <CloseOutlinedIcon fontSize={'medium'} onClick={handleClose} style={{cursor:"pointer"}}/>
                    </div>
                        <h3 className="remove-popup-header" >Are you sure you want to remove this item
                            from your bag?</h3>
                        <button className="remove-click" onClick={()=>handleRemove(ind)}>Yes, remove this item</button>
                        <div className="no-remove-click" onClick={handleClose}>No, keep this item</div>
                    </div>




                </div>


            </div>

        </div>


    </div>
        <div className={`${isProductClose ? 'none-display': 'backdrop'}`} onClick={handleProductClose}></div>
        <div className={`${isProductClose ? 'none-display': "updateProductContainer"}`}>
            <div className="updateProduct-content">
                <div className="close-button">
                    <CloseOutlinedIcon fontSize={'medium'} onClick={handleProductClose} style={{cursor:"pointer"}}/>
                </div>
                    {isLoading? <div className="updateProduct-detail">
                        <img src={img} alt={title} className="productImg-update"/>
                        <div className="product-details">
                            <div className="product-title">
                                <div className="h1">{title}</div>
                                <span className="product-price">{twoDigitPrice}</span>
                            </div>
                            <div className="afterLoading-product">
                                <CircularProgress className='display-button' size={30} />
                            </div>


                        </div>
                    </div> : <div className="updateProduct-detail">

                    </div>}



            </div>



        </div>
        <hr className="thinLine"/>
    </div>
    </>
}
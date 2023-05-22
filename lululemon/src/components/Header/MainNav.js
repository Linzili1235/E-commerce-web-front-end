import './MainNav.scss'
import SearchIcon from '@mui/icons-material/Search';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import {logo} from '../../assets/logo/logo'
import { useNavigate } from "react-router-dom";
import React, {useEffect, useState} from "react";
import actions from "../../actions";
import {useDispatch, useSelector} from "react-redux";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";

export const MainNav = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate();
    const { currTotal } = useSelector(state => state?.productReducer)
    const addedProduct = useSelector(state => state?.productReducer?.addedProducts)
    const [isOpen, setIsOpen] = useState(false)

    // use localstorage will delay
    const data = window.localStorage.getItem('Added Products')
    const recoveredProduct = JSON.parse(data)
    const handleNavigate = (e) => {
        e.preventDefault();
        navigate('/mainPage/1/1')
    }
    const handleBagIcon = (e) => {
        e.preventDefault();
        navigate('/mybag')
    }

    const goToCart = () => {
        navigate('/mybag')
    }

    const handleRemove = (ind) => {
        dispatch(actions?.productActions?.removeSpecificProduct(ind)).then()
        // if (addedProducts.length === 0) {
        //     setTimeout(()=>dispatch(actions?.productActions?.setNoProduct(true)),300)
        //     // console.log(noProduct)
        //     // console.log(addedProduct)
        // }
        // console.log("been here", addedProducts.length)
    }
    const toggleDropdown = () => {
        setIsOpen(true)
    }
    const toggleWithdraw = () => {
        setIsOpen(false)
    }

    const totalQ = () => {
        let count = 0
        for (const obj of recoveredProduct) {
            count += obj.quantity
        }
        return count
    }
    const totalQuantity = totalQ()





    return <div className="mainNavigation">
        <div className="navigation_bg">
            <div className="productNav_container">
                <div className="logo">
                    <a href="">
                    <img id='logo' src={logo} alt="logo" onClick={handleNavigate}/>
                    </a>
                </div>
                <ul className="productNav">
                    <li className="productItem">
                        <a href="lululemon/src/components/ProductHome/Header">Women</a></li>
                    <li className="productItem">
                        <a href="lululemon/src/components/ProductHome/Header">Men</a></li>
                    <li className="productItem">
                        <a href="lululemon/src/components/ProductHome/Header">Accessories</a></li>
                    <li className="productItem">
                        <a href="lululemon/src/components/ProductHome/Header">Shoe</a></li>
                    <li className="productItem">
                        <a href="lululemon/src/components/ProductHome/Header">Studio</a></li>
                </ul>
            </div>
            <div className="searchBar_container">
                <form className="searchForm">
                    <SearchIcon className="searchIcon"/>
                    <input className="searchInput" type="text" placeholder="Search"/>
                </form>
                <div className="shoppingBag-container" onClick={handleBagIcon} onMouseEnter={toggleDropdown}
                     onMouseLeave={toggleWithdraw} >
                    <ShoppingBagIcon className="shoppingBag" />
                    <div className="showing-quantity">{totalQuantity}</div>
                {totalQuantity > 0 && <div className="product-indicator"></div>}
                </div>
                {isOpen && <div className="showing-product-details"onMouseEnter={toggleDropdown} onMouseLeave={toggleWithdraw}>
                     <div className='checkout-summary-container' >
                         <div className="shopping-show-title">
                             Items in your bag
                         </div>
                         <hr/>
                        <div className="checkout-product-summary-list">
                            {
                                recoveredProduct && recoveredProduct.filter(product => product !== null).reverse().map((product, indx) => {
                                    const {img, name, price, size,color} = product.productInfo
                                    const {quantity} = product
                                    const updatedPrice = price.split("-")[0]
                                    const numericValue = parseFloat(updatedPrice.replace(/[^0-9.]/g, ''));

                                    return <div className='checkout-product-summary' key={indx}>

                                        <img className='product-img' src={img}  alt="product-img"/>
                                        <div className="title-price-container">
                                            <div className="close-button">
                                                <CloseOutlinedIcon fontSize={'medium'} onClick={() => handleRemove(indx)}/>
                                            </div>
                                            <div className="product-title">{name}</div>
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
                         <div className="shopping-show-total">
                                 <div className="detail subtotal">
                                     <span><strong>Subtotal</strong> {totalQuantity}  ({`${totalQuantity > 1 ? 'Items': 'Item'}`})</span>
                                     <span><strong>${currTotal.toFixed(2)}</strong></span>
                                 </div>
                                 <hr/>
                                 <div className="detail">
                                     <span><strong>Shipping  &nbsp;</strong></span>
                                     <span><strong>FREE</strong></span>
                                 </div>
                                 <hr/>
                             <div className="checkout-button-container" onClick={()=>goToCart()}>
                                 <div className="checkout-button">VIEW BAG & CHECKOUT</div>
                             </div>
                         </div>
                    </div>
                </div>}

            </div>
        </div></div>
}
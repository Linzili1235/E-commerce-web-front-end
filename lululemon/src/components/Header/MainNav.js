import './MainNav.scss'
import SearchIcon from '@mui/icons-material/Search';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import {logo} from '../../assets/logo/logo'
import {useNavigate, useParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import actions from "../../actions";
import {useDispatch, useSelector} from "react-redux";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";

export const MainNav = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate();
    const { currTotal } = useSelector(state => state?.productReducer)
    const addedProducts = useSelector(state => state?.productReducer?.addedProducts)
    // console.log("addedProduct", addedProducts)
    const allFilters = useSelector(state => state?.productReducer?.filters)

    const [isOpen, setIsOpen] = useState(false)
    /////////////////////////   Local storage   //////////////////////////////////
    useEffect(() => {
        const data = window.localStorage.getItem('Added Products')
        const recoveredProduct = JSON.parse(data)
        // when refreshing, data in redux store will lose, then should recover data using localStorage
        dispatch(actions?.productActions?.addWhenRefresh(recoveredProduct))
        // console.log("rendered when refresh")
    },[])


    useEffect(() => {
        window.localStorage.setItem('Added Products', JSON.stringify(addedProducts));
        // console.log("rendered when addedProduct changes")
        // console.log(addedProducts)
    }, [addedProducts]);

    // use localstorage will delay
    // const data = window.localStorage.getItem('Added Products')
    // const recoveredProduct = JSON.parse(data)
    // console.log('recoveredProduct2312312', recoveredProduct)
    //
    // useEffect(() => {
    //     window.localStorage.setItem('Added Products', JSON.stringify(addedProducts));
    //     // console.log("rendered when addedProduct changes")
    //     // console.log(addedProducts)
    // }, [addedProducts]);
    //
    // useEffect(() => {
    //     const data = window.localStorage.getItem('Added Products')
    //     const recoveredProduct = JSON.parse(data)
    //     console.log('recoveredProduct', recoveredProduct)
    //
    //     // when refreshing, data in redux store will lose, then should recover data using localStorage
    //     dispatch(actions?.productActions?.addWhenRefresh(recoveredProduct))
    //     // console.log("rendered when refresh")
    // },[])


    const handleNavigate = (e) => {
        e.preventDefault();
        navigate('/mainPage/1/1')
    }
    const handleBagIcon = (e) => {
        e.preventDefault();
        navigate('/mybag')
    }

    // in main nav, the filter will be renewed
    const onClickFilterChecked = (name) => {
            // after check, before fetch again, it needs to set back
        actions.filterActions.changePageNum(dispatch)(1)
        actions.filterActions.changeSortId(dispatch)(1)
        actions.filterActions.updateGender(dispatch)(name)
            .then( rs => {
                rs && actions.productActions.fetchAllProductsWithFilter(dispatch, 1, 1)(allFilters)
            }).catch(e => console.log(e))
        navigate('/mainPage/1/1')

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
        for (const obj of addedProducts) {
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
                        <a  onClick={() => onClickFilterChecked("Women")}>Women</a></li>
                    <li className="productItem">
                        <a  onClick={() => onClickFilterChecked("Men")}>Men</a></li>

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
                                addedProducts && addedProducts.filter(product => product !== null).map((product, indx) => {
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
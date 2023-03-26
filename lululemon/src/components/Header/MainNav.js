import './MainNav.scss'
import SearchIcon from '@mui/icons-material/Search';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import {logo} from '../../assets/logo/logo'
import { useNavigate } from "react-router-dom";
import {useEffect} from "react";
import actions from "../../actions";
import {useSelector} from "react-redux";

export const MainNav = () => {
    const navigate = useNavigate();
    const addedProduct = useSelector(state => state?.productReducer?.addedProducts)
    // use localstorage will delay
    // const data = window.localStorage.getItem('Added Products')
    // const recoveredProduct = JSON.parse(data)
    const handleNavigate = (e) => {
        e.preventDefault();
        navigate('/mainPage/1/1')
    }
    const handleBagIcon = (e) => {
        e.preventDefault();
        navigate('/mybag')
    }
    const totalQ = () => {
        let count = 0
        for (const obj of addedProduct) {
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
                <ShoppingBagIcon className="shoppingBag" onClick={handleBagIcon}/>
                <div className="showing-quantity">{totalQuantity}
                </div>
                {totalQuantity > 0 && <div className="product-indicator"></div>}

            </div>
        </div>
    </div>
}
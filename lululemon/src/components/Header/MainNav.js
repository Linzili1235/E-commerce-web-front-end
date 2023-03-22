import './MainNav.scss'
import SearchIcon from '@mui/icons-material/Search';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import {logo} from '../../assets/logo/logo'
import { useNavigate } from "react-router-dom";
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
export const MainNav = () => {
    const navigate = useNavigate();
    const handleNavigate = (e) => {
        e.preventDefault();
        navigate('/mainPage/1/1')
    }

    const handleSignIn = () => {
        alert('Sign In')
    }
    return <div className="mainNavigation">
        <div className="navigation_bg">
            <div className="productNav_container">
                <div className="logo">
                    <a href="">
                    <img src={logo} alt="logo" onClick={handleNavigate}/>
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
                <div className="logIn" onClick={handleSignIn}>
                    <AccountCircleOutlinedIcon fontSize={'large'} />
                    <div className="signIn">
                        Sign In
                    </div>
                </div>
                <ShoppingBagIcon className="shoppingBag"/>
            </div>
        </div>
    </div>
}
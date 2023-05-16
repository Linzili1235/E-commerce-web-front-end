import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import PinDropOutlinedIcon from '@mui/icons-material/PinDropOutlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import CardGiftcardOutlinedIcon from '@mui/icons-material/CardGiftcardOutlined';
import LanguageOutlinedIcon from '@mui/icons-material/LanguageOutlined';
import './TopNav.scss'
import CurrentCity from "../routerComponents/Cart/CurrentCity";

export const TopNav = () => {
    const handleSignIn = () => {
        alert('Sign In')
    }
    return <div className="topNavigation_container">
        <div className="topNavigation_bg">
        <ul className="topNav">
            <li className="navItem">
                <a href="">
                <PinDropOutlinedIcon className="icon"/>
                <span className="navName">Store Locator</span>
                </a>
            </li>
            <li className="navItem"  onClick={handleSignIn}>
                <a href="">
                <AccountCircleOutlinedIcon className="icon"/>
                <span className="navName">Sign In</span>
                    </a>
            </li>
            <li className="navItem">
                <a href="">
                <FavoriteBorderOutlinedIcon className="icon"/>
                <span className="navName">Wish List</span>
                </a>
            </li>
            <li className="navItem">
                <a href="">
                <CardGiftcardOutlinedIcon className="icon"/>
                <span className="navName">Gift Cards</span>
                </a>
            </li>
            <li className="navItem">
                <a href="">
                <LanguageOutlinedIcon className="icon"/>
                <span className='navName'>CAD</span>
                </a>
            </li>
        </ul>
    </div>
    </div>
}
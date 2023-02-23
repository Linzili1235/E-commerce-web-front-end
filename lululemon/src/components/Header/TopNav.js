import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import PinDropOutlinedIcon from '@mui/icons-material/PinDropOutlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import CardGiftcardOutlinedIcon from '@mui/icons-material/CardGiftcardOutlined';
import LanguageOutlinedIcon from '@mui/icons-material/LanguageOutlined';
import './TopNav.scss'
export const TopNav = () => {
    return <div className="topNavigation_container">
        <ul className="topNav">
            <li className="navItem">

                <PinDropOutlinedIcon className="icon"/>
                <span className="navName">Store Locator</span>
            </li>
            <li className="navItem">
                <AccountCircleOutlinedIcon className="icon"/>
                <span className="navName">Sign In</span>
            </li>
            <li className="navItem">
                <FavoriteBorderOutlinedIcon className="icon"/>
                <span className="navName">Wish List</span></li>
            <li className="navItem">
                <CardGiftcardOutlinedIcon className="icon"/>
                <span className="navName">Gift Cards</span></li>
            <li className="navItem">
                <LanguageOutlinedIcon className="icon"/>
                <span className='navName'>USA</span></li>
        </ul>
    </div>
}
import './Header.scss'
import {TopNav} from "./Header/TopNav";
import {MainNav} from "./Header/MainNav";
import {useLocation, useNavigate} from "react-router-dom";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import {logo} from "../assets/logo/logo";
import {ShoppingBagWithQ} from "../assets/Icon/ShoppingBagWithQ";

export const Header = () => {
    const location = useLocation()
    const navigate = useNavigate()
    const handleSignIn = () => {
        alert('Sign In')
    }
    const handleNavigate = (e) => {
        e.preventDefault();
        navigate('/mainPage/1/1')
    }

    const getHeader = () => {
        switch (location.pathname) {
            case '/mybag':
            case '/review':
                return <section className="header1">
                    <nav className="simple-nav">
                        <a className="brand-logo" href="">
                            <img src={logo} alt="logo" onClick={handleNavigate}/>
                        </a>
                        <div className="logIn" onClick={handleSignIn}>
                            <AccountCircleOutlinedIcon fontSize={'medium'} />
                            <div className="signIn">
                                Sign in
                            </div>
                        </div>
                    </nav>
                </section>
            case '/checkout':
                return <section className="header1">
                    <nav className="simple-nav">
                        <a className="brand-logo" href="">
                            <img src={logo} alt="logo" onClick={handleNavigate}/>
                        </a>
                        <div className="logIn" onClick={handleSignIn}>
                                <ShoppingBagWithQ/>
                        </div>
                    </nav>
                </section>
            default:
                return <section className="header">
                    <TopNav/>
                    <MainNav/>
            </section>
        }
    }

    const header = getHeader()

    return <>
        {header}
    </>



}
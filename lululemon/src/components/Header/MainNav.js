import './MainNav.scss'
import SearchIcon from '@mui/icons-material/Search';
export const MainNav = () => {
    return <div className="mainNavigation">
        <div className="productNav_container">
            {/*TODO: put in the image*/}
            {/*<div className="logo">*/}

            {/*    <img src="../src/assets/logo/lululemon-logo2.webp" alt="" />*/}
            {/*</div>*/}
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
            <li className="productItem">
                <a href="lululemon/src/components/ProductHome/Header">Like New</a></li>
        </ul>
        </div>
        <div className="searchBar_container">
            <form className="searchForm">
                    {/*TODO: The search icon position*/}
                    <SearchIcon className="searchIcon"/>
                <input className="searchInput" type="text" placeholder="Search"/>

            </form>





        </div>

    </div>
}
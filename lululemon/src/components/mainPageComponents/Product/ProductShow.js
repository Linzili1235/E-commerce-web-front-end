import "./ProductShow.scss"
import productImg from "../../../assets/productImg/manProduct.png"
import {Notification} from "./Notification";
import {ProductList} from "./ProductList";
import SortingTabs from "./SortingTabs";

export const ProductShow = () => {
    return <>
        <div className="productNav">
           <div className="img_container">
            <img src={productImg} alt="man product"/>
        </div>
           <div className="productMainNav_container">
            <ul className="productMainNavList">
                <li className="productMainNavItem"><a href="">All What's new</a></li>
                <li className="productMainNavItem"><a href="">Women's What's New</a></li>
                <li className="productMainNavItem"><a href="">Men's What's New</a></li>
                <li className="productMainNavItem"><a href="">Accessories What's New</a></li>
            </ul>
        </div>

           <div className="productMiddleNav_container">
            <Notification/>
            <SortingTabs/>
        </div>

        </div>
        <div className="productMain_container">
            <ProductList/>
        </div>
        </>
}
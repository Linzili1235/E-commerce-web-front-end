import "./ProductShow.scss"
import productImg from "../../../assets/productImg/manProduct.png"
import {Notification} from "./Notification";
import {ProductList} from "./ProductList";
import {SortingTabs} from "./SortingTabs";

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

            {/*main product content*/}

            {/*<div className="sortBar">*/}
            {/*    /!*TODO:make left and right the same line height *!/*/}
            {/*    <div className="sortBarLeft">*/}
            {/*        /!*# TODO change to product length in 156*!/*/}
            {/*        /!*TODO:  .sortBarLeft_button_2, how to get*!/*/}
            {/*        <button className="sortBarLeft_button_1"><strong >All Items(156)</strong></button>*/}
            {/*        <button className="sortBarLeft_button_2">Available Near You</button>*/}
            {/*    </div>*/}
            {/*    <div className="sortBarRight">*/}
            {/*        <label htmlFor="">Sort by</label>*/}
            {/*        <span>Featured</span>*/}
            {/*    </div>*/}
            {/*</div>*/}

            <SortingTabs/>


        </div>


        </div>
        <div className="productMain_container">
            <ProductList/>
        </div>
        </>
}
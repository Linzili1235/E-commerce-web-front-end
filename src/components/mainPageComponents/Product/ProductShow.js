import "./ProductShow.scss"
import mproductImg from "../../../assets/productImg/manProduct.png"
import wproductImg from "../../../assets/productImg/womanProduct.png"

import {Notification} from "./Notification";
import {ProductList} from "./ProductList";
import SortingTabs from "./SortingTabs";
import {NextPage} from "./NextPage";
import {useSelector} from "react-redux";

export const ProductShow = () => {
    const filters = useSelector(state => state?.productReducer?.filters)
    const gender_filter = filters?.Gender
    return <>
        <div className="productNav">
           <div className="img_container">
               { gender_filter[1].isChecked === true ? <img src={wproductImg} alt="woman product"/> :
                   <img src={mproductImg} alt="man product"/>
               }
        </div>
           <div className="productMainNav_container">
            {/*<ul className="productMainNavList">*/}
            {/*    <li className="productMainNavItem"><a href="">All What's new</a></li>*/}
            {/*    <li className="productMainNavItem"><a href="">Women's What's New</a></li>*/}
            {/*    <li className="productMainNavItem"><a href="">Men's What's New</a></li>*/}
            {/*    <li className="productMainNavItem"><a href="">Accessories What's New</a></li>*/}
            {/*</ul>*/}
        </div>

           <div className="productMiddleNav_container">
            <Notification/>
            <SortingTabs/>
        </div>

        </div>
        <div className="productMain_container">
            <ProductList/>
        </div>
        <div className="changePage">
            <NextPage/>
        </div>
        </>
}
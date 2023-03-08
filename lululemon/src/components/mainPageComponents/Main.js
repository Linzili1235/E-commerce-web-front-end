import {SideBar} from "./SideBar/SideBar";
import './Main.scss'
import {useDispatch} from "react-redux";
import {useEffect} from "react";
import {actionType, GET_FILTER_API} from "../../Helper";
import actions from "../../actions";
import {ProductShow} from "./Product/ProductShow";
import {ProductList} from "./Product/ProductList";
export const Main = () => {


    return <div className="product_main">
        <div className="main_container">
            <div className="sideBar_container"><SideBar/></div>
            <div className="product_container"><ProductShow/></div>
        </div>


    </div>
}
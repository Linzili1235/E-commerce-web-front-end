import {SideBarItem} from "./SideBarItem";
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import actions from "../../../actions";
import "./SideBar.scss"
export const SideBar = () => {
    // when first rendered, checked and render all filters
    // I render the things in index.js
    // special for redux method, not using useEffect

    let filters = useSelector(state => state?.productReducer?.filters)
    const filterArray = Object.entries(filters)
    return <section className="sideBar">
        <div className="sideBarTitle">
            <h1>Women's What's New</h1>
        </div>
        <div className="sideBarItem_container">
            {
                filterArray.map((item,index)=>
                    <SideBarItem key={index} item={item}/>
                )
            }</div>



    </section>
}
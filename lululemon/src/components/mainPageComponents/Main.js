import {SideBar} from "./SideBar/SideBar";
import './Main.scss'
import {ProductShow} from "./Product/ProductShow";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import actions from "../../actions";
import {CircularProgress} from "@mui/material";
export const Main = () => {

    const [isLoading, setLoading] = useState(true)
    const dispatch = useDispatch();
    const {sortingId, pageNum} = useParams();

    // Fetch all filters
    useEffect(() => {
        dispatch(actions?.filterActions?.getFilters())
            .then(()=> setLoading(false))
    },[]);

    // update the URL params based on the current URL (page and sortingId)
    useEffect(() => {
        actions?.filterActions?.urlParamsSaver(dispatch)(pageNum, sortingId)
            .then(() => true)
    }, [sortingId, pageNum]);

    return isLoading ? (
        <div>
            <CircularProgress  size={30} color={'inherit'}/>
        </div>
    ) :  <div className="product_main">
        <div className="main_container">
            <div className="sideBar_container"><SideBar/></div>
            <div className="product_container"><ProductShow/></div>
        </div>


    </div>
}
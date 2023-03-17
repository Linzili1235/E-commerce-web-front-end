import React, {useEffect, useState} from 'react';
import {SelectionContainer} from "./SelectionContainer";
import './SinglePageProduct.scss'
import {useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import actions from "../../../actions";
import Carousel from "./Carousel";

export const SinglePageProduct = () => {
    //get the product id from URL with useParams hook
    const prodId = useParams();
    const [isLoading, setIsLoading] = useState(true);
    const dispatch = useDispatch();

    //asynchronously fetch one product
    useEffect( () => {
        dispatch(actions?.productActions?.fetchOneProduct(prodId))
            .then(()=> setIsLoading( false))
    },[]);

    // Need to grab the selected index from the SelectionContainer and pass it to the Carousel to update the imgArray
    // 1. set up the parent component (SinglePageProduct)
    const [selectedColorIndex, setSelectedColorIndex] = useState(0)
    const handleColorChange = (indx) => {
        setSelectedColorIndex(indx)
    }

    // grab zoom in state from carousel magnifier icon
    const [zoomIn, setZoomIn] = useState(false)
    // control opacity of the entire page
    const [divOpacity, setDivOpacity] = useState(1)

    const handleZoomChange = (mag) => {
        setZoomIn(mag)
    }
    // to avoid the delay issue
    useEffect(() => {
        zoomIn ? setDivOpacity(0) : setDivOpacity(1)
    }, [zoomIn])

    return isLoading ? (
        <div>loading...</div>
    ) : (
        <>
            <div className="product-main-container" style={{opacity: divOpacity}}>
                <Carousel selectedColorIndex={selectedColorIndex} onZoomChange={handleZoomChange}/>
                <SelectionContainer onColorChange={handleColorChange}/>
            </div>
        </>
    );
};
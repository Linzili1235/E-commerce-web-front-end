import React, {useEffect, useState} from 'react';
import {SelectionContainer} from "./SelectionContainer";
import './SinglePageProduct.scss'
import {useParams} from "react-router-dom";
import actions from "../../../actions";
import Carousel from "./Carousel";
import {useDispatch} from "react-redux";
import AddToBagSummary from "./AddToBagSummary";
import {WhyWeMadeThis} from "./WhyWeMadeThis";

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
    const handleZoomChange = (mag) => {
        setZoomIn(mag)
    }

    return isLoading ? (
        <div>loading...</div>
    ) : (
        <>
        <section className="main-component-wrapper">
            <div className='product-main-container'>
                <Carousel selectedColorIndex={selectedColorIndex} onZoomChange={handleZoomChange} zoomIn={zoomIn}/>
                <SelectionContainer onColorChange={handleColorChange} zoomIn={zoomIn}/>
            </div>
            <div className="characteristic-container">
                <WhyWeMadeThis color={selectedColorIndex}/>
            </div>

        </section>
            <AddToBagSummary />
        </>
    );
};
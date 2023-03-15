import React from 'react';
import './Carousel.scss';
import {useSelector} from "react-redux"

const Carousel = () => {
    const productOne = useSelector(state => state?.productReducer?.one_product)
    console.log('carousel',productOne)
    return (
        <>
            <div className="carousel-container">
                <div className="product-img">

                </div>
            </div>
        </>
    );
};

export default Carousel;
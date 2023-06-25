import React, { useEffect, useState } from 'react';
import './CarouselInBag.scss';
import {useSelector} from "react-redux";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

export const CarouselInBag = ({selectedColorIndex}) => {
    // need colorId from swatch to determine which image Array to display
    // the default image array is the first set
    const productOne = useSelector(state => state?.productReducer?.one_product)
    const initArray = productOne?.images[0]
    // console.log(productOne)
    const [imgArray, setImgArray] = useState(initArray)
    // console.log(imgArray[0].mainCarousel)

    const imgSrc = imgArray?.mainCarousel?.media.split('|')
    // console.log(imgSrc)
    const imgAlt = imgArray?.mainCarousel?.alt
    const [currIdx, setCurrIdx] = useState(0)
    const mainImg = imgSrc[currIdx]

    // update imgArray based on the selected color from the selection component
    useEffect(() => {
        setImgArray(productOne.images[selectedColorIndex])
    }, [selectedColorIndex, productOne.images])



    // click left or right arrow to switch images
    const handleLeftArrow = () => {
        // This ensures that the index wraps around correctly, so when the current index is 0,
        // it will move to the last index of the imgSrc array.
        setTimeout(()=> {
            setCurrIdx((prevIdx) => (prevIdx - 1))
        }, 200)
    }
    const handleRightArrow = () => {
        setTimeout(()=> {
            setCurrIdx((prevIdx) => (prevIdx + 1))

        }, 200)
    }



    return (
        <>
            <div className="productUpdate-carousel-container" >
                <div className="productUpdate-img-container">
                    {/* Button */}
                    <div className="productUpdate-button-container">
                        { currIdx!== 0 && <div className="switchButton leftButton" onClick={handleLeftArrow}>
                             <ArrowBackIosIcon />
                        </div>}
                        { currIdx !== imgSrc.length - 1 && <div className="switchButton rightButton" onClick={handleRightArrow}>
                            <ArrowForwardIosIcon />
                        </div>}
                    </div>
                    {/* Image display */}
                    <div className="productUpdate-img-wrapper">
                        <img src={mainImg}
                             alt={imgAlt}
                             className='productUpdate-img'
                    /></div>

                </div>
            </div>
        </>
    );
};


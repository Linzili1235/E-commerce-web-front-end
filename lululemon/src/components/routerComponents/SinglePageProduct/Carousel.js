import React, { useEffect, useState } from 'react';
import './Carousel.scss';
import {useSelector} from "react-redux";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ZoomInIcon from '@mui/icons-material/ZoomIn';

const Carousel = ({selectedColorIndex, onZoomChange}) => {
    // need colorId from swatch to determine which image Array to display
    // the default image array is the first set
    const productOne = useSelector(state => state?.productReducer?.one_product)
    const initArray = productOne.images[0]
    const [imgArray, setImgArray] = useState(initArray)

    const imgSrc = imgArray.mainCarousel.media.split('|')
    const imgAlt = imgArray.mainCarousel.alt
    const [currIdx, setCurrIdx] = useState(0)
    const mainImg = imgSrc[currIdx]
    const [imgOpacity, setImgOpacity] = useState(1)
    const [magnify, setMagnify] = useState(false)
    // update imgArray based on the selected color from the selection component
    useEffect(() => {
        setImgArray(productOne.images[selectedColorIndex])
    }, [selectedColorIndex, productOne.images])

    // click swatch images to switch images
    const handleImgSwitch = (idx) => {
        setImgOpacity(0)
        setTimeout(()=> {
            setCurrIdx(idx)
            setImgOpacity(1)
        }, 200)
    }

    // click left or right arrow to switch images
    const handleLeftArrow = () => {
        // This ensures that the index wraps around correctly, so when the current index is 0,
        // it will move to the last index of the imgSrc array.
        setImgOpacity(0)
        setTimeout(()=> {
            setCurrIdx((prevIdx) => (prevIdx - 1 + imgSrc.length) % imgSrc.length);
            setImgOpacity(1)
        }, 200)
    }
    const handleRightArrow = () => {
        setImgOpacity(0)
        setTimeout(()=> {
            setCurrIdx((prevIdx) => (prevIdx + 1 + imgSrc.length) % imgSrc.length);
            setImgOpacity(1)
        }, 200)
    }

    const handleZoomIn = () => {
        setMagnify(prevState => !prevState)
    }

    useEffect(() =>{
        onZoomChange(magnify)
    }, [magnify])

    return (
        <>
            <div className="carousel-container" style={{opacity: imgOpacity}}>
                <div className="product-img-container">
                    {/* Button */}
                    <div className="button-container">
                        <div className="switchButton leftButton" onClick={handleLeftArrow}>
                            <ArrowBackIosIcon />
                        </div>
                        <div className="switchButton rightButton" onClick={handleRightArrow}>
                            <ArrowForwardIosIcon />
                        </div>
                    </div>
                    {/* Image display */}
                    <img src={mainImg} alt={imgAlt}
                         style={{opacity: imgOpacity}}/>
                    {
                        imgSrc.map((item, indx)=> {
                                    return <div key={indx} className='img-swatch-display'>
                                        <img src={item}
                                             alt={imgAlt}
                                             id={indx}
                                             onClick={()=> handleImgSwitch(indx)}
                                             className={indx===currIdx ? 'selected-thumbnail' : 'not-selected'}
                                        />
                                    </div>
                        }
                        )
                    }
                    {/* Magnifier  */}
                    <div className="magnifier">
                        <div className="zoom-icon-container" onClick={handleZoomIn}>
                            <ZoomInIcon />
                        </div>
                    </div>

                </div>
            </div>
        </>
    );
};

export default Carousel;
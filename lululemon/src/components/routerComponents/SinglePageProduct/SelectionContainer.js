import React from 'react';
import './SelectionContainer.scss'
import { useDispatch, useSelector } from "react-redux"
import {useState,useEffect} from "react"
import AdjustRoundedIcon from '@mui/icons-material/AdjustRounded';
import {ItemCheckedIcon} from "../../mainPageComponents/SideBar/SideBarIcon";
import HouseSidingRoundedIcon from '@mui/icons-material/HouseSidingRounded';
import StarBorderRoundedIcon from '@mui/icons-material/StarBorderRounded';
import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded';
import FavoriteBorderRoundedIcon from '@mui/icons-material/FavoriteBorderRounded';
import { actionType } from "../../../Helper";
import { CircularProgress } from '@mui/material';

export const SelectionContainer = ({ zoomIn, onColorChange }) => {
    const dispatch = useDispatch();
    const productOne = useSelector(state => state?.productReducer?.one_product)
    // console.log(productOne)
    const {swatches,sizes} = productOne
    const [colorIndex, updateColorIndex] = useState(0)
    const [sizeIndex, updateSizeIndex] = useState(0)
    // create an array to deal with onClick border
    // false: no border, true: with border
    const borderArray = Array(swatches.length).fill(false)
    const [borderBool, updateBorderBool] = useState(borderArray)
    // console.log(borderArray)

    // default border with first item
    useEffect(()=> updateBorderBool(prevState => {
        const newState = [...prevState]
        newState[0] = true
        return newState
    }
    ), [])
    // console.log(swatches)

    // same idea with onClick size choice
    const sizeArray = Array(sizes[0].details.length).fill(false)
    const [sizeBool, updateBool] = useState(sizeArray)


    const onClickChangeColor = (ind) => {
        // change the chosen color
        updateColorIndex(ind)
        // also change the border
        updateBorderBool(prevState => {
            const newState = borderArray
            newState[ind] = true
            return newState
        })

        // pass it to the Parent component and then to the Carousel
        onColorChange(ind)
    }

    const onClickChangeSize = (ind) => {
        updateSizeIndex(ind)
        updateBool(prevState => {
            const newState = sizeArray
            newState[ind] = true
            return newState
        })
    }

    const [added, setAdded] = useState(false)
    // pass img, title, price, size to the reducer
    const handleAddToBag = () => {
        // first image at the color index
        const img = productOne.images[colorIndex].mainCarousel.media.split('|')[0]
        const title = productOne.images[colorIndex].mainCarousel.alt
        const price = productOne.price
        const size = productOne.sizes[0].details[sizeIndex]
        // console.log('size', sizeIndex, title, price,size)
        dispatch({
            type: actionType.ADDED_PRODUCT_INFO,
            payload: {quantity: 1, productInfo: {img, title, price, size}}
        })

        setAdded(prevState => !prevState)

        setTimeout(()=>{
            dispatch({
                type: actionType.TOGGLE_SUMMARY_BOX,
                payload: {isClosed: false}
            })
            setAdded(prevState => !prevState)
        }, 1000)

    }

    return (
        <>
            <div className={ zoomIn ? "hidden" : "selection-container"}>
                <div className="selection-details">
                <div className="product-field">
                    <ul className="product-field-list">
                        <li key='women' className="field"><a href="">Woman's clothes</a></li>
                        <li key='short' className="field"><a href="">Short</a></li>
                    </ul>
                </div>
                    <div className="product-title">
                        <div className="h1">{productOne?.name}</div>
                        <div className="productNew">
                            <span className="new-style">new</span>
                        </div>
                        <span className="product-price">{productOne?.price}</span>
                    </div>
                    <div className="colorSelection">
                        <div className="colorName">
                            <span className="color">Colour</span>
                            <span className="specific-color">{swatches[colorIndex].swatchAlt}</span>

                        </div>
                        <div className="availableColor">
                            {swatches.map((item,index) =>
                                <div key={index} className="colorItem">
                                    <img className={`${borderBool[index]?"border":""}`} key={index} src={item.swatch}
                                         alt={item.swatchAlt}
                                         onClick={() => onClickChangeColor(index)}/>
                                </div>
                            )
                            }

                        </div>

                    </div>
                    <div className="sizeSelection">
                        {sizes[0].title === "Select Size" ?
                            <>
                            <div className="sizeTitle one">
                            <span className="selectSize">
                                {sizes[0].title}
                            </span>
                                <span className="sizeGuide">Size Guide</span>
                            </div>
                            <div className="sizeButtons">
                                {sizes[0].details.map((item,index) =>
                                    <div key={index} className="sizeOut">
                                    <span className={`sizeItem ${sizeBool[index]?"sizeBool":""}`} key={index}
                                    onClick={() => onClickChangeSize(index)}
                                    >{item}</span>
                                    </div>
                                )}

                            </div>
                            </> :
                        <>
                            <div className="sizeTitle two">
                            <span className="selectSize">
                                {sizes[0].title}
                            </span>
                                <span className="oneSize">One Size</span>
                            </div>
                            <div className="sizeButtons">
                            </div>
                        </>}

                    </div>
                    <div className="shoppingMethod">
                        <div className="shipToMeContainer">
                            <div className="shipToMeButton">
                                <div className="shipBig">
                                    <AdjustRoundedIcon className="roundedButton"/>
                                    <span className="shipSpan">Ship it to me</span>
                                </div>
                                <div className="shipSmall">
                                    <span className="freeReturnSpan">Free shipping and returns</span>
                                </div>

                            </div>

                        </div>
                        <div className="pickUp">
                            <div className="storePickUp">
                                <HouseSidingRoundedIcon className="house"/>
                                <span className="pickUpSpan">Pick up in-store</span>
                            </div>
                            <ItemCheckedIcon checked = {false}/>
                        </div>
                        <div className="addingButtonContainer">
                            <button className="addingButton" onClick={handleAddToBag}>
                                <span className={added ? 'hide' : 'display-button'}>Add to bag</span>
                                <CircularProgress className={added ? 'display-button' : 'hide'} size={30} color={'inherit'}/>
                            </button>
                        </div>

                    </div>
                    <div className="customerEngagement">
                        <div className="customerEngagementWrapper">
                            <button className="customerButton">
                            <FavoriteBorderRoundedIcon/>
                            <span className="customerEngagementSpan">Add to Wish List</span>
                            </button>
                        </div>
                        <div className="customerEngagementWrapper">
                            <button className="customerButton">
                            <StarBorderRoundedIcon/>
                            <span className="customerEngagementSpan">Reviews(10)</span>
                            </button>
                        </div>
                    </div>
                    <div className="productDetails">
                        <p>Details</p>
                        <ul className="specificDetails">
                            <li key='design1' className="specificDetailItem">
                                <img className="designedIcon"
                                    src="https://shop.lululemon.com/static/ecom-web-app/_next/static/images/sprite-402634.svg#icon_train-usage"
                                    alt="" />
                                <button className="designedLink">
                                    Design for Running and Training
                                </button>
                            </li>
                            <li key='design2' className="specificDetailItem">
                                <img className="designedIcon"
                                     src="https://shop.lululemon.com/static/ecom-web-app/_next/static/images/sprite-402634.svg#fabric_generic-usage"
                                     alt="" />
                                <button className="designedLink">
                                    Skip-the-Chafe, Seamless Construction
                                </button>
                            </li>
                            <li key='design3' className="specificDetailItem">
                                <img className="designedIcon"
                                     src="https://shop.lululemon.com/static/ecom-web-app/_next/static/images/sprite-402634.svg#icon_silhouette-usage"
                                     alt="" />
                                <button className="designedLink">
                                    Slim Fit, Cropped Length
                                </button>
                            </li>

                        </ul>

                    </div>
                    <div className="questionContainer">
                        <div className="contentQuestion">
                            <span className="bigQuestion">
                                Questions? Bring them on (all of them)
                            </span>
                            <span className="smallQuestion">
                                Virtual Shop with one of our educators
                            </span>
                        </div>
                        <ArrowForwardRoundedIcon className="arrowIcon"/>
                    </div>
                </div>
            </div>
        </>
    );
};

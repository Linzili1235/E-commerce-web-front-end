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
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import { CircularProgress } from '@mui/material';
import actions from "../../../actions";

export const SelectionContainer = ({ zoomIn, onColorChange }) => {
    const dispatch = useDispatch();
    const productOne = useSelector(state => state?.productReducer?.one_product)
    const [colorIndex, updateColorIndex] = useState(0)
    const [sizeIndex, updateSizeIndex] = useState(-1)

    // LOCAL STORAGE to store added products info
    const {swatches,sizes, productId} = productOne
    // first image at the color index
    const img = productOne.images[colorIndex].mainCarousel.media.split('|')[0]
    const title = productOne.images[colorIndex].mainCarousel.alt
    const price = productOne.price
    const size =  productOne.sizes[0].details[sizeIndex]
    const color = swatches[colorIndex].swatchAlt

    // create an array to deal with onClick border
    // false: no border, true: with border
    const borderArray = Array(swatches.length).fill(false)
    const [borderBool, updateBorderBool] = useState(borderArray)

    // default border with first item
    useEffect(()=> updateBorderBool(prevState => {
        const newState = [...prevState]
        newState[0] = true
        return newState
    }
    ), [])

    useEffect(() => {
        if (sizes[0].details.length === 0) {
            updateSizeIndex(0);
            updateAlert(false);
        }
    }, [sizes]);


    // same idea with onClick size choice
    const sizeArray = Array(sizes[0].details.length).fill(false)
    const [sizeBool, updateBool] = useState(sizeArray)

    // deal with size alert
    const [isAlert, updateAlert] = useState(true)
    const [showAlert, updateShowAlert] = useState(false)


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
            // Otherwise, handle multiple sizes as before
            updateSizeIndex(ind);
            updateAlert(false);
            updateShowAlert(false);
            updateBool(prevState => {
                const newState = sizeArray;
                newState[ind] = true;
                return newState;
            });
    };


    const [added, setAdded] = useState(false)
    // pass img, title, price, size to the reducer
    const handleAddToBag = () => {
        if (isAlert) {
            updateShowAlert(true)}
        else {

        // console.log('size', sizeIndex, title, price,size)
        dispatch(actions?.productActions?.addToBag(img, title, price, size, color,productId))
            .then(() => setAdded(prevState => !prevState) )

        // dispatch(actions?.productActions?.toggleSummaryBox(false))
        //     .then(() => setAdded(prevState => !prevState))

        setTimeout(()=>{
            dispatch(actions?.productActions?.toggleSummaryBox(false))
            setAdded(prevState => !prevState)
        }, 300)}

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
                            <span className="specific-color">{color}</span>

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
                    <div className="sizeAlert">
                        {showAlert && <div className="notification-alert">
                            <ErrorOutlineIcon className="errorIcon"/>
                            <div>Please select a size</div>

                        </div>}
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
                                <span className="oneSize-text">One Size</span>
                            </div>
                            <div className="sizeButtons">
                                <span className="oneSize" onClick={() => onClickChangeSize()}>One Size</span>
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

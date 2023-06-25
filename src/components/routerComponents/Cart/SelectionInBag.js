import React from 'react';
import './SelectionInBag.scss'
import { useDispatch, useSelector } from "react-redux"
import {useState} from "react"

import actions from "../../../actions";

export const SelectionInBag = ({handleClose, onColorChange,sizeInd,colorInd,ind}) => {
    const dispatch = useDispatch();
    const productOne = useSelector(state => state?.productReducer?.one_product)

    const [colorIndex, updateColorIndex] = useState(colorInd)
    const [sizeIndex, updateSizeIndex] = useState(sizeInd)
    const [updated, setUpdated] = useState(false)

    // console.log(sizeIndex)


    // LOCAL STORAGE to store added products info
    const {swatches,sizes, productId} = productOne
    console.log(productOne)
    // console.log("in single page", productId)
    // first image at the color index
    const img = productOne.images[colorIndex].mainCarousel.media.split('|')[0]
    // const title = productOne.images[colorIndex].mainCarousel.alt
    const price = productOne.price
    const size =  productOne.sizes[0].details.length === 0? "ONE SIZE": productOne.sizes[0].details[sizeIndex]
    const color = swatches[colorIndex].swatchAlt
    const numericPrice = parseFloat(price.replace(/[^0-9.]/g, ''))
    const twoDigitPrice = `$${numericPrice.toFixed(2)}`


    // create an array to deal with onClick border
    // false: no border, true: with border
    // const borderArray = Array(swatches.length).fill(false)
    // const [borderBool, updateBorderBool] = useState(borderArray)

    // same idea with onClick size choice
    // const sizeArray = Array(sizes[0].details.length).fill(false)
    // const [sizeBool, updateBool] = useState(sizeArray)


    const onClickChangeColor = (ind) => {
        // change the chosen color
        updateColorIndex(ind)
        // also change the border
        // updateBorderBool(prevState => {
        //     const newState = borderArray
        //     newState[ind] = true
        //     return newState
        // })

        // pass it to the Parent component and then to the Carousel
        onColorChange(ind)
    }

    const onClickChangeSize = (ind) => {
        updateSizeIndex(ind)
        // updateBool(prevState => {
        //     const newState = sizeArray
        //     newState[ind] = true
        //     return newState
        // })
    }

    // pass img, title, price, size to the reducer
    const handleUpdateToBag = () => {
            // console.log('size', sizeIndex, title, price,size)
            dispatch(actions?.productActions?.updateToBag(ind, img, size, color, colorIndex, sizeIndex))
            setUpdated(prevState => !prevState)

        // dispatch(actions?.productActions?.toggleSummaryBox(false))
            //     .then(() => setAdded(prevState => !prevState))

            setTimeout(()=>{
                handleClose(true)
                setUpdated(prevState => !prevState)
            }, 500)

    }

    return (
        <>
            <div className="productUpdate-selection-container">
                <div className="productUpdate-selection-details">
                    <div className="product-title">
                        <div className="productUpdate-h1">{productOne?.name}</div>
                        <span className="productUpdate-price">{twoDigitPrice}</span>
                    </div>
                    <div className="colorSelection">
                        <div className="colorName">
                            <span className="productUpdate-color">Color:</span>
                            <span className="productUpdate-specific-color">{color}</span>

                        </div>
                        <div className="availableColor">
                            {swatches.map((item,index) =>
                                <div key={index} className="colorItem">
                                    <img className={`${index === colorIndex?"update-border":""}`} key={index} src={item.swatch}
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
                            <span className="productUpdate-selectSize">
                                Size:{size}
                            </span>
                                </div>
                                <div className="sizeButtons">
                                    {sizes[0].details.map((item,index) =>
                                            <div key={index} className="sizeOut">
                                    <span className={`update-sizeItem ${index === sizeIndex?"update-sizeBool":""}`} key={index}
                                          onClick={() => onClickChangeSize(index)}
                                    >{item}</span>
                                            </div>
                                    )}

                                </div>
                            </>
                        :
                            <>
                                <div className="sizeTitle two">
                            <span className="selectSize">
                                {sizes[0].title}
                            </span>
                                    <span className="oneSize-text">One Size</span>
                                </div>
                                <div className="sizeButtons">
                                    <span className="oneSize">One Size</span>
                                </div>
                            </>
                        }

                    </div>
                    <div className="addingButtonContainer">
                        <button className={updated ? 'hide' : "addingButton"} onClick={handleUpdateToBag}>
                            <span className='display-button'>Update Item</span>
                        </button>
                    </div>
                    <div className="view-product-details">
                        <a href={`/singleProduct/${productId}`}>View product details</a>

                    </div>
                </div>
            </div>
        </>
    );
};

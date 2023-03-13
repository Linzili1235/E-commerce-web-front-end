import React from 'react';
import './SelectionContainer.scss'
import {useSelector} from "react-redux"
import {useState,useEffect} from "react"

export const SelectionContainer = () => {
    const productOne = useSelector(state => state?.productReducer?.one_product)
    console.log(productOne)
    const {swatches,sizes} = productOne
    const [colorIndex, updateColorIndex] = useState(0)
    // create an array to deal with onClick border
    // false: no border, true: with border
    const borderArray = Array(swatches.length).fill(false)
    const [borderBool, updateBorderBool] = useState(borderArray)
    // console.log(borderArray)

    // default border with first item
    useEffect(()=>updateBorderBool(prevState => {
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
    }

    const onClickChangeSize = (ind) => {
        updateBool(prevState => {
            const newState = sizeArray
            newState[ind] = true
            return newState
        })

    }
    return (
        <>
            <div className="selection-container">
                <div className="selection-details">
                <div className="product-field">
                    <ul className="product-field-list">
                        <li className="field"><a href="">Woman's clothes</a></li>
                        <li className="field"><a href="">Short</a></li>
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
                                <div className="colorItem">
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
                                    <div className="sizeOut">
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
                </div>
            </div>
        </>
    );
};

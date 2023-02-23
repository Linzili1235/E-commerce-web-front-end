import "./ProductItem.scss"
import {FETCH_ONE_API} from "../../../Helper";
import {useState} from "react";
import {useSelector} from "react-redux";
export const ProductItem = () => {
    const name = useSelector(state => state?.productReducer?.name)
    const images = useSelector(state => state?.productReducer?.images)

    // const imgF = images[0]
    // const {colorId} = imgF
    // console.log(colorId)
    console.log(images[0].whyWeMadeThis[0])
    return <div className="productTile">
        <img src={images[0].whyWeMadeThis[0]} alt=""/>
        <div className="productTile_details">
            <div className="swatch-carousel">
                <ul>
                    <li><img src="" alt=""/></li>
                </ul>
            </div>
            <div className="productTile_attributes">
                <a href=""></a>
                <span>{name}</span>
            </div>
        </div>


    </div>
}
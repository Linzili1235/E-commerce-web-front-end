import "./ProductItem.scss"
import {FETCH_ONE_API} from "../../../Helper";
import {useState} from "react";
import {useSelector} from "react-redux";
import {MainCarousel} from "./MainCarousel";
export const ProductItem = ({product}) => {
    const images = product?.images;
    // console.log(`imgArray`, imgArray)
    const swatchesArray = product?.swatches;
    const productName = product?.name;
    const productPrice = product?.price;

    const [currentIndex, setCurrentIndex] = useState(0)
    // console.log(swatchesArray)
    const setAllSwatches = () => {
        return swatchesArray.map((swatch, index) => (
        <li className="swatchItem"><img  src={swatch.swatch}
             alt={swatch.swatchAlt}
             key={swatch.colorId}
             onMouseEnter={()=>setCurrentIndex(index)}/>
        </li>
        )
    )}

    // const imgF = images[0]
    // const {colorId} = imgF
    // console.log(colorId)
    // console.log(images[0].whyWeMadeThis[0])
    return <div className="productTile">
        {/*<img src={images[0].whyWeMadeThis[0]} alt=""/>*/}
        {/* why we use index: keep the image follow the swatch changes
                         */}
        <MainCarousel  img={images[currentIndex]}/>
        <div className="productTile_details">

            <div className="swatch-carousel">
                <ul className="swatchList">
                {setAllSwatches()}
                </ul>
            </div>
            <div className="productTile_attributes">
                <div className="productName">
                    <a href="#">{productName}</a>
                </div>
                <div className="productPrice">
                    <span>{productPrice}</span>
                </div>
            </div>
        </div>


    </div>
}
import "./ProductItem.scss"
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {MainCarousel} from "./MainCarousel";
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
export const ProductItem = ({product}) => {
    const navigate = useNavigate();

    const images = product?.images;
    // console.log(`imgArray`, imgArray)
    const swatchesArray = product?.swatches;
    const productName = product?.name;
    const productPrice = product?.price;
    const lenSwatchArray = swatchesArray.length

    //productID is used for navigation
    const productID = product.productId;

    const [currentIndex, setCurrentIndex] = useState(0)
    const [currentCount, setCount] = useState(0)

    const goToProduct = (id) => {
        navigate(`/singleProduct/${id}`)
    }
    const onClickRightMove = (count) => {
        if ((count+1)*7 < lenSwatchArray){
        setCount(prevState => ++prevState)}}
    const onClickLeftMove = (count) => {
        if (count >0){
        setCount(prevState => --prevState)}
    }
    const setAllSwatches = () => {
        return <ul className="swatchList">
            {/*from count*7 to (count+1)*7 will show here*/}
            {/*original count is 0*/}
            {lenSwatchArray > 7 && <button className="swatchChangeButton-1" onClick={() => onClickLeftMove(currentCount)}><svg><ChevronLeftIcon/></svg></button>}
            <ul className="realSwatchList">
            {
                swatchesArray.map((swatch, index) =>
                currentCount*7<=index && index<(currentCount+1)*7 && <li className="swatchItem" key={index}><img  src={swatch.swatch}
                                                         alt={swatch.swatchAlt}
                                                         key={swatch.colorId}
                                                         onMouseEnter={()=>setCurrentIndex(index)} onClick={()=> goToProduct(productID)}/>

            </li>
            ) }
        </ul>
            {lenSwatchArray>7 && <button className="swatchChangeButton-2" onClick={()=>onClickRightMove(currentCount)}><svg><ChevronRightIcon/></svg></button>}


        </ul>



    }

    if (!productID) {
        return <div>Loading...</div>
    }
    return <div className="productTile">
        {/*<img src={images[0].whyWeMadeThis[0]} alt=""/>*/}
        {/* why we use index: keep the image follow the swatch changes
                         */}
        <MainCarousel  img={images[currentIndex]} productId={productID}/>
        <div className="productTile_details">

                {setAllSwatches()}

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
import "./ProductList.scss"
import {ProductItem} from "./ProductItem";
import {useState} from "react";
import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import actions from "../../../actions";

export const ProductList = () => {


    const allProducts = useSelector(state => state?.productReducer?.allProducts)
    const firstHundredProducts = allProducts?.products?.slice(0,100) || []
    // console.log('[firstHundred]', allProducts.products.slice(0, 100))
    return <div className="productMain">
        {
            firstHundredProducts.map((product, index) => (
                <ProductItem product={product}
                             key={index}
                />)
            )
        }

    </div>
}
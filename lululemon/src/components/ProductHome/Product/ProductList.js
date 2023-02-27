import "./ProductList.scss"
import {FETCH_ONE_API} from "../../../Helper";
import {ProductItem} from "./ProductItem";
import {useState} from "react";
import {useSelector} from "react-redux";

export const ProductList = () => {
    const allProducts = useSelector(state => state?.productReducer?.all_products)
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
import React from 'react';
import './ProductList.scss';
import {useSelector} from "react-redux";
import { ProductItem } from "./ProductItem";

export const ProductList = () => {
    const allProducts = useSelector(state => state?.productReducer?.pageProducts)
    // prevent rendering html before we received the data
    if (!allProducts || !allProducts.products) {
        return <div>Loading...</div>;
    }
    return (
        <>
            <div className="productTiles">
                {
                    allProducts?.products.map((product, index) => (
                        <ProductItem product={product}
                                     key={index}
                        />)
                    )
                }
            </div>
        </>
    );
};
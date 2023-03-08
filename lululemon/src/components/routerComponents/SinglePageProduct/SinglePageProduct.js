import React, {useEffect, useState} from 'react';
import {Slider} from "./Slider";
import {SelectionContainer} from "./SelectionContainer";
import './SinglePageProduct.scss'
import {useParams} from "react-router-dom";
import {useDispatch} from "react-redux";
import actions from "../../../actions";

export const SinglePageProduct = () => {
    //get the product id from URL with useParams hook
    const prodId = useParams();
    const [isLoading, setIsLoading] = useState(true);
    const dispatch = useDispatch();

    //asynchronously fetch one product
    useEffect( () => {
        dispatch(actions?.productActions?.fetchOneProduct(prodId))
            .then(()=> setIsLoading( false))
    },[]);


    return isLoading ? (
        <div>loading...</div>
    ) : (
        <>
            <div className="product-main-container">
                <Slider/>
                <SelectionContainer/>
            </div>
        </>
    );
};
import React, {useEffect} from 'react';
import {MyBag} from "./MyBag";
import {OrderSummary} from "./OrderSummary";
import './Cart.scss'
import actions from "../../../actions";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";

export const Cart = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const addedProducts = useSelector(state => state?.productReducer?.addedProducts)
    const noProduct = useSelector(state => state?.productReducer?.noProduct)
    // console.log(noProduct)
    // console.log(addedProducts)
    const data = window.localStorage.getItem('Added Products')
    const recoveredProduct = JSON.parse(data)
    // console.log(recoveredProduct)
    // console.log(noProduct)
    // useEffect(() => {
    //     const data = window.localStorage.getItem('Added Products')
    //     const recoveredProduct = JSON.parse(data)
    //     isNoProduct()
    //     dispatch(actions?.productActions?.addWhenRefresh(recoveredProduct))
    //
    // },[])


    const handleNavigate = (e) => {
        e.preventDefault();
        navigate('/mainPage/1/1')
    }

    const isNoProduct = () => {
        if (recoveredProduct.length === 0) {
            setTimeout(()=>dispatch(actions?.productActions?.setNoProduct(true)),300)
            // console.log(noProduct)
            // console.log(addedProduct)
        } else {
            dispatch(actions?.productActions?.setNoProduct(false))
        }


    }
    // check whether addedProduct.length === 0 once addedProduct changes
    useEffect(isNoProduct, [recoveredProduct])
    return (

        <section className="shoppingCart">
            { noProduct ?
                <div className="zeroProduct-container">
                    <div className="zeroProduct-main">
                        <div className="zeroProduct-content">
                            <h1 className="zeroProduct-h1">Give your bag some love!</h1>
                            <div className="addingButtonContainer">
                                <button className="addingButton" onClick={handleNavigate}>
                                    <span className='display-button'>Shop What's New</span>
                                </button>
                            </div>

                        </div>

                    </div>

                </div>

                :
            <div className="main-context">
            <div className="myBag-container">
                <MyBag/>
            </div>
            <div className="orderSummary-container">
                <OrderSummary/>
            </div>
            </div>}
        </section>
    );
};
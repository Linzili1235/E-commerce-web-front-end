import React, {useEffect, useState} from 'react';
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
    const [isNoProduct, setNoProduct] = useState(false)
    const [count, updateCount] = useState(0)
    // const noProduct = useSelector(state => state?.productReducer?.noProduct)
    // console.log(noProduct)
    console.log(addedProducts)
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

    // use this to let useEffect keep render after addProduct = []
    const clock = () => {
        if (addedProducts.length === 0) {
        const interval = setInterval(() => {
            updateCount(prevState => ++prevState)
            // console.log(second)
            if (count > 5) {
                clearInterval(interval)
            }

        }, 2000);
        console.log(count)}

        return count
    }

    const second = clock()






    const handleNavigate = (e) => {
        e.preventDefault();
        navigate('/mainPage/1/1')
    }

    const checkNoProduct = () => {
        console.log('whether you check')
        // addedProducts.length === 0 && setNoProduct(true)
        if (recoveredProduct.length === 0) {
            console.log("profuct 0")
            // setTimeout(()=>dispatch(actions?.productActions?.setNoProduct(true)),300)
            setNoProduct(true)
            // setTimeout(()=>setNoProduct(true),300)
            // console.log(noProduct)
            // console.log(addedProduct)
        } else {
            setNoProduct(false)
            // dispatch(actions?.productActions?.setNoProduct(false))
        }


    }


    // check whether addedProduct.length === 0 once addedProduct changes
    useEffect(() => {
        checkNoProduct()
        // console.log("rerendered")
        // console.log(second)
    // })

    }, [addedProducts, second])
    return  isNoProduct ?

        <section className="shoppingCart">

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
        </section>

                :
            <section className="shoppingCart">
            <div className="main-context">
            <div className="myBag-container">
                <MyBag/>
            </div>
            <div className="orderSummary-container">
                <OrderSummary/>
            </div>
            </div>
        </section>
    ;
};
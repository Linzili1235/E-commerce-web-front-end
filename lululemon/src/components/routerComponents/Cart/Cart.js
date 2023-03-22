import React from 'react';
import {MyBag} from "./MyBag";
import {OrderSummary} from "./OrderSummary";
import './Cart.scss'
export const Cart = () => {
    return (
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
    );
};
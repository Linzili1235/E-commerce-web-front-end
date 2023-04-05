import React from 'react';
import {
    PayPalScriptProvider,
    PayPalButtons,
} from "@paypal/react-paypal-js";
import { useNavigate } from "react-router-dom";

const PayPalButton = ({totalPrice}) => {
    const navigate = useNavigate()
    // This values are the props in the UI

    const amount = totalPrice.toFixed(2).toString();
    const currency = "CAD";
    const clientId = "ARbpbeDkb8SugCVd7nuWXf9V1W5RTV0nVhwJ1sPveEVeeik_X8c0mIX_yp2bprgXxJYL4PHkQACHXP8L";

    const style = {
        layout: 'vertical',
        color:  'blue',
        shape:  'rect',
        label:  'paypal'
    };
    return (
        <>
            <PayPalScriptProvider options={{ "client-id": clientId, currency }}>
                <PayPalButtons style={style} createOrder={(data, actions) => {
                    return actions.order.create({
                            purchase_units: [
                                {
                                    amount: {
                                        currency_code: currency,
                                        value: amount,
                                    },
                                },
                            ],
                        })
                }} onApprove={ (data, actions) => {
                    return actions.order.capture().then(function () {
                                           // Your code here after capture the order
                        navigate(`/review`);
                    })}
                }
                />
            </PayPalScriptProvider>
        </>
    );
};

export default PayPalButton;
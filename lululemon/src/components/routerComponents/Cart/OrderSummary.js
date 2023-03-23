import CurrentCity from "./CurrentCity";
import './OrderSummary.scss';
import FmdGoodOutlinedIcon from '@mui/icons-material/FmdGoodOutlined';
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

export const OrderSummary = () => {
    return <>
        <section className="order-summary">
            <div className="title">Order Summary</div>
            <div className="summary-details">
                <div className="detail">
                    <span>Subtotal:</span>
                    <span>$total</span>
                </div>
                <hr/>
                <div className="detail">
                    <span>Shipping:</span>
                    <span>$total</span>
                </div>
                <hr/>
                <div className="detail">
                    <span>Tax:</span>
                    <span>$total</span>
                </div>
                <hr/>
            </div>
            <div className="estimate">
                <span className="estTotal">Estimate Total</span>
                <span className="totalPrice">$111</span>
            </div>
            <div className="checkout-container">
                <div className="checkout-button">
                    <button>CHECKOUT</button>
                </div>
                <div className='quickly'>or checkout quickly with</div>
                <div className="paypal-button">
                    {
                        <PayPalScriptProvider options={{ "client-id": "test" }}>
                            <PayPalButtons style={{ layout: "horizontal"}} />
                        </PayPalScriptProvider>
                    }
                </div>
                <div className="ship-to">
                    <div className='address'>
                        {<FmdGoodOutlinedIcon className='mapIcon' fontSize={'inherit'}/>}Ship to {<CurrentCity />} </div>
                    <p>Arrives by Mon, Mar 27 with free shipping</p>
                </div>
            </div>
        </section>
    </>
}
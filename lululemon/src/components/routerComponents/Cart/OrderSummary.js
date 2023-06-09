import CurrentCity from "./CurrentCity";
import './OrderSummary.scss';
import FmdGoodOutlinedIcon from '@mui/icons-material/FmdGoodOutlined';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import invertLogo from "../../../assets/logo/invertLogo.png";
import { useSelector } from "react-redux";

import PayPalButton from "./PayPalButton";
import ArriveDate from "./ArriveDate";
import { useNavigate } from "react-router-dom";

export const OrderSummary = () => {
    const navigate = useNavigate();
    const { currTotal } = useSelector(state => state?.productReducer)
    const { addedProducts } = useSelector(state => state?.productReducer)
    const handleNavigate = () => {
        addedProducts.length > 0 ? navigate('/checkout') : navigate('/mainPage/1/1')

    }

    return <>
        <section className="order-summary">
            <div className="title">Order Summary</div>
            <div className="summary-details">
                <div className="detail">
                    <span>Subtotal</span>
                    <span>${currTotal.toFixed(2)}</span>
                </div>
                <hr/>
                <div className="detail">
                    <span>Shipping  &nbsp;<span>{<InfoOutlinedIcon fontSize={'small'}/>}</span></span>
                    <span>Free</span>
                </div>
                <hr/>
                <div className="detail">
                    <span>Tax &nbsp;<span>{<InfoOutlinedIcon fontSize={'small'}/>}</span></span>
                    <span>Calculated at checkout</span>
                </div>
                <hr/>
            </div>
            <div className="estimate">
                <span className="estTotal">Estimate Total</span>
                <span className="totalPrice">${currTotal.toFixed(2)}</span>
            </div>
            <div className="checkout-container">
                <div className="checkout-button" onClick={handleNavigate}>
                    <button>
                        <img src={invertLogo} alt="logo"/><span>CHECKOUT</span>
                    </button>
                </div>
                <div className='quickly'>or checkout quickly with</div>
                <div className="paypal-button">
                    {
                        <PayPalButton totalPrice={currTotal}/>
                    }
                </div>
                <div className="ship-to">
                    <div className='address'>
                        {<FmdGoodOutlinedIcon className='mapIcon' fontSize={'inherit'}/>}Ship to {<CurrentCity />} </div>
                    <p>Arrives by {<ArriveDate/>} with free shipping</p>
                </div>
            </div>
        </section>
    </>
}
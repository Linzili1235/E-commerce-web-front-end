import './OrderPlaced.scss'
import {useDispatch, useSelector} from "react-redux";
import actions from "../../../actions";
import {useEffect, useRef} from "react";
import ReactToPrint from 'react-to-print';
import {OrderedProduct} from "./OrderedProduct";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import {useState} from "react";


export const OrderPlaced = () => {
    const [products, setProducts] = useState([])
    const [quantities, setQuantities] = useState([])
    const [orderNumber, setOrdNum] = useState("")
    const navigate = useNavigate()
    const componentRef = useRef()


    /////////////////////////   Local storage   //////////////////////////////////
    useEffect( () =>  {
    async function fetchdata() {
        const prods = []
        const quans = []
        const data = window.localStorage.getItem('orderNumber')
        const orderNumber = JSON.parse(data)
        setOrdNum(orderNumber)
        await axios.get("http://localhost:8000/order/review",
            {
                params: {orderNumber}
            })
            .then(res => {
                const {product, quantity} = res.data.data
                for (const pro of product) {
                    prods.push(pro)
                }
                for (const quan of quantity) {
                    quans.push(quan)
                }

            }).catch(e => console.log(e))
        setProducts(prods)
        setQuantities(quans)
    }
    fetchdata()

    },[])




    const backToShopHandler = () => {
        navigate('/')

    }
    console.log(products)

    const handleInvoice = () => {

    }




    return <>
        <div className="primaryContent" ref={componentRef}>
            <div>
                <div className="myBag-header">
                    <h1>Order has been Placed</h1>

                </div>
                <div className="notificationBlock">
                    <div>Order Number: {orderNumber}</div>

                </div>
            </div>
            <div className="productGroup">
                {products && products.map((product, ind) => {
                    return <OrderedProduct index={ind} key={ind} product={product} quantity={quantities[ind]}/>
                })}
            </div>
        </div>
        <div className="back-print-button">
            <div className="invoice-print">
                <ReactToPrint
                    trigger={() => <button className="print-button">Print invoice</button>}
                    content={() => componentRef.current}
                />
            </div>
            <div className="back-to-shop">
                <div className="back-button" onClick={backToShopHandler}>
                    <span>Back to shop</span>
                </div>
            </div>

        </div>
        <div className="invoice-content" >

        </div>

    </>
}
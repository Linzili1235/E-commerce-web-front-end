import './OrderPlaced.scss'
import {useDispatch, useSelector} from "react-redux";
import actions from "../../../actions";
import React, {useEffect, useRef} from "react";
import {OrderedProduct} from "./OrderedProduct";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import {useState} from "react";
import {CircularProgress} from "@mui/material";


export const OrderPlaced = () => {
    const [products, setProducts] = useState([])
    const [quantities, setQuantities] = useState([])
    const [orderNumber, setOrdNum] = useState("")
    const [invoiceUrl, setInvoiceUrl] = useState("")
    const [print, setPrint] = useState(false)

    const navigate = useNavigate()

    // send reviewing order request when loading the page
    useEffect( () =>  {
    async function fetchdata() {
        const prods = []
        const quans = []
        const data = window.localStorage.getItem('orderNumber')
        const orderNumber = JSON.parse(data)
        setOrdNum(orderNumber)
        await axios.get("http://localhost:8000/order/review",
            {
                body: {orderNumber}
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


    const handleInvoice = async () => {
        setPrint(prevState => !prevState)
        await axios.get("http://localhost:8000/order/invoice",
            {
                params: {orderNumber}
            })
            .then(res => {
                const invoiceUrl = res.data
                setInvoiceUrl(invoiceUrl.data)

               }).catch(e => console.log(e))

        const printWindow = await window.open(invoiceUrl)
        printWindow.onload = () => {
            printWindow.print()
            printWindow.onafterprint = () => {
                printWindow.close()
            }
        }




        setTimeout(() => setPrint(prevState => !prevState),300)


    }




    return <>
        <div className="primaryContent">
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
                <button className={"print-button"} onClick={handleInvoice}>
                    <span className={ print ? "hide" : "display-button"} >Print invoice</span>
                    <CircularProgress className={print ? 'display-button' : 'hide'} size={15} color={'inherit'} />
                </button>

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
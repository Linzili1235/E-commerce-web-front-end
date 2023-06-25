import './OrderPlaced.scss'
import React, {useEffect} from "react";
import {OrderedProduct} from "./OrderedProduct";
import {useLocation, useNavigate} from "react-router-dom";
import {useState} from "react";
import {CircularProgress} from "@mui/material";
import {useAxiosPrivate} from "../../../hooks/useAxiosPrivate";
import {api_routes} from "../../../api/axios";


export const OrderPlaced = () => {
    const [products, setProducts] = useState([])
    const [quantities, setQuantities] = useState([])
    const [orderNumber, setOrdNum] = useState("")
    const [invoiceUrl, setInvoiceUrl] = useState("")
    const [print, setPrint] = useState(false)
    const axiosPrivate = useAxiosPrivate()

    const navigate = useNavigate()
    const location = useLocation()

    // send reviewing order request when loading the page
    useEffect( () =>  {
        let isMounted = true
        const controller = new AbortController()
        const fetchdata = async () => {
            const prods = []
            const quans = []
            const data = window.localStorage.getItem('orderNumber')
            const orderNumber = JSON.parse(data)
            console.log('order buner', orderNumber)
            setOrdNum(orderNumber)
            await axiosPrivate.get(api_routes.reviewOrder,
                {
                    signal: controller.signal,
                    params: {orderNumber}


                },
                )
                .then(res => {
                    const {product, quantity} = res.data.data
                    for (const pro of product) {
                        prods.push(pro)
                    }
                    for (const quan of quantity) {
                        quans.push(quan)
                    }

                }).catch(e => {
                        console.log(e)
                        navigate('/signIn', {state: {from: location}, replace: true})
                    }
                )
            setProducts(prods)
            setQuantities(quans)
        }

        fetchdata()
        return () => {
            isMounted = false
            controller.abort()

        }

    },[])




    const backToShopHandler = () => {
        // finish the transition
        window.localStorage.setItem('orderNumber',JSON.stringify(''))

        navigate('/')

    }


    const handleInvoice = async () => {
        setPrint(prevState => !prevState)
        await axiosPrivate.get(api_routes.createInvoice,
            {
                params: {orderNumber}
            })
            .then(res => {
                const invoiceUrl = res.data
                setInvoiceUrl(invoiceUrl.data)

               }).catch(
                   e => {
                       console.log(e)
                       navigate('/signIn', {state: {from: location}, replace: true})

                   }

            )

        const printWindow = await window.open(invoiceUrl)
        printWindow.onload = () => {
            printWindow.print()
            printWindow.onafterprint = () => {
                printWindow.close()
            }
        }




        setTimeout(() => setPrint(prevState => !prevState),300)


    }




    return <div className="order-place-page">
        <div className="order-place-container">
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
        </div>

    </div>
}
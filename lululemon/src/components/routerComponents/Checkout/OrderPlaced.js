import './OrderPlaced.scss'
import {useDispatch, useSelector} from "react-redux";
import actions from "../../../actions";
import {useEffect, useRef} from "react";
import ReactToPrint from 'react-to-print';
import {OrderedProduct} from "./OrderedProduct";
import {useNavigate} from "react-router-dom";


export const OrderPlaced = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const componentRef = useRef()
    const addedProducts = useSelector(state => state?.productReducer.addedProducts)
    // console.log(addedProducts)


    /////////////////////////   Local storage   //////////////////////////////////
    useEffect(() => {
        const data = window.localStorage.getItem('Added Products')
        const recoveredProduct = JSON.parse(data)
        // when refreshing, data in redux store will lose, then should recover data using localStorage
        dispatch(actions?.productActions?.addWhenRefresh(recoveredProduct))
        // console.log("rendered when refresh")
    },[])


    useEffect(() => {
        window.localStorage.setItem('Added Products', JSON.stringify(addedProducts));
        // console.log("rendered when addedProduct changes")
        // console.log(addedProducts)
    }, [addedProducts]);

    const backToShopHandler = () => {
        navigate('/')

    }





    return <>
        <div className="primaryContent" ref={componentRef}>
            <div>
                <div className="myBag-header">
                    <h1>Order has been Placed</h1>

                </div>
                <div className="notificationBlock">
                    <div>Order Number: </div>

                </div>
            </div>
            <div className="productGroup">
                {addedProducts && addedProducts.map((product, ind) => {
                    return <OrderedProduct index={ind} key={ind} product={product}/>
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
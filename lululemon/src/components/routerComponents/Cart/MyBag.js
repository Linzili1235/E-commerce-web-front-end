import './MyBag.scss'
import {useDispatch, useSelector} from "react-redux";
import actions from "../../../actions";
import {useEffect} from "react";
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import {ProductInBag} from "./ProductInBag";


export const MyBag = () => {
    const dispatch = useDispatch()
    const addedProducts = useSelector(state => state?.productReducer.addedProducts)
    // console.log(addedProducts)

    /////////////////////////   Local storage   //////////////////////////////////
    useEffect(() => {
        const data = window.localStorage.getItem('Added Products')
        const recoveredProduct = JSON.parse(data)
        // when refreshing, data in redux store will lose, then should recover data using localStorage
        dispatch(actions?.productActions?.addWhenRefresh(recoveredProduct))
    },[])


    useEffect(() => {
        window.localStorage.setItem('Added Products', JSON.stringify(addedProducts));
        // console.log(addedProducts)
    }, [addedProducts]);

    const totalQ = () => {
        let count = 0
        for (const obj of addedProducts) {
            count += obj.quantity
        }
        return count
    }

    const totalQuantity = totalQ()

    return <>
        <div className="primaryContent">
            <div>
                <div className="myBag-header">
                    <h1>My Bag</h1>
                    <span>({totalQuantity} {`${totalQuantity > 1 ? 'Items': 'Item'}`})</span>

                </div>
                <div className="notificationBlock">
                    <ShoppingBagIcon className="shoppingBag"/>
                    <div>Items in bag are not reserved. Checkout now to get your gear. </div>

                </div>
            </div>
            <div className="productGroup">
                {addedProducts && addedProducts.map((product, ind) => {
                    return <ProductInBag index={ind} key={ind} product={product}/>
                })}
            </div>

        </div>
    </>
}
import "./ProductList.scss"
import {FETCH_ONE_API} from "../../../Helper";
import {ProductItem} from "./ProductItem";

export const ProductList = () => {
    // fetch(FETCH_ONE_API)
    //     .then(res => res.json())
    //     .then(({rs}) =>
    //         console.log(rs))
    return <div className="productMain">
        <ProductItem/>

    </div>
}
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import {useSelector} from "react-redux";

export const ShoppingBagWithQ = () => {
    const addedProduct = useSelector(state => state?.productReducer?.addedProducts)

    const totalQ = () => {
        let count = 0
        for (const obj of addedProduct) {
            count += obj.quantity
        }
        return count
    }
    const totalQuantity = totalQ()
    return <div className="shoppingBag-container">
        <ShoppingBagIcon className="shoppingBag" />
        <div className="showing-quantity">{totalQuantity}</div>

    </div>
}

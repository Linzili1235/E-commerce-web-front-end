import {actionType, FETCH_ALL_URL, KEYS_URL} from "../Helper";
import axios from "axios";

////////////////////////////////
// This is the Redux Thunk action creator
//    - middleware allows action creator to return a function
//    - which can then perform asynchronous actions and dispatch actions to reducers
////////////////////////////////

//[async dispatch] is provided by redux thunk middleware
const fetchOneProduct = ({id}) => async dispatch => {

    try {
        const response = await axios.get(`http://api-lulu.hibitbyte.com/product/${id}?${KEYS_URL}`)
        const data = response?.data?.rs;
        console.log('[Fetch one product details --- data]', data)
        dispatch({
            type: actionType.FETCH_ONE_PRODUCT,
            payload: data
        })
    } catch (e) {
        console.log('[fetch one product error]',e)
    }
}
//[async dispatch] is provided by redux thunk middleware
const fetchAllProducts = () => async dispatch => {
    // console.log('[Fetch one product action creator]');
    try {
        const response = await axios.get(FETCH_ALL_URL)
        const data = response?.data?.rs;
        // console.log('[Fetch All products details]', data)
        dispatch({
            type: actionType.FETCH_ALL_PRODUCTS,
            payload: data
        })
    } catch (e) {
        console.log('[fetch All product error]',e)
    }
}
const fetchAllProductsWithFilter = (dispatch) => async (filters) => {
    // console.log('[Fetch one product action creator]');
    try {
        const response = await axios.post(FETCH_ALL_URL,filters)
        const data = response?.data?.rs;
        // console.log('[Fetch All products details]', data)
        dispatch({
            type: actionType.FETCH_ALL_PRODUCTS_WITH_FILTER,
            payload: data
        })
    } catch (e) {
        console.log('[fetch All product error]',e)
    }
}

export default {
    fetchOneProduct,
    fetchAllProducts,
    fetchAllProductsWithFilter,
}
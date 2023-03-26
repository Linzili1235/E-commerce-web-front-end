import {actionType, FETCH_ALL_URL, KEYS_URL} from "../Helper";
import axios from "axios";

////////////////////////////////
// This is the Redux Thunk action creator
//    - middleware allows action creator to return a function
//    - which can then perform asynchronous actions and dispatch actions to reducers
////////////////////////////////

//[async dispatch] is provided by redux thunk middleware
const fetchOneProduct = (productId) => async dispatch => {
    try {
        const response = await axios.get(`http://api-lulu.hibitbyte.com/product/${productId}?${KEYS_URL}`)
        const data = response?.data?.rs;
        // console.log('[Fetch one product details --- data]', data)
        dispatch({
            type: actionType.FETCH_ONE_PRODUCT,
            payload: data
        })
    } catch (e) {
        console.log('[fetch one product error]',e)
    }
}
//[async dispatch] is provided by redux thunk middleware
// const fetchAllProducts = () => async dispatch => {
//     // console.log('[Fetch one product action creator]');
//     try {
//         const response = await axios.get(FETCH_ALL_URL)
//         const data = response?.data?.rs;
//         // console.log('[Fetch All products details]', data)
//         dispatch({
//             type: actionType.FETCH_ALL_PRODUCTS,
//             payload: data
//         })
//     } catch (e) {
//         console.log('[fetch All product error]',e)
//     }
// }

// fetch with sorting tab
const fetchProductsPageSorting = (page, sorting, filters) => async dispatch => {
    try {
        // console.log(`[Action] sortingId=${sorting}&page=${page}`)
        const response = await axios.post(`http://api-lulu.hibitbyte.com/product/allProducts?sortingId=${sorting}&page=${page}&${KEYS_URL}`, filters)
        const data = response?.data?.rs;
        // console.log('[Action] data:',data)
        dispatch({
            type: actionType.FETCH_PRODUCTS_PAGE_SORTING,
            payload: data
        })
    } catch (e) {
        console.log('[fetch product with page & sorting error]',e)
    }
}
//todo:
const fetchAllProductsWithFilter = (dispatch, page, sorting) => async (filters) => {
    // console.log('[Fetch one product action creator]');
    // console.log('Fetch all products with filter', page, sorting)
    try {
        const response = await axios.post(`http://api-lulu.hibitbyte.com/product/allProducts?sortingId=${sorting}&page=${page}&${KEYS_URL}`,filters)
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

// Actions for the Add To Bag
const removeProduct = ()  =>  {
    return {
        type: actionType.REMOVE_PRODUCT,
        payload: {remainProduct:[], totalPrice: 0}
    }
}

const addToBag = (img, title, price, size, color,productId, colorIndex, sizeIndex) => async dispatch => {
    dispatch({
        type: actionType.ADDED_PRODUCT_INFO,
        payload: {quantity: 1, productId, productInfo: {img, title, price, size, color, colorIndex, sizeIndex}}
    })

    dispatch({
        type: actionType.TOTAL_PRICE,
        payload: 0,
    })

}

const updateToBag = (ind, img, size, color, colorIndex, sizeIndex) => dispatch => {
    dispatch({
        type: actionType?.UPDATE_TO_BAG,
        payload:{ind,img,size,color,colorIndex,sizeIndex}
    })
}


const addWhenRefresh = (data) => {
    return {
        type: actionType.ADD_WHEN_REFRESH,
        payload: data
    }
}

const toggleSummaryBox = (bool) => {
    return {
        type: actionType.TOGGLE_SUMMARY_BOX,
        payload: {isClosed: bool}
    }
}
const toggleUpdateBox = (bool) => {
    return {
        type: actionType.TOGGLE_UPDATE_BOX,
        payload: {isUpdateClosed: bool}
    }
}

const setNoProduct = (bool) => {
    return {
        type: actionType.SET_NO_PRODUCT,
        payload: bool
    }
}

const changeWithQuantity = (ind, quantity) => async dispatch => {
    dispatch({
        type: actionType.CHANGE_WITH_QUANTITY,
        payload:{quantity, ind}
    })
    dispatch({
        type: actionType.TOTAL_PRICE,
        payload: 0,
    })
}

const removeSpecificProduct = (ind) => async dispatch => {
    dispatch({
        type: actionType.REMOVE_SPECIFIC_PRODUCT,
        payload: ind
    })
    dispatch({
        type: actionType.TOTAL_PRICE,
        payload: 0,
    })

}



export default {
    fetchOneProduct,
    // fetchAllProducts,
    fetchAllProductsWithFilter,
    fetchProductsPageSorting,
    removeProduct,
    addToBag,
    toggleSummaryBox,
    toggleUpdateBox,
    addWhenRefresh,
    changeWithQuantity,
    removeSpecificProduct,
    updateToBag,
    setNoProduct

}
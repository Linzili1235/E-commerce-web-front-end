import {actionType} from "../Helper";

const initState = {
    one_product:[],
    all_products:[],

}
export const productReducer = (state=initState,action) => {
    switch (action.type){
        case actionType.FETCH_ONE_ITEM:
            return {...state,
                one_product: action?.payload}
        case actionType.FETCH_ALL_ITEMS:
            return {...state,
            all_products: action?.payload}
        default:
            return state
    }

}
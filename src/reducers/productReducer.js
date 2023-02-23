import {actionType} from "../Helper";

const initState = {
    images: {},
    swatches: {},
    name: "",
    price:"",
    productId:""
}
export const productReducer = (state=initState,action) => {
    switch (action.type){
        case actionType.FETCH_ONE_ITEM:
            const {images,swatches, name, price, productId} = action?.payload
            return {...state,
                images:images,
            swatches:swatches,
            name:name,
            price:price,
            productId}
        default:
            return state
    }

}
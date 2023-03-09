import {actionType} from "../Helper";

const initialState = {
    colorID: '',
    one_product: [],
    pageProducts: [],
    filters: {},
    addedProducts:[],
    params: {},   // if pagination is enabled, we need to change the params to separately control page
    sortId: '1'
}

export const productReducer = (state=initialState, action) => {
    switch (action.type) {
        case actionType.FETCH_ONE_PRODUCT:
            // console.log('[reducer] fetch one products', action.payload)
            return {...state, one_product: action.payload};
        // case actionType.FETCH_ALL_PRODUCTS:
        //     // console.log('[reducer] fetch all products', action.payload)
        //     return {...state, allProducts: action.payload};
        case actionType.FETCH_PRODUCTS_PAGE_SORTING:
            // console.log('[reducer] fetch all products', action.payload)
            return {...state, pageProducts: action.payload};
        case actionType.GET_FILTERS:
            // console.log('[reducers] get all filters', action.payload);
            return {...state, filters: action.payload};
        case actionType.UPDATE_FILTERS:
            // The code is handling an action where a filter checkbox has been clicked.
            // It copies the current filters from state to a temporary variable,
            // and then iterates over each filter item to check whether the checkbox has been checked or unchecked.
            // If the checkbox is checked, then the corresponding filter item in the temporary variable is updated
            // to reflect the change.
            const temp = {...state.filters}  // prevent to change the state directly
            for (const key of Object.keys(temp)) {
                temp[key].forEach(e => {
                    if (e.name === action.payload) {
                        e.isChecked = !e.isChecked
                    }
                })
            }
            return {...state,filters: temp}
        case actionType.FETCH_ALL_PRODUCTS_WITH_FILTER:{
            return {...state, pageProducts: action.payload};
        }
        case actionType.URL_PARAMS_SAVER:
            return {...state, params: action.payload}
        case actionType.SORT_ID:
            console.log('[reducers] get sortId', action.payload);
            return {...state, sortId: action.payload};
        default:
            return {...state}
    }
}
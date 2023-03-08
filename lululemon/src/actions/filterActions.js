import axios from "axios";
import {actionType, FETCH_ALL_URL, GET_FILTERS_URL} from "../Helper";
//  implicit return statement

// In this case, it is common to put dispatch second in the argument list,
// after the URL. This is because the URL is specific to the getFilters function
// and is not required for all Thunks, while dispatch is required for all Thunks.
//
const getFilters = () => async dispatch  => {
    try {
        const response = await axios.get(GET_FILTERS_URL)
        // console.log(response)
        const data = response?.data;
        // console.log('[redux thunk dispatch] get filters', data)
        dispatch({
            type: actionType.GET_FILTERS,
            payload: data.rs
        })
    } catch (e) {
        console.log('[Get filters error]',e)
    }
}


// 1. dispatch is the first argument used, ele is the second argument (inner argument) for dispatch when the returned function is invoked.
// 2. The function updateFilter returns a Promise, but it does not use await to wait for any asynchronous operations to
//    complete before dispatching the action.

const updateFilter = (dispatch) => async (ele) => {
    try {
        dispatch({
            type:actionType.UPDATE_FILTERS,
            payload:ele
        })
        return true
    }catch (e) {
        console.log('[Change filters error]', e)
        return false
    }
}



export default {
    getFilters,
    updateFilter,
}
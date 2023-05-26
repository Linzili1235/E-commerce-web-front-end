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

//function updateFilter(dispatch) {
//   return async function(ele) {
//     // function body goes here
//   }
// }
// const updateFilter = function(dispatch) {
//   return async function(ele) {
//     // function body goes here
//   }
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

// Store pageNum and sortingId to the global store
// 去掉 .then() 的话，就不是promise，就不需要async
const urlParamsSaver = (dispatch) => (pageNum, sortingId) => {
    try {
        dispatch({
            type: actionType.URL_PARAMS_SAVER,
            payload: {pageNum, sortingId}
        })
        return true
    } catch (e) {
        console.log('[Save URL params error]', e)
        return false
    }
}
// todo:
// 1. 添加更新后的filter给action creators，这样就可以保证状态一致
// 2。同样的方法做一个pagination的action creator，发送 pageNum 和 filter
// Change sortingId
const changeSortId = (dispatch) => async (sortingId) => {
    try {
        dispatch({
            type: actionType.SORT_ID,
            payload: sortingId
        })
        return true
    } catch (e) {
        console.log('[Save URL params error]', e)
        return false
    }
}
const changePageNum = (dispatch) => async (pageNum) => {
    try {
        dispatch({
            type: actionType?.PAGE_NUM,
            payload: pageNum
        })
        return true

    }catch (e) {
        console.log('[Fail to save new page number', e)
        return false
    }

}


export default {
    getFilters,
    updateFilter,
    urlParamsSaver,
    changeSortId,
    changePageNum
}
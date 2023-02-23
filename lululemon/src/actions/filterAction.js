import {actionType, GET_FILTER_API} from "../Helper";
import {useEffect} from "react";

const selectAllFilters = () => async dispatch => {
    await fetch(GET_FILTER_API)
        .then(res => res.json())
        .then(({rs}) =>
            dispatch({
                type: actionType.SELECT_ALL_FILTER,
                payload: rs
            })
        )
        .catch(err => console.log(err))
}



export default {selectAllFilters}
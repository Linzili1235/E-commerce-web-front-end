import {actionType, FETCH_ALL_API, FETCH_ONE_API} from "../Helper";

const getOneProductItem = () => async dispatch => {
    await fetch(FETCH_ONE_API).then(res => res.json())
        .then(({rs}) => {

            dispatch(
            {
                type: actionType.FETCH_ONE_ITEM,
                payload: rs

            }
        )}).catch(err => console.log(err))
}

const getAllProductItems = () => async dispatch => {
    await fetch(FETCH_ALL_API).then(res => res.json())
        .then(({rs}) => {
            dispatch({
                type: actionType.FETCH_ALL_ITEMS,
                payload: rs
            })
        }).catch(err => console.log(err))
}

export default {getOneProductItem,getAllProductItems}
import {actionType, FETCH_ONE_API} from "../Helper";

const getProductItem = () => async dispatch => {
    await fetch(FETCH_ONE_API).then(res => res.json())
        .then(({rs}) => {

            dispatch(
            {
                type: actionType.FETCH_ONE_ITEM,
                payload: rs

            }
        )}).catch(err => console.log(err))
}

export default {getProductItem}
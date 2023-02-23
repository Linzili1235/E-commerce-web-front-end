import {actionType} from "../Helper";


const initState = {
    filters:{}
}
export const filterReducer = (state=initState,action) => {
    switch (action.type){
        case actionType.SELECT_ALL_FILTER:
            return {...state,
                filters: action?.payload}
        default:
            return state
    }

}
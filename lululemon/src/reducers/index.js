import {combineReducers} from "redux";
import {filterReducer} from "./filterReducer";
import {productReducer} from "./productReducer";

export default combineReducers(
    {filterReducer,productReducer}
)
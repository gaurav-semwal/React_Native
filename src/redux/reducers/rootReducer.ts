import { combineReducers } from "redux";
import authreducer from "../slices/authSlice";


const rootReducer = combineReducers({
  auth: authreducer,

});

export default rootReducer;

import authReducer from "./authReducer";
import workerReducer from "./workerReducer";
import { combineReducers } from "redux";

/* CombinerReducer is creating object where the state in Store will having 2 property auth & worker 
    pointing to different reducers */

const rootReducer = combineReducers({
  auth: authReducer,
  worker: workerReducer
});

export default rootReducer;

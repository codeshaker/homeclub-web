import authReducer from "./authReducer";
import workerReducer from "./workerReducer";
import { combineReducers } from "redux";
import { firestoreReducer } from "redux-firestore";
import { firebaseReducer } from "react-redux-firebase";

/* CombinerReducer is creating object where the state in Store will having 2 property auth & worker 
    pointing to different reducers */

const rootReducer = combineReducers({
  auth: authReducer,
  worker: workerReducer,
  firestore: firestoreReducer,
  firebase: firebaseReducer
});

export default rootReducer;

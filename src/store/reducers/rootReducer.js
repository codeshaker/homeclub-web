import authReducer from "./authReducer";
import workerReducer from "./workerReducer";
import { combineReducers } from "redux";
import { firestoreReducer } from "redux-firestore";
import { firebaseReducer } from "react-redux-firebase";
import userReducer from "./userReducer";

/* CombinerReducer is creating object where the state in Store will having 2 property auth & worker 
    pointing to different reducers */

const rootReducer = combineReducers({
  auth: authReducer,
  workers: workerReducer,
  firebase: firebaseReducer,
  firestore: firestoreReducer,
  user: userReducer
});

export default rootReducer;

import {createStore, applyMiddleware} from "redux";
import user from './reducers/allreducers.js';
import thunk from "redux-thunk";


export default createStore(user, applyMiddleware(thunk));

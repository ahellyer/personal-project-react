import { ADD_USER } from "../constants";
import { ADD_PULLS } from "../constants";
import { ADD_FORKS } from "../constants";
import { TOGGLE_FORM } from "../constants";

const initialState = {
  user: {},
  showForm: true
}

// reducer
const user = (store = initialState, action) => {
  switch (action.type) {
    case ADD_USER:
      return {
        ...store,
        user: action.payload
      }
    case ADD_PULLS:
      return {
        ...store,
        pullRequests: action.payload
      }
    case ADD_FORKS:
      return {
        ...store,
        forkEvents: action.payload
      }
    case TOGGLE_FORM:
      return {
        ...store, 
        showForm: action.payload
      }
    default:
      return store;
  }
}

export default user;

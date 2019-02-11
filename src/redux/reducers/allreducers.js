import { ADD_USER } from "../constants";
import { ADD_PULLS } from "../constants";
import { ADD_FORKS } from "../constants";
import { TOGGLE_FORM } from "../constants";
import { ADD_EVENTS } from "../constants";
import { FETCH_ERROR } from "../constants";
import { CLEAR_ERROR } from "../constants";
import { ADD_FORK} from "../constants";

const initialState = {
  user: {},
  showForm: true,
  allEvents: [],
  error: '',
  forkBase: []
}

// reducer
const user = (store = initialState, action) => {
  switch (action.type) {
    case ADD_USER:
      return {
        ...store,
        user: action.payload
      }
    case ADD_EVENTS:
      return {
        ...store,
        allEvents: action.payload,
        showForm: false
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
    case FETCH_ERROR:
      return {
        ...store,
        error: 'there was an error'
      }
    case CLEAR_ERROR:
      return {
        ...store,
        error: ''
      }
    case ADD_FORK:
      return {
      ...store,
      forkBase: store.forkBase.concat(action.payload.data)
    }
    default:
      return store;
  }
}

export default user;

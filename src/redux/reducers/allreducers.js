import CONSTANTS from "../constants";

const initialState = {
  user: {},
  showForm: true,
  allEvents: [],
  error: '',
  forkBase: []
}

const user = (store = initialState, action) => {
  switch (action.type) {
    case CONSTANTS.ADD_USER:
      return {
        ...store,
        user: action.payload
      }
    case CONSTANTS.ADD_EVENTS:
      return {
        ...store,
        allEvents: action.payload,
        showForm: false
      }
    case CONSTANTS.ADD_PULLS:
      return {
        ...store,
        pullRequests: action.payload
      }
    case CONSTANTS.ADD_FORKS:
      return {
        ...store,
        forkEvents: action.payload
      }
    case CONSTANTS.FETCH_ERROR:
      return {
        ...store,
        error: 'there was an error'
      }
    case CONSTANTS.CLEAR_ERROR:
      return {
        ...store,
        error: ''
      }
    case CONSTANTS.ADD_FORK:
      return {
      ...store,
      forkBase: store.forkBase.concat(action.payload.data)
    }
    default:
      return store;
  }
}

export default user;

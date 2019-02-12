import CONSTANTS from "../constants";
import github from "./../../apis/github";
import axios from 'axios';
import { token } from "./../../apis/token";

export const addUserAction = (users) => ({
  type: CONSTANTS.ADD_USER,
  payload:users
})

export const clearErrorAction = () => ({
  type: CONSTANTS.CLEAR_ERROR,
})

export const addEventsAction = (events) => ({
  type: CONSTANTS.ADD_EVENTS,
  payload: events.data
})

export const addPullsAction = (pulls) => ({
  type: CONSTANTS.ADD_PULLS,
  payload: pulls
})

export const fetchErrorAction = (error) => ({
  type: CONSTANTS.FETCH_ERROR,
  payload: error
})

export const addForkBase = (res) => ({
  type: CONSTANTS.ADD_FORK,
  payload: res
})

export const onUserSubmit = (user) => {
  return function(dispatch) {
    dispatch(clearErrorAction())
    dispatch(fetchUserAction(user))
    dispatch(fetchEventsAction(user))
  }
}

export const fetchUserAction = (username) => {
  const url = `/users/${username}?access_token=${token}`
  return async function(dispatch) {

    const response = await github.get(url);

    dispatch(addUserAction(response.data), (err)=> dispatch(fetchErrorAction(err)))
  }
}

export const fetchEventsAction = (username) => {
    const url = `https://api.github.com/users/${username}/events?access_token=${token}`
    return function (dispatch) {
    axios.get(url)
      .then((res) => dispatch(addEventsAction(res)) , (err)=> dispatch(fetchErrorAction(err)))
  }
};

export const fetchForkBaseAction = (url) => {
  return function (dispatch) {

  axios.get(url)
    .then((res) => dispatch(addForkBase(res)))
}
}

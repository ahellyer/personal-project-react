import { ADD_USER } from "../constants";
import { ADD_PULLS } from "../constants";
import { ADD_FORKS } from "../constants";
import { TOGGLE_FORM } from "../constants";
import { FETCH_USER } from "../constants";
import { ADD_EVENTS } from "../constants";
import { FETCH_ERROR } from "../constants";
import { CLEAR_ERROR } from "../constants";
import { FETCH_FORK } from "../constants";
import { ADD_FORK } from "../constants";

import github from "./../../apis/github";
import axios from 'axios';

export const addUserAction = (users) => ({
  type: ADD_USER,
  payload:users
})

export const clearErrorAction = () => ({
  type: CLEAR_ERROR,
})

export const addEventsAction = (events) => ({
  type: ADD_EVENTS,
  payload: events.data
})

export const addPullsAction = (pulls) => ({
  type: ADD_PULLS,
  payload: pulls
})

export const fetchErrorAction = (error) => ({
  type: FETCH_ERROR,
  payload: error
})

export const addForkBase = (res) => ({
  type: ADD_FORK,
  payload: res
})

export const fetchUserAction = (username) => {
  console.log(username);
  const url = `/users/${username}?access_token=33ea3fc9fb790ad5734c33714a4b5205adb0afb1`
  return async function(dispatch) {

    const response = await github.get(url);

    dispatch(addUserAction(response.data), (err)=> dispatch(fetchErrorAction(err)))
  }
}

// export const fetchEventsAction = (username) => {
//   console.log(username);
//   const url = `/users/${username}/events`
//   return async function(dispatch) {
//
//     const response = await github.get(url);
//     console.log(response);
//     dispatch(addEventsAction(response))
//   }
// }

export const fetchEventsAction = (username) => {
    console.log(username);
    console.log('in fetch events')
    const url = `https://api.github.com/users/${username}/events?access_token=33ea3fc9fb790ad5734c33714a4b5205adb0afb1`
    return function (dispatch) {
    console.log('events', url)
    axios.get(url)
      .then((res) => dispatch(addEventsAction(res)) , (err)=> dispatch(fetchErrorAction(err)))
  }
};


export const fetchForkBaseAction = (url, id) => {
  console.log(url, id);
  console.log('in fetch fork base')
  return function (dispatch) {
  console.log('fork base dispatch', url)
  axios.get(url)
    .then((res) => dispatch(addForkBase(res)))
}
}

export const addFormToggleAction = (showForm) => ({
  type: TOGGLE_FORM,
  payload: showForm
})

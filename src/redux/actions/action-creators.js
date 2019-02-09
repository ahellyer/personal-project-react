import { ADD_USER } from "../constants";
import { ADD_PULLS } from "../constants";
import { ADD_FORKS } from "../constants";
import { TOGGLE_FORM } from "../constants";

export const addUserAction = (users) => ({
  type: ADD_USER,
  payload:users
})

export const addPullsAction = (pulls) => ({
  type: ADD_PULLS,
  payload: pulls
})

export const addForksAction = (forks) => ({
  type: ADD_FORKS,
  payload: forks
})

export const addFormToggleAction = (showForm) => ({
  type: TOGGLE_FORM,
  payload: showForm
})

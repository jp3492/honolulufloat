import axios from 'axios'
import { AUTH_USER, AUTH_ERROR, GET_USER, BOOKED, UPDATE_USER, CANCELLED } from './types'

export const cancel = (_id, callback) => async (dispatch, getState) => {
  const res = await axios.post('/api/cancel', { _id }, { headers: { 'Content-Type':'application/json','Authorization' : getState().auth.authenticated}})
  dispatch({ type: CANCELLED, payload: res.data })
  if (callback) {
    callback()
  }
}

export const book = (booking, callback) => async (dispatch, getState) => {
  const res = await axios.post('/api/book', booking, { headers: { 'Content-Type':'application/json','Authorization' : getState().auth.authenticated}})
  dispatch({ type: BOOKED, payload: res.data })
  if (callback) {
    callback()
  }
}

export const updateProfile = user => async (dispatch, getState) => {
  const res = await axios.post('/api/updateUser', user, { headers: { 'Content-Type':'application/json','Authorization' : getState().auth.authenticated}})
  dispatch({ type: UPDATE_USER, payload: user })
}

export const getUser = callback => async (dispatch, getState) => {
  console.log(getState().auth.authenticated);
  const res = await axios.post('/api/getUser', { headers: { 'Content-Type':'application/json','Authorization' : getState().auth.authenticated}})
  console.log(res);
  dispatch({ type: GET_USER, payload: res.data })
  if (callback) {
    callback()
  }
}

export const signup = (formProps, callback) => async dispatch => {
  try {
    const res = await axios.post('/auth/signup', formProps)
    dispatch({ type: AUTH_USER, payload: res.data.token })
    localStorage.setItem('token', res.data.token)
    callback()
  } catch (e) {
    dispatch({ type: AUTH_ERROR, payload: 'Email in use' })
  }
}

export const signin = (formProps, callback) => async dispatch => {
  try {
    const res = await axios.post('/auth/signin', formProps)
    dispatch({ type: AUTH_USER, payload: res.data.token })
    await localStorage.setItem('token', res.data.token)
    callback()
  } catch (e) {
    dispatch({ type: AUTH_ERROR, payload: 'Invalid login credentials' })
  }
}

export const signout = history => {
  localStorage.removeItem('token')
  history.push('/')
  return { type: AUTH_USER, payload: false }
}

import axios from 'axios'
import { AUTH_USER, AUTH_ERROR, GET_USER } from './types'

export const updateProfile = user => async (dispatch, getState) => {
  const res = await axios.post('/api/updateUser', user, { headers: { 'Content-Type':'application/json','Authorization' : getState().auth.authenticated}})
  dispatch({ type: GET_USER, payload: user })
}

export const getUser = () => async (dispatch, getState) => {
  const res = await axios.get(`/api/getUser`, { headers: { 'Content-Type':'application/json','Authorization' : getState().auth.authenticated}})
  dispatch({ type: GET_USER, payload: res.data })
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

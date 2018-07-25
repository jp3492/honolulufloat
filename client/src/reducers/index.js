import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'
import auth from './auth'
import data from './data'
import display from './display'

export default combineReducers({
  auth,
  data,
  display,
  form: formReducer
});

import React from 'react'
import ReactDOM from 'react-dom'
import { HashRouter, Route } from 'react-router-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import reduxThunk from 'redux-thunk'
import logger from 'redux-logger'

import reducers from './reducers'
import App from './components/App'
import Welcome from './components/landing/Welcome'
import Signup from './components/auth/Signup'
import Signout from './components/auth/Signout'
import Signin from './components/auth/Signin'
import Home from './components/home/Home'
import Calendar from './components/calendar/Calendar'

const store = createStore(
  reducers,
  {
    auth: { authenticated: localStorage.getItem('token') }
  },
  applyMiddleware(reduxThunk, logger)
)

ReactDOM.render(
  <Provider store={store}>
    <HashRouter>
      <App>
        <Route path="/" exact component={Welcome} />
        <Route path="/signup" component={Signup} />
        <Route path="/signout" component={Signout} />
        <Route path="/signin" component={Signin} />
        <Route path="/home" component={Home} />
        <Route path="/calendar" component={Calendar} />
      </App>
    </HashRouter>
  </Provider>,
  document.querySelector('#root')
)

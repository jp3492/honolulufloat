import React, { Component } from 'react'
import { connect } from 'react-redux'

import requireAuth from '../hoc/requireAuth'
import Profile from './Profile'
import Upcoming from './Upcoming'
import Past from './Past'
import UpcomingHeader from './UpcomingHeader'

class Home extends Component{
  render(){
    return (
      <div id="home">
        <Profile />
        <UpcomingHeader />
        <Upcoming />
      </div>
    )
  }
}
export default requireAuth(Home)

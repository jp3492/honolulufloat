import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

class UpcomingHeader extends Component{
  render(){
    return (
      <div id="upcomingHeader">
        <h3>Upcoming Float Sessions</h3>
      </div>
    )
  }
}
export default UpcomingHeader

import React, { Component } from 'react'
import { connect } from 'react-redux'

import requireAuth from '../hoc/requireAuth'
import CalendarHeader from './CalendarHeader'
import Times from './Times'
import Floats from './Floats'

class Calendar extends Component{
  render(){
    return (
      <div id="calendar">
        <CalendarHeader />
        <Times />
        <Floats />
      </div>
    )
  }
}
export default requireAuth(Calendar)

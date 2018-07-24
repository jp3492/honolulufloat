import React, { Component } from 'react'
import { connect } from 'react-redux'

class CalendarHeader extends Component{
  render(){
    return (
      <div id="calendarHeader">
        <h2>Calendar</h2>
        <div id="weeks">
          <i className="material-icons">chevron_left</i>
          <div id="week">
            Week 24: 12.8.18-19.8.19
          </div>
          <i className="material-icons">chevron_right</i>
        </div>
        <div id="weekStats">
          <div className="weekStat"><div className="legend" id="available"></div> Available</div>
          <div className="weekStat"><div className="legend" id="reserved"></div> Reserved</div>
          <div className="weekStat"><div className="legend" id="you"></div> You</div>
          <div className="weekStat"><div className="legend" id="unavailable"></div> Unavailable</div>
        </div>
      </div>
    )
  }
}
export default CalendarHeader

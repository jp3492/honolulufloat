import React, { Component } from 'react'
import { connect } from 'react-redux'

import { days } from '../../general/static'
import { DISPLAY } from '../../actions/types'

class CalendarHeader extends Component{
  render(){
    const { weekCalendar, week, day, dispatch } = this.props
    const now = new Date()
    const addTime = now.setDate(now.getDate() + day)
    const selectedTime = new Date(addTime)
    const calendarType = (weekCalendar === true) ? 'week': 'day'
    return (
      <div id="calendarHeader">
        <h2>Calendar</h2>
        <i className={(weekCalendar === true) ? "material-icons": "material-icons calendarSelected"}
           onClick={ () => { dispatch({ type: DISPLAY, payload: { key: 'weekCalendar', value: false } })}}>
           view_week
        </i>
        <i className={(weekCalendar === true) ? "material-icons calendarSelected": "material-icons"}
           onClick={ () => { dispatch({ type: DISPLAY, payload: { key: 'weekCalendar', value: true } })}}>
           view_module
        </i>
        <div id="weeks">
          <i className="material-icons"
             onClick={() => dispatch({ type: DISPLAY, payload: { key: calendarType, value: this.props[calendarType] - 1 } }) }>
             chevron_left
          </i>
          <div id="week">
            {days[selectedTime.getDay()]}
            {' '+'-'+' '}
            {selectedTime.getMonth()+'.'+selectedTime.getDate()+'.'+selectedTime.getYear()}
          </div>
          <i className="material-icons"
             onClick={() => dispatch({ type: DISPLAY, payload: { key: calendarType, value: this.props[calendarType] + 1 }})}>
             chevron_right
          </i>
        </div>
        <div id="weekStats">
          <div className="weekStat"><div className="legend" id="you"></div> You</div>
          <div className="weekStat"><div className="legend" id="available"></div> Available</div>
          <div className="weekStat"><div className="legend" id="reserved"></div> Unavailable</div>
        </div>
      </div>
    )
  }
}
const mapStateToProps = ({ display: { weekCalendar, week, day } }) => {
  return { weekCalendar, week, day }
}
export default connect(mapStateToProps)(CalendarHeader)

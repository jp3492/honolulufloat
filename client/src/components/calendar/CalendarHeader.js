import React, { Component } from 'react'
import { connect } from 'react-redux'

import { days } from '../../general/static'
import { DISPLAY } from '../../actions/types'

class CalendarHeader extends Component{
  render(){
    const { weekCalendar, week, day, dispatch } = this.props
    let addTime, weekStart, weekEnd
    let timeSpan = {}
    const calendarType = (weekCalendar === true) ? 'week': 'day'
    const now = new Date()
    if (weekCalendar === true) {
      addTime = now.setDate(now.getDate() + (week * 7))
      addTime = new Date(addTime)
      const add =
      weekStart = addTime
      weekStart.setDate(addTime.getDate() - (addTime.getDay() - 1))
      weekStart = new Date(weekStart)
      weekEnd = addTime
      weekEnd.setDate(addTime.getDate() + (addTime.getDay() + 5))
      weekEnd = new Date(weekEnd)
      timeSpan.start = weekStart.getMonth()+'.'+weekStart.getDate()+'.'+weekStart.getFullYear()
      timeSpan.end = weekEnd.getMonth()+'.'+weekEnd.getDate()+'.'+weekEnd.getFullYear()
    } else {
      addTime = now.setDate(now.getDate() + day)
      addTime = new Date(addTime)
      timeSpan.start = days[addTime.getDay()]
      timeSpan.end = addTime.getMonth()+'.'+addTime.getDate()+'.'+addTime.getFullYear()
    }
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
            {timeSpan.start}
            {' '+'-'+' '}
            {timeSpan.end}
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

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { times, days } from '../../general/static'

import { DISPLAY } from '../../actions/types'

class Floats extends Component{
  slot(t, i, id){
    const { dispatch, week, day, weekCalendar } = this.props
    // i need date and time and user
    const time = 8 + id
    let date
    const now = new Date()
    const currentDay = now.getDay()
    if (weekCalendar === true) {
      date = now.setDate(now.getDate() + (week * 7) + i - 3)
      date = new Date(date)
    } else {
      date = now.setDate(now.getDate() + day)
      date = new Date(date)
    }
    return (
      <li id={i+time[0]} className="slot"
        onMouseEnter={ () => document.getElementById(t[0]).classList.add('timeSelected')}
        onMouseLeave={ () => document.getElementById(t[0]).classList.remove('timeSelected')}
        onClick={ () => {
          dispatch({ type: DISPLAY, payload: { key: 'modal', value: { dayName: days[date.getDay()-1], year: date.getFullYear(), month: date.getMonth(), day: date.getDate(), time } } })
        }} >
        {}
      </li>
    )
  }
  float(float, i){
    return (
      <ul className="float"
        onMouseEnter={ () => document.getElementById(float).classList.add('timeSelected')}
        onMouseLeave={ () => document.getElementById(float).classList.remove('timeSelected')}>
        <li id={float} className="floatHeader"><b>{float}</b></li>
        {times.map( (t, id) => { return this.slot(t, i, id) } )}
      </ul>
    )
  }
  render(){
    const { weekCalendar } = this.props
    const mapOver = (weekCalendar === true) ? days.slice(0, 6):['Tank 1', 'Tank 2']
    return (
      <div id="floats">
        {mapOver.map((f, i) => { return this.float(f, i) } )}
      </div>
    )
  }
}
const mapStateToProps = ({ data: { bookings }, display: { weekCalendar, week, day } }) => {
  return { bookings, weekCalendar, week, day }
}
export default connect(mapStateToProps)(Floats)

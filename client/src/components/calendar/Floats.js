import React, { Component } from 'react'
import { connect } from 'react-redux'
import { times, days, tanks } from '../../general/static'

import { DISPLAY } from '../../actions/types'

class Floats extends Component{
  slot(t, i, id){
    const { dispatch, week, day, weekCalendar, bookings } = this.props
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
    const hasBookings = bookings.filter( b => {
      const thisDate = new Date(b.date)
      return thisDate.getFullYear() === date.getFullYear() && thisDate.getMonth() === date.getMonth() && thisDate.getDate() === date.getDate() && thisDate.getHours() === time + 2
    })
    const isMe = hasBookings.filter( b => { return b.user !== undefined })
    let className
    if (weekCalendar === true) {
      className = (isMe.length > 0) ? 'slot me': (hasBookings.length === 2) ? 'slot unavailable': 'slot'
    } else {
      className = (isMe.length === 1 && i === 0) ? 'slot me': (hasBookings.length === tanks.length) ? 'slot unavailable': (i < hasBookings.length) ? 'slot unavailable': 'slot'
    }
    const classes = className.split(' ')
    return (
      <li className={className} key={i+t[0]} id={i+t[0]}
        onMouseEnter={ () => document.getElementById(t[0]).classList.add('timeSelected')}
        onMouseLeave={ () => document.getElementById(t[0]).classList.remove('timeSelected')}
        onClick={
          (classes.includes('me') === true && classes.includes('unavailable') === false) ?
          () => alert('You already booked a session for selected time and date'):
          (classes.includes('me') === false && classes.includes('unavailable') === true) ?
          () => alert('No available slots for selected time and date. Please select other slot!'):
          (weekCalendar === false && isMe.length !== 0 && hasBookings.length < tanks.length) ?
          () => alert('You already booked a session for selected time and date'):
          () => { dispatch({ type: DISPLAY, payload: { key: 'modal', booking: true, value: { dayName: days[date.getDay()-1], year: date.getFullYear(), month: date.getMonth(), day: date.getDate(), time } } }) }
        }>
        {}
      </li>
    )
  }
  float(float, i){
    return (
      <ul key={'ul'+float} className="float"
        onMouseEnter={ () => document.getElementById(float).classList.add('timeSelected')}
        onMouseLeave={ () => document.getElementById(float).classList.remove('timeSelected')}>
        <li key={float} id={float} className="floatHeader"><b>{float}</b></li>
        {times.map( (t, id) => { return this.slot(t, i, id) } )}
      </ul>
    )
  }
  render(){
    const { weekCalendar } = this.props
    const mapOver = (weekCalendar === true) ? days.slice(0, 6): tanks
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

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { days } from '../../general/static'

import { DISPLAY } from '../../actions/types'

class Upcoming extends Component{
  Appointment({ date, status, _id }){
    const { dispatch } = this.props
    const appClass = (status === 'reserved') ? 'appointment reservation': 'appointment'
    const newDate = new Date(date)
    const day = days[newDate.getDay()-1]
    const time = newDate.getHours() - 2
    const pmam = (time < 12) ? time+'am': time+'pm'
    return (
      <li className={appClass}>
        <a>{day}</a>
        <a>{pmam}</a>
        <a>{newDate.getDate()+'.'+newDate.getMonth()+'.'+newDate.getFullYear()}</a>
        <a></a>
        <a><div className="button" onClick={ () => {
          dispatch({ type: DISPLAY, payload: { key: 'modal', booking: false, value: { _id, dayName: day, year: newDate.getFullYear(), month: newDate.getMonth(), day: newDate.getDate(), time } } })
        }}>Cancel</div></a>
      </li>
    )
  }
  render(){
    const { bookings } = this.props
    const booked = bookings.filter( b => { return b.status === 'booked' })
    const mapOver = booked.slice(0, 6).sort((a, b) => { return new Date(a.date) - new Date(b.date) })
    return (
      <ul id="upcoming">
        {(booked.length === 0) ? <li id="noUpcoming">You have no upcoming Sessions...</li>:null }
        {mapOver.map( a => { return this.Appointment(a) } )}
        <li id="makeBooking">
          <a>{(booked.length - mapOver.length > 0) ? 'You have'+' '+(bookings.length - mapOver.length)+' '+'further upcoming sessions...' : null}</a>
          <Link style={{ textDecoration: 'none' }} to="/calendar">
            <a>Book a Session</a>
          </Link>
        </li>
      </ul>
    )
  }
}
const mapStateToProps = ({ data: { bookings } }) => {
  return { bookings }
}
export default connect(mapStateToProps)(Upcoming)

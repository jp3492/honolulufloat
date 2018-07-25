import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import { DISPLAY } from '../../actions/types'

class Upcoming extends Component{
  Appointment({ day, date, time, status }){
    const appClass = (status === 'reserved') ? 'appointment reservation': 'appointment'
    return (
      <li className={appClass}>
        <a>{day}</a>
        <a>{date}</a>
        <a>{time}</a>
        <a>{status}</a>
        <a>{(status === 'reserved') ? "Expires in: 04:34h": null}</a>
        <a className="button">{(status === 'booked') ? 'Cancel': 'Book'}</a>
      </li>
    )
  }
  render(){
    const { bookings } = this.props
    return (
      <ul id="upcoming">
        <li id="appointmentHeader" className="appointment">
          <a>Day</a>
          <a>Date</a>
          <a>Time</a>
          <a>Status</a>
          <a>Infos</a>
          <a>Actions</a>
        </li>
        {(bookings.length === 0) ? <li id="noUpcoming">You have no upcoming Sessions...</li>:null }
        {bookings.map( a => { return this.Appointment(a) } )}
        <li id="makeBooking"><Link style={{ textDecoration: 'none' }} to="/calendar"><a>Book a Session</a></Link></li>
      </ul>
    )
  }
}
const mapStateToProps = ({ data: { bookings } }) => {
  return { bookings }
}
export default connect(mapStateToProps)(Upcoming)

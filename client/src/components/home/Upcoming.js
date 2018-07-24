import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

const Appointment = ({ day, date, time, status }) => {
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

class Upcoming extends Component{
  render(){
    const appointments = [
      { date: "12.8.2018", time: '8am', day: 'Monday', status: "booked" },
      { date: "15.8.2018", time: '12pm', day: 'Friday', status: "reserved" },
      { date: "21.8.2018", time: '3pm', day: 'Tuesday', status: "booked" }
    ]
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
        {appointments.map( a => { return Appointment(a) } )}
        <li id="makeBooking"><a>Make Booking</a></li>
      </ul>
    )
  }
}
export default Upcoming

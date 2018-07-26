import React, { Component } from 'react'
import { connect } from 'react-redux'
import { times } from '../../general/static'

const time = time => {
  return (
    <li key={time[0]} id={time[0]} className="time">
      <b>{time[0]}</b>
      <b>-</b>
      <b>{time[1]}</b>
    </li>
  )
}

class Times extends Component{
  render(){
    return (
      <ul id="times">
        <li id="timeHeader"><b>Times</b></li>
        {times.map( t => { return time(t)})}
      </ul>
    )
  }
}
export default Times

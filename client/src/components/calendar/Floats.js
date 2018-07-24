import React, { Component } from 'react'
import { connect } from 'react-redux'
import { times } from '../../general/static'

const slot = (time, i) => {
  return (
    <li id={i+time[0]} className="slot"
      onMouseEnter={ () => document.getElementById(time[0]).classList.add('timeSelected')}
      onMouseLeave={ () => document.getElementById(time[0]).classList.remove('timeSelected')} >
    </li>
  )
}

const float = (float, i) => {
  return (
    <ul className="float">
      <li className="floatHeader"><b>{float}</b></li>
      {times.map( t => { return slot(t, i) } )}
    </ul>
  )
}

class Floats extends Component{
  render(){
    const floats = ['Tank 1', 'Tank 2']
    return (
      <div id="floats">
        {floats.map((f, i) => { return float(f, i) } )}
      </div>
    )
  }
}
export default Floats

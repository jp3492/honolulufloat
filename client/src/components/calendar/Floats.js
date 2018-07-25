import React, { Component } from 'react'
import { connect } from 'react-redux'
import { times } from '../../general/static'

import { DISPLAY } from '../../actions/types'

class Floats extends Component{
  slot(time, i){
    const { dispatch } = this.props
    return (
      <li id={i+time[0]} className="slot"
        onMouseEnter={ () => document.getElementById(time[0]).classList.add('timeSelected')}
        onMouseLeave={ () => document.getElementById(time[0]).classList.remove('timeSelected')}
        onClick={ () => dispatch({ type: DISPLAY, payload: { key: 'modal' } })} >
      </li>
    )
  }
  float(float, i){
    return (
      <ul className="float">
        <li className="floatHeader"><b>{float}</b></li>
        {times.map( t => { return this.slot(t, i) } )}
      </ul>
    )
  }
  render(){
    const floats = ['Tank 1', 'Tank 2']
    return (
      <div id="floats">
        {floats.map((f, i) => { return this.float(f, i) } )}
      </div>
    )
  }
}
const mapStateToProps = ({ data: { bookings } }) => {
  return { bookings }
}
export default connect(mapStateToProps)(Floats)

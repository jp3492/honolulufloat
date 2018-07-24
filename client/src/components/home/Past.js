import React, { Component } from 'react'
import { connect } from 'react-redux'

class Past extends Component{
  render(){
    return (
      <div id="past">
        <div>
          Sessions had: 8
        </div>
        <div>
          Overall Satisfaction: 78%
        </div>
        <div>
          Friends: 6
        </div>
        <div>
          View Activity: 34
        </div>
      </div>
    )
  }
}
export default Past

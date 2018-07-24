import React, { Component } from 'react'
import { connect } from 'react-redux'

class Welcome extends Component{
  render(){
    return (
      <div id="welcome">
        <h3>Welcome to our Sensory Deprivation Tank Studio</h3>
        <div>
          What is Sensory Deprivation?
        </div>
        <div>
          Our Clients
        </div>
      </div>
    )
  }
}
export default Welcome

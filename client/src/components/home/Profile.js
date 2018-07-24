import React, { Component } from 'react'
import { connect } from 'react-redux'

const Info = info => {
  return (
    <li className="info">
      <a>{info[0]}</a>
      <a>{info[1]}</a>
    </li>
  )
}
class Profile extends Component{
  render(){
    return (
      <div id="profile">
        <div id="profileHeader">
          <h3>Ryan Leung</h3>
          <i className="material-icons">edit</i>
        </div>
        <div id="picture">
          <img src="https://www.cambrex.com/wp-content/themes/cambrex/images/placeholder-profile.jpg" />
        </div>
        <h3>Contact Information</h3>
        <ul id="infos">
          {[['Email:', 'ryan@honolulufloat.com'],['Home:', '8084653342'], ['Mobile:', '8087763562']].map( i => { return Info(i) } )}
        </ul>
      </div>
    )
  }
}
export default Profile

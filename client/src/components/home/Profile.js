import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { updateProfile } from '../../actions'
import { DISPLAY, EDIT } from '../../actions/types'

class Profile extends Component{
  renderInfo(info){
    const { edit, editUser, user, dispatch } = this.props
    const type = (info === 'phone') ? 'number': 'text'
    const key = () => {
      switch (info) {
        case 'firstName': return 'First Name:'
        case 'lastName': return 'Last Name:'
        case 'email': return 'Email:'
        case 'phone': return 'Phone:'
      }
    }
    const infoField = (edit === false) ?
      <a>{user[info]}</a>:
      <input type={type} value={editUser[info]}
        onChange={ e => { dispatch({ type: EDIT, payload: { type: 'user', key: info, value: e.target.value } }) } } />
    return (
      <li id={info} className="info">
        <a>{key(info)}</a>
        {infoField}
      </li>
    )
  }
  edit(){
    const { edit, action: { updateProfile }, editUser, dispatch } = this.props
    if (edit === true) {
      updateProfile(editUser)
      return dispatch({ type: DISPLAY, payload: 'edit' })
    }
    return dispatch({ type: DISPLAY, payload: 'edit' })
  }
  render(){
    const { user, edit } = this.props
    const infos = ['firstName', 'lastName', 'email', 'phone']
    const header = (user.firstName && user.lastName) ? user.firstName+" "+user.lastName: 'Please add Profile information   - - >'
    const iconClass = (edit === true) ? 'material-icons editActive': 'material-icons'
    return (
      <div id="profile">
        <div id="profileHeader">
          <h3>{header}</h3>
          <i className={iconClass} onClick={ () => this.edit() }>{(edit === true) ? 'check': 'edit'}</i>
        </div>
        <div id="picture">
          <img src="https://www.cambrex.com/wp-content/themes/cambrex/images/placeholder-profile.jpg" />
        </div>
        <h3>Contact Information</h3>
        <ul id="infos">
          {infos.map( i => { return this.renderInfo(i) })}
        </ul>
      </div>
    )
  }
}
const mapStateToProps = ({ display: { edit }, data: { user, editUser } }) => {
  return { edit, user, editUser }
}
const mapDispatchToProps = (dispatch) => {
  return { action: bindActionCreators({ updateProfile }, dispatch), dispatch };
}
export default connect(mapStateToProps, mapDispatchToProps)(Profile)

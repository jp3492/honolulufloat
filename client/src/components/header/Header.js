import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import Modal from '../modal/modal'

import { getUser } from '../../actions'

class Header extends Component {
  componentWillMount(){
    const { authenticated, action: { getUser } } = this.props
    if (authenticated !== false) {
      getUser()
    }
  }
  componentWillReceiveProps(nextProps){
    const { authenticated, action: { getUser } } = nextProps
    if (authenticated !== false) {
      getUser(authenticated)
    }
  }
  renderLinks() {
    if (this.props.authenticated) {
      return (
        <div id="menu">
          <Link style={{ textDecoration: 'none' }} to="/calendar">Calendar</Link>
          <Link style={{ textDecoration: 'none' }} to="/signout">Sign Out</Link>
        </div>
      )
    } else {
      return (
        <div id="menu">
          <Link style={{ textDecoration: 'none' }} to="/signup">Sign Up</Link>
          <Link style={{ textDecoration: 'none' }} to="/signin">Sign In</Link>
        </div>
      )
    }
  }

  render() {
    const { authenticated, modal } = this.props
    return (
      <div id="header">
        {(modal === true) ? <Modal makeBooking="true" />: null}
        <Link id="logo" style={{ textDecoration: 'none' }} to={(authenticated === false) ? '/': '/home'}><h3>Honolulu Float</h3></Link>
        {this.renderLinks()}
      </div>
    );
  }
}

const mapStateToProps = ({ auth: { authenticated }, display: { modal } }) => {
  return { authenticated, modal }
}
const mapDispatchToProps = (dispatch) => {
  return { action: bindActionCreators({ getUser }, dispatch), dispatch };
}
export default connect(mapStateToProps, mapDispatchToProps)(Header);

import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

class Header extends Component {
  renderLinks() {
    if (this.props.authenticated) {
      return (
        <div>
          <Link style={{ textDecoration: 'none' }} to="/calendar">Calendar</Link>
          <Link style={{ textDecoration: 'none' }} to="/signout">Sign Out</Link>
        </div>
      )
    } else {
      return (
        <div>
          <Link style={{ textDecoration: 'none' }} to="/signup">Sign Up</Link>
          <Link style={{ textDecoration: 'none' }} to="/signin">Sign In</Link>
        </div>
      )
    }
  }

  render() {
    const { authenticated } = this.props
    return (
      <div id="header">
        <Link style={{ textDecoration: 'none' }} to={(authenticated === false) ? '/': '/home'}><h3>Honolulu Float</h3></Link>
        {this.renderLinks()}
      </div>
    );
  }
}

const mapStateToProps = ({ auth: { authenticated } }) => {
  return { authenticated };
}

export default connect(mapStateToProps)(Header);

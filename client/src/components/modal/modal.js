import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { } from '../../actions'
import { DISPLAY } from '../../actions/types'

class Modal extends Component{
  render(){
    const { dispatch, makeBooking, terms } = this.props
    const header = (makeBooking === 'true') ? 'Book a Session': 'Edit Booking'
    return (
      <div id="modal">
        <div onClick={ () => dispatch({ type: DISPLAY, payload: { key: 'modal' } }) }></div>
        <div>
          <div id="modalHeader">
            <h3>{header}</h3>
          </div>
          <div id="modalBody">
            <div>Please review Date and Time prior to booking!</div>
            <div><a>Day:</a><a>Monday</a></div>
            <div><a>Date:</a><a>19.4.18</a></div>
            <div><a>Time:</a><a>3pm-4pm</a></div>
          </div>
          <div id="modalFooter">
            <div>
              <i className="material-icons">{(terms === true) ? 'check_box' :'check_box_outline_blank'}</i>
              <a onClick={ () => dispatch({ type: DISPLAY, payload: 'terms' }) }>I accept the Terms and Condition</a>
            </div>
            <a>Book</a>
          </div>
        </div>
      </div>
    )
  }
}
const mapStateToProps = ({ display: { terms } }) => {
  return { terms }
}
// const mapDispatchToProps = (dispatch) => {
//   return { action: bindActionCreators({ }, dispatch), dispatch };
// }
export default connect(mapStateToProps)(Modal)

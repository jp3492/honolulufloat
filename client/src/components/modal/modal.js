import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { } from '../../actions'
import { DISPLAY } from '../../actions/types'

class Modal extends Component{
  render(){
    const { dispatch, makeBooking, terms, bookingInfo: { dayName, day, month, year, time } } = this.props
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
            <div><a>Day:</a><a>{dayName}</a></div>
            <div><a>Date:</a><a>{day+'.'+month+'.'+year}</a></div>
            <div><a>Time:</a><a>{time}</a></div>
          </div>
          <div id="modalFooter">
            <div>
              <i className="material-icons">{(terms === true) ? 'check_box' :'check_box_outline_blank'}</i>
              <a onClick={ () => dispatch({ type: DISPLAY, payload: { key: 'terms' } }) }>I accept the Terms and Condition</a>
            </div>
            <a>Book</a>
          </div>
        </div>
      </div>
    )
  }
}
const mapStateToProps = ({ display: { terms, bookingInfo } }) => {
  return { terms, bookingInfo }
}
// const mapDispatchToProps = (dispatch) => {
//   return { action: bindActionCreators({ }, dispatch), dispatch };
// }
export default connect(mapStateToProps)(Modal)

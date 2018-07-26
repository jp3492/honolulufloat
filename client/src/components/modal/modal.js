import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { book, cancel } from '../../actions'
import { DISPLAY } from '../../actions/types'

class Modal extends Component{
  render(){
    const { dispatch, makeBooking, terms, bookingInfo: { dayName, day, month, year, time, _id }, action: { book, cancel }, booking } = this.props
    const header = (booking === true) ? 'Book a Session': 'Cancel Booking'
    const appTime = (time < 12) ? time+'am': (time === 12) ? '12pm': (time - 12)+'pm'
    return (
      <div id="modal">
        <div onClick={ () => dispatch({ type: DISPLAY, payload: { key: 'modal' } }) }></div>
        <div>
          <div id="modalHeader">
            <h3>{header}</h3>
          </div>
          <div id="modalBody">
            <div>Please review Information prior {(booking === true) ? 'booking': 'cancellation'}!</div>
            <div><a>Day:</a><a>{dayName}</a></div>
            <div><a>Date:</a><a>{day+'.'+month+'.'+year}</a></div>
            <div><a>Time:</a><a>{appTime}</a></div>
          </div>
          <div id="modalFooter">
            <div>
              <i className="material-icons">{(terms === true) ? 'check_box' :'check_box_outline_blank'}</i>
              <a onClick={ () => dispatch({ type: DISPLAY, payload: { key: 'terms' } }) }>I accept the Terms and Condition</a>
            </div>
            <a className={(booking === true) ? '': 'cancellation'} onClick={ (terms === false) ? null:
              (booking === true) ?
              () => {
                book({ date: new Date(year, month, day, time + 2, 0, 0, 0) }, () => {
                  dispatch({ type: DISPLAY, payload: { key: 'modal' } })
                })
              }:
              () => {
                cancel(_id, () => {
                  dispatch({ type: DISPLAY, payload: { key: 'modal' } })
                })                
              }
            }>{(booking === true) ? 'Book': 'Cancel'}</a>
          </div>
        </div>
      </div>
    )
  }
}
const mapStateToProps = ({ display: { terms, bookingInfo, booking } }) => {
  return { terms, bookingInfo, booking }
}
const mapDispatchToProps = (dispatch) => {
  return { action: bindActionCreators({ book, cancel }, dispatch), dispatch };
}
export default connect(mapStateToProps, mapDispatchToProps)(Modal)

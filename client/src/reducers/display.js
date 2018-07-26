import { DISPLAY, AUTH_USER, NAVIGATION } from '../actions/types'

const INITIAL_STATE = {
  edit: false,
  modal: false,
  booking: true,
  terms: false,
  day: 0,
  week: 0,
  weekCalendar: true,
  bookingInfo: {}
}

export default function(state = INITIAL_STATE, action) {
  const { payload, type } = action
  switch (type) {
    case NAVIGATION:
      return INITIAL_STATE
    case AUTH_USER:
      if (payload === false) {
        return INITIAL_STATE
      }
      return state
    case DISPLAY:
      if (payload.key === 'modal' && state.modal === false) {
        return { ...state, bookingInfo: payload.value, modal: true, booking: payload.booking }
      }
      if (payload.key === 'modal' && state.modal === true) {
        return { ...state, modal: false, terms: false }
      }
      if (payload.value === undefined) {
        return { ...state, [payload.key]: !state[payload.key] }
      }
      return { ...state, [payload.key]: payload.value }
    default:
      return state;
  }
}

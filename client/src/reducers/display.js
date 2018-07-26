import { DISPLAY } from '../actions/types'

const INITIAL_STATE = {
  edit: false,
  modal: false,
  terms: false,
  day: 0,
  week: 0,
  weekCalendar: false,
  bookingInfo: {}
}

export default function(state = INITIAL_STATE, action) {
  const { payload, type } = action
  switch (type) {
    case DISPLAY:
      if (payload.key === 'modal' && state.modal === false) {
        return { ...state, bookingInfo: payload.value, modal: true }
      }
      if (payload.value === undefined) {
        return { ...state, [payload.key]: !state[payload.key] }
      }
      if (payload.key === 'modal' && state.modal === true) {
        return { ...state, modal: false, terms: false }
      }
      return { ...state, [payload.key]: payload.value }
    default:
      return state;
  }
}

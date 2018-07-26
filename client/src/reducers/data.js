import { GET_USER, DISPLAY, EDIT, BOOKED, UPDATE_USER, CANCELLED, AUTH_USER } from '../actions/types'

const INITIAL_STATE = {
  user: { firstName: '', lastName: '', email: '', home: null, mobile: null },
  editUser: null,
  bookings: []
}

export default function(state = INITIAL_STATE, action) {
  const { payload, type } = action
  switch (type) {
    case CANCELLED:
      return { ...state, bookings: state.bookings.filter( b => { return b.user === undefined || (b._id && b._id.toString() !== payload.toString()) }) }
    case BOOKED:
      console.log(payload);
      let newBookings = state.bookings
      newBookings.push(typeof payload)
      return { ...state, bookings: [ ...state.bookings, payload ] }
    case EDIT:
      if (payload.type === 'user') {
        return { ...state, editUser: { ...state.editUser, [payload.key]: payload.value } }
      }
      return state
    case DISPLAY:
      if (payload.key === 'edit' && state.editUser === null) {
        return { ...state, editUser: state.user }
      } else {
        return { ...state, editUser: null }
      }
    case UPDATE_USER:
      return { ...state, user: { _id: payload._id, email: payload.email, firstName: (payload.firstName) ? payload.firstName: '', lastName: (payload.lastName) ? payload.lastName: '', phone: (payload.phone) ? payload.phone: '' } }
    case AUTH_USER:
      if (payload === false) {
        return INITIAL_STATE
      }
      return state
    case GET_USER:
      return { ...state, bookings: payload.bookings, user: { _id: payload._id, email: payload.email, firstName: (payload.firstName) ? payload.firstName: '', lastName: (payload.lastName) ? payload.lastName: '', phone: (payload.phone) ? payload.phone: '' } }
    default:
      return state
  }
}

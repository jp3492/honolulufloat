import { GET_USER, DISPLAY, EDIT } from '../actions/types'

const INITIAL_STATE = {
  user: { firstName: '', lastName: '', email: '', home: null, mobile: null },
  editUser: null,
  bookings: []
}

export default function(state = INITIAL_STATE, action) {
  const { payload, type } = action
  switch (type) {
    case EDIT:
      if (payload.type === 'user') {
        return { ...state, editUser: { ...state.editUser, [payload.key]: payload.value } }
      }
      return state
    case DISPLAY:
      if (payload === 'edit' && state.editUser === null) {
        return { ...state, editUser: state.user }
      } else {
        return { ...state, editUser: null }
      }
    case GET_USER:
      return { ...state, user: { _id: payload._id, email: payload.email, firstName: (payload.firstName) ? payload.firstName: '', lastName: (payload.lastName) ? payload.lastName: '', phone: (payload.phone) ? payload.phone: '' } }
    default:
      return state
  }
}

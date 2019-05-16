import { INITIAL_STATE } from './InitialState'
import { createReducer } from 'reduxsauce'
import { AuthTypes } from './Actions'

const setUser = (state, { user }) => state.set('userData', user)

const clearUser = state => state.set('userData', null)

const reducer = createReducer(INITIAL_STATE, {
  [AuthTypes.SET_USER]: setUser,
  [AuthTypes.CLEAR_USER]: clearUser,
  // Clear user when logout success
  [AuthTypes.LOGOUT_SUCCESS]: clearUser,
})

export default reducer

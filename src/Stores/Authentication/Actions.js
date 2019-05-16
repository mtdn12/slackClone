import { createActions } from 'reduxsauce'
import { MODULE_NAME } from './InitialState'

const { Types, Creators } = createActions(
  {
    registerRequest: ['values'],
    registerSuccess: null,
    registerFailure: null,
    // Login
    loginRequest: ['values'],
    loginSuccess: ['item'],
    loginFailure: null,
    // Logout:
    logoutRequest: null,
    logoutSuccess: null,
    logoutFailure: null,
    // set and clear user
    setUser: ['user'],
    clearUser: null,
  },
  {
    prefix: `@@${MODULE_NAME}/`,
  }
)

export const AuthTypes = Types
export const AuthActions = Creators

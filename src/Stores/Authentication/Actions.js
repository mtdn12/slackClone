import { MODULE_NAME } from './InitialState'

const SET_USER = `@@${MODULE_NAME}/SET_USER`

const CLEAR_USER = `@@${MODULE_NAME}/CLEAR_USER`

// Actions creator
export const setUser = user => ({
  type: SET_USER,
  user,
})

export const clearUser = () => ({
  type: CLEAR_USER,
})

export const actionsHandler = {
  [SET_USER]: (state, action) => ({
    ...state,
    userData: action.user,
    isCheckAuthen: false,
  }),
  [CLEAR_USER]: state => ({
    ...state,
    userData: null,
  }),
}

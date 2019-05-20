import { MODULE_NAME } from './InitialState'
// Actions
const SHOW_NOTIFICATION = `@@${MODULE_NAME}/SHOW_NOTIFICATION`
const HIDE_NOTIFICATION = `@${MODULE_NAME}/HIDE_NOTIFICATION`

// Action creator

export const showNotification = (title, message, color) => ({
  type: SHOW_NOTIFICATION,
  title,
  message,
  color,
})

export const hideNotification = () => ({
  type: HIDE_NOTIFICATION,
})

// Controler

export const actionsHandler = {
  [SHOW_NOTIFICATION]: (state, action) => ({
    ...state,
    title: action.title,
    message: action.message,
    color: action.color,
    open: true,
  }),
  [HIDE_NOTIFICATION]: (state, action, initialState) => initialState,
}

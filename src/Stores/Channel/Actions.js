import { MODULE_NAME } from './InitialState'

const SET_CURRENT_CHANNEL = `@@${MODULE_NAME}/SET_CURRENT_CHANNEL`
const CLEAR_CURRENT_CHANNEL = `@@${MODULE_NAME}/CLEAR_CURRENT_CHANNEL`

// action creator
export const setCurrentChannel = channel => ({
  type: SET_CURRENT_CHANNEL,
  channel,
})

// Clear current channel
export const clearCurrentChannel = () => ({
  type: CLEAR_CURRENT_CHANNEL,
})

export const actionsHandler = {
  [SET_CURRENT_CHANNEL]: (state, { channel }) => ({
    ...state,
    currentChannel: channel,
  }),
  [CLEAR_CURRENT_CHANNEL]: state => ({
    ...state,
    currentChannel: null,
  }),
}

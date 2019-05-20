import { INITIAL_STATE } from './InitialState'
import { actionsHandler } from './Actions'

const reducer = (state = INITIAL_STATE, action) => {
  return actionsHandler[action.type]
    ? actionsHandler[action.type](state, action, INITIAL_STATE)
    : state
}

export default reducer

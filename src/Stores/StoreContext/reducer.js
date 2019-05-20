import notificationReducer from '../Notification/Reducers'
import authReducer from '../Authentication/Reducers'
import loadingReducer from '../Loading/Reducers'
import modalReducer from '../Modal/Reducers'
import channelReducer from '../Channel/Reducers'
import { combineReducers } from './CombineReducer'

const rootReducer = combineReducers({
  notification: notificationReducer,
  loading: loadingReducer,
  auth: authReducer,
  modal: modalReducer,
  channel: channelReducer,
})

export default rootReducer

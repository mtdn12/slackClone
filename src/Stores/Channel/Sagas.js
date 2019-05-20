import { put, call, takeLatest, select, all } from 'redux-saga/effects'
import { ChannelActions, ChannelTypes } from 'src/Stores/Channel/Actions'
import { NotificationActions } from 'src/Stores/Notification/Actions'
import { ModalActions } from '../Modal/Actions'
import { ChannelSelectors } from './Selectors'
import { AuthSelectors } from '../Authentication/Selectors'
import firebase from '../Firebase'
import { LoadingActions } from '../Loading/Actions'
import { push } from 'connected-react-router'
import sagaRegistry from '../Sagas/SagaRegistry'
import { MODULE_NAME } from './InitialState'

function* createChannelWorker({ values }) {
  try {
    yield put(LoadingActions.showLoadingAction())
    yield firebase.doCreateChannel(values)
    // Success
    yield put(ChannelActions.createChannelSuccess())
    yield put(
      NotificationActions.showNotification(
        'Create Channel',
        'Create channel success',
        'blue'
      )
    )
    yield put(ModalActions.clearModal())
    yield put(LoadingActions.hideLoadingAction())
  } catch (error) {
    console.log(error)
    yield put(ChannelActions.createChannelFailure())
    yield put(
      NotificationActions.showNotification(
        'Create Channel',
        error.message,
        'red'
      )
    )
    yield put(LoadingActions.hideLoadingAction())
  }
}

function* createMessageWorker({ values, callback }){
  try {
    yield put(LoadingActions.showLoadingAction())
    const channel = yield select(ChannelSelectors.getCurrentChannel)
    const user = yield select(AuthSelectors.getUser)
    const data = {
      ...values,
      user,
      channel: channel.toJS(),
    }
    yield firebase.doCreateMessage(data)
    yield put(ChannelActions.createMessageSuccess())
    yield put(LoadingActions.hideLoadingAction())
    // call back clear message in input
    callback('')
  } catch (error) {
    yield put(ChannelActions.createMessageFailure())
    yield put(
      NotificationActions.showNotification(
        'Create Message',
        error.message,
        'red'
      )
    )
    yield put(LoadingActions.hideLoadingAction())
  }
}

function* watcher() {
  yield all([
    takeLatest(ChannelTypes.CREATE_CHANNEL_REQUEST, createChannelWorker),
    takeLatest(ChannelTypes.CREATE_MESSAGE_REQUEST, createMessageWorker)
  ])
}
sagaRegistry.register(MODULE_NAME, watcher)

export default watcher

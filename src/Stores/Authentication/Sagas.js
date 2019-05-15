import { put, takeLatest, all } from 'redux-saga/effects'
import { push } from 'connected-react-router'
import { AuthActions, AuthTypes } from 'src/Stores/Authentication/Actions'
import { LoadingActions } from '../Loading/Actions'
import { NotificationActions } from '../Notification/Actions'
import firebase from '../Firebase'

function* registerWorker({ values }) {
  try {
    yield put(LoadingActions.showLoadingAction())
    const authUser = yield firebase.doCreateUserWithEmailAndPassword(
      values.email,
      values.password
    )
    yield authUser.user.updateProfile({
      displayname: values.name,
    })
    yield put(AuthActions.registerSuccess())
    yield put(push('/login'))
    yield put(
      NotificationActions.showNotification(
        'Register',
        'Register Success',
        'blue'
      )
    )
    yield put(LoadingActions.hideLoadingAction())
  } catch (error) {
    yield put(AuthActions.registerFailure())
    yield put(LoadingActions.hideLoadingAction())
  }
}

export default function* watcher() {
  yield all([takeLatest(AuthTypes.REGISTER_REQUEST, registerWorker)])
}

import { put, takeLatest, all } from 'redux-saga/effects'
import { push } from 'connected-react-router'
import { AuthActions, AuthTypes } from 'src/Stores/Authentication/Actions'
import { LoadingActions } from '../Loading/Actions'
import { NotificationActions } from '../Notification/Actions'
import firebase from '../Firebase'
import md5 from 'md5'

function* registerWorker({ values }) {
  try {
    yield put(LoadingActions.showLoadingAction())
    const authUser = yield firebase.doCreateUserWithEmailAndPassword(
      values.email,
      values.password
    )
    // Update user profile with display name and photoURL
    yield authUser.user.updateProfile({
      displayName: values.userName,
      photoURL: `http://gravatar.com/avatar/${md5(
        authUser.user.email
      )}?d=identicon`,
    })
    // Save user to firebase database
    yield firebase.doSaveUserToDatabase(authUser.user)
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
    yield put(
      NotificationActions.showNotification('Login', error.message, 'red')
    )
  }
}

function* loginWorker({ values }) {
  try {
    yield put(LoadingActions.showLoadingAction())
    const authUser = yield firebase.doSignInWithEmailAndPassword(
      values.email,
      values.password
    )

    yield put(AuthActions.loginSuccess())
    yield put(
      NotificationActions.showNotification(
        'Register',
        'Register Success',
        'blue'
      )
    )
    yield put(LoadingActions.hideLoadingAction())
  } catch (error) {
    // console.log(error)
    yield put(AuthActions.loginFailure())
    yield put(LoadingActions.hideLoadingAction())
    yield put(
      NotificationActions.showNotification('Register', error.message, 'red')
    )
  }
}

export default function* watcher() {
  yield all([
    takeLatest(AuthTypes.REGISTER_REQUEST, registerWorker),
    takeLatest(AuthTypes.LOGIN_REQUEST, loginWorker),
  ])
}

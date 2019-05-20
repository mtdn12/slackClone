import React, { useEffect, useContext, useState } from 'react'
import { Route, Switch } from 'react-router-dom'
import ErrorBoundary from './pages/ErrorBoundary'
import * as asyncComponents from './asyncComponents'
import PrivateRoute from './organisms/PrivateRoute'
import Routes from '../Constants/Routes'
import Modal from './organisms/ModalManager'
import Notification from './organisms/Notification'
import LoadingCheckAuthen from '../Components/pages/LoadingCheckAuthen'
import { setUser, clearUser } from '../Stores/Authentication/Actions'
import { setCurrentChannel } from '../Stores/Channel/Actions'
import { StoreContext } from '../Stores/StoreContext'
import { FirebaseContext } from '../Stores/Firebase'

const App = () => {
  const [state, dispatch] = useContext(StoreContext)
  useEffect(() => {
    dispatch({ type: '@@Init' })
  }, [dispatch])
  const firebase = useContext(FirebaseContext)
  // add event listener Check authentication
  useEffect(() => {
    const listener = firebase.onAuthUserListener(auth =>
      dispatch(setUser(auth))
    )
    return () => {
      dispatch(clearUser())
      listener()
    }
  }, [])
  // Get the first child in list channels and set it to current channel
  useEffect(() => {
    firebase.channelRef.limitToFirst(1).once('value', snap => {
      dispatch(setCurrentChannel(Object.values(snap.val())[0]))
    })
    return () => {
      firebase.channelRef.off()
    }
  }, [])
  return (
    <ErrorBoundary>
      {!state.auth && <LoadingCheckAuthen />}
      {state.auth && state.auth.isCheckAuthen && <LoadingCheckAuthen />}
      {state.auth && !state.auth.isCheckAuthen && (
        <React.Fragment>
          <Switch>
            <Route
              path={Routes.LOG_IN}
              component={asyncComponents.AsyncLogin}
            />
            <Route
              path={Routes.REGISTER}
              component={asyncComponents.AsyncRegister}
            />
            <PrivateRoute
              path={Routes.HOMEPAGE}
              component={asyncComponents.AsyncHomePage}
            />
            <Route component={asyncComponents.AsyncNotFound} />
          </Switch>
          <Modal />
          <Notification />
        </React.Fragment>
      )}
    </ErrorBoundary>
  )
}

export default App

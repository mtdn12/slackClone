import React, { useEffect, useContext } from 'react'
import { func } from 'prop-types'
import { connect } from 'react-redux'
import { AuthActions } from '../Stores/Authentication/Actions'
import { FirebaseContext } from '../Stores/Firebase'

import App from '../Components/App'

const AppContainer = ({ setAuthUser, clearAuthUser }) => {
  const firebase = useContext(FirebaseContext)
  useEffect(() => {
    const listener = firebase.onAuthUserListener(
      auth => setAuthUser(auth),
      () => clearAuthUser
    )
    return () => {
      clearAuthUser()
      listener()
    }
  }, [setAuthUser, clearAuthUser, firebase])
  return <App />
}

const mapStateToProps = state => ({})

const mapDispatchToProps = dispatch => ({
  setAuthUser: user => dispatch(AuthActions.setUser(user)),
  clearAuthUser: () => dispatch(AuthActions.clearUser()),
})

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
)

AppContainer.propTypes = {
  setAuthUser: func.isRequired,
  clearAuthUser: func.isRequired,
}

export default withConnect(AppContainer)

import React from 'react'

import { connect } from 'react-redux'
import { object, func, bool, any } from 'prop-types'

import LoginPage from '../Components/pages/Login'
import { AuthSelectors } from '../Stores/Authentication/Selectors'
import { AuthActions } from '../Stores/Authentication/Actions'
import { LoadingSelectors } from '../Stores/Loading/Selectors'

const LoginPageContainer = ({
  loginItem,
  doLogin,
  isLoadingAction,
  history,
  auth,
}) => {
  if (auth){
    history.push('/')
  }
  return (
    <LoginPage
      doLogin={doLogin}
      loginItem={loginItem}
      isLoadingAction={isLoadingAction}
    />
  )
}

const mapStateToProps = state => ({
  loginItem: AuthSelectors.getLoginItem(state),
  isLoadingAction: LoadingSelectors.getLoadingAction(state),
  auth: AuthSelectors.getUser(state),
})

const mapDispatchToProps = dispatch => ({
  doLogin: values => dispatch(AuthActions.loginRequest(values)),
})

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
)

LoginPageContainer.propTypes = {
  loginItem: object.isRequired,
  doLogin: func.isRequired,
  isLoadingAction: bool.isRequired,
  history: object.isRequired,
  auth: any,
}

export default withConnect(LoginPageContainer)

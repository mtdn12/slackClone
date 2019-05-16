import React from 'react'
import { connect } from 'react-redux'
import { object, func, bool } from 'prop-types'

import LoginPage from '../Components/pages/Login'
import { AuthSelectors } from '../Stores/Authentication/Selectors'
import { AuthActions } from '../Stores/Authentication/Actions'
import { LoadingSelectors } from '../Stores/Loading/Selectors'

const LoginPageContainer = ({ loginItem, doLogin, isLoadingAction }) => {
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
}

export default withConnect(LoginPageContainer)

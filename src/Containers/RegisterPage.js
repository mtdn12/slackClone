import React from 'react'
import { connect } from 'react-redux'
import { object, func, bool } from 'prop-types'

import RegisterPage from '../Components/pages/Register'
import { AuthSelectors } from '../Stores/Authentication/Selectors'
import { AuthActions } from '../Stores/Authentication/Actions'
import { LoadingSelectors } from '../Stores/Loading/Selectors'

const RegisterPageContainer = ({
  registerItem,
  doRegister,
  isLoadingAction,
}) => {
  return (
    <RegisterPage
      doRegister={doRegister}
      registerItem={registerItem}
      isLoadingAction={isLoadingAction}
    />
  )
}

const mapStateToProps = state => ({
  registerItem: AuthSelectors.getRegisterItem(state),
  isLoadingAction: LoadingSelectors.getLoadingAction(state),
})

const mapDispatchToProps = dispatch => ({
  doRegister: values => dispatch(AuthActions.registerRequest(values))
})

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
)

RegisterPageContainer.propTypes = {
  registerItem: object.isRequired,
  doRegister: func.isRequired,
  isLoadingAction: bool.isRequired,
}

export default withConnect(RegisterPageContainer)

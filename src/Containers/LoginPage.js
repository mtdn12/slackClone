import React from 'react'
import { connect } from 'react-redux'

import LoginPage from '../Components/pages/Login'

const LoginPageContainer = ({ ...props }) => {
  return <LoginPage {...props} />
}

const mapStateToProps = state => ({})

const mapDispatchToProps = dispatch => ({})

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
)

export default withConnect(LoginPageContainer)

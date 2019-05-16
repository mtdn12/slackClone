import React from 'react'
import { func, object } from 'prop-types'
import { connect } from 'react-redux'
import { AuthActions } from '../Stores/Authentication/Actions'
import { AuthSelectors } from '../Stores/Authentication/Selectors'
import SidePanel from '../Components/organisms/SidePanel'

const SidePanelContainer = ({ doLogout, user }) => {
  return <SidePanel user={user} doLogout={doLogout} />
}

const mapStateToProps = state => ({
  user: AuthSelectors.getUser(state),
})

const mapDispatchToProps = dispatch => ({
  doLogout: () => dispatch(AuthActions.logoutRequest()),
})

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
)

SidePanelContainer.propTypes = {
  doLogout: func.isRequired,
  user: object.isRequired,
}

export default withConnect(SidePanelContainer)

import React from 'react'
import { func, object } from 'prop-types'
import { connect } from 'react-redux'
import { AuthActions } from '../Stores/Authentication/Actions'
import { AuthSelectors } from '../Stores/Authentication/Selectors'
import { ModalActions } from '../Stores/Modal/Actions'
import SidePanel from '../Components/organisms/SidePanel'

const SidePanelContainer = ({ doLogout, user, setModal }) => {
  const handleCreateChanel = () => {
    const item ={
      chanelName: '',
      chanelDetails: '',
    }
    setModal('CreateChanelModal', {
      item,
    })
  }
  return (
    <SidePanel
      user={user}
      doLogout={doLogout}
      handleCreateChanel={handleCreateChanel}
    />
  )
}

const mapStateToProps = state => ({
  user: AuthSelectors.getUser(state),
})

const mapDispatchToProps = dispatch => ({
  doLogout: () => dispatch(AuthActions.logoutRequest()),
  // Set modal
  setModal: (type, props) => dispatch(ModalActions.setModal(type, props)),
})

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
)

SidePanelContainer.propTypes = {
  doLogout: func.isRequired,
  user: object.isRequired,
  setModal: func.isRequired,
}

export default withConnect(SidePanelContainer)

import React, { useContext } from 'react'

import { clearModal } from '../../../Stores/Modal/Actions'

import { StoreContext } from '../../../Stores/StoreContext'

// Create Chanel modal
import CreateChannelModal from '../../molecules/CreateChannelModal'

const modalLookup = {
  CreateChannelModal,
}

const Modal = () => {
  const [state, dispatch] = useContext(StoreContext)
  const modal = state.modal.modal
  const isLoadingAction = state.loading.isLoadingAction
  const handleClose = () => dispatch(clearModal())
  console.log("Modal manager run")
  if (modal) {
    const { type, props } = modal
    const ModalShow = modalLookup[type]
    return (
      <ModalShow
        isLoadingAction={isLoadingAction}
        handleClose={handleClose}
        {...props}
      />
    )
  }
  return <span />
}
export default Modal

import React, { useContext, useState } from 'react'
import { TransitionablePortal, Message } from 'semantic-ui-react'
import { StoreContext } from '../../../Stores/StoreContext'
import { hideNotification } from '../../../Stores/Notification/Actions'
import styles from './styles.module.scss'

const Notification = () => {
  const [transition, _] = useState({
    animation: 'fade up',
    duration: 500,
  })
  const [state, dispatch] = useContext(StoreContext)
  const { title, color, open, message } = state.notification
  console.log(state.notification)
  const onClose = () => {
    dispatch(hideNotification())
  }
  console.log('Notification run')
  return (
    <TransitionablePortal
      closeOnTriggerClick
      open={open}
      transition={{ ...transition }}
      onClose={onClose}>
      <Message
        color={color}
        attached="top"
        className={styles.messageWrapper}
        onDismiss={onClose}
        header={title}
        content={message}
      />
    </TransitionablePortal>
  )
}

export default Notification

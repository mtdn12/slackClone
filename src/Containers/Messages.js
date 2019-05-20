import React, { useContext, useEffect } from 'react'
import { func, object, bool } from 'prop-types'
import '../Stores/Channel/Reducers'
import '../Stores/Channel/Sagas'
import { LoadingSelectors } from '../Stores/Loading/Selectors'
import { connect } from 'react-redux'

import { AuthSelectors } from '../Stores/Authentication/Selectors'
import { ChannelActions } from '../Stores/Channel/Actions'
import { ChannelSelectors } from '../Stores/Channel/Selectors'

import Messages from '../Components/organisms/Messages'

const MessagesContainer = ({
  user,
  createMessage,
  currentChannel,
  isLoadingMessage,
}) => {
  return (
    <Messages
      user={user}
      createMessage={createMessage}
      currentChannel={currentChannel}
      isLoadingMessage={isLoadingMessage}
    />
  )
}

const mapStateToProps = state => ({
  user: AuthSelectors.getUser(state),
  // Current active channle
  currentChannel: ChannelSelectors.getCurrentChannel(state),
  // Is loading create message
  isLoadingMessage: LoadingSelectors.getLoadingAction(state),
})

const mapDispatchToProps = dispatch => ({
  createMessage: (values, callback) =>
    dispatch(ChannelActions.createMessageRequest(values, callback)),
})

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
)

MessagesContainer.propTypes = {
  user: object.isRequired,
  currentChannel: object.isRequired,
  createMessage: func.isRequired,
  isLoadingMessage: bool.isRequired,
}

export default withConnect(MessagesContainer)

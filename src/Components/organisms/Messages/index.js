import React, { useState, useContext, useEffect } from 'react'
import { Segment, Comment } from 'semantic-ui-react'
import MessagesHeader from '../../molecules/MessagesHeader'
import MessageForm from '../../molecules/MessageForm'
import Message from '../../molecules/Message'
import { StoreContext } from '../../../Stores/StoreContext'
import { FirebaseContext } from '../../../Stores/Firebase'
import { setModal } from '../../../Stores/Modal/Actions'

const Messages = () => {
  // set state for messages
  const [messages, setMessages] = useState([])
  // firebase context
  const firebase = useContext(FirebaseContext)
  // Store context
  const [state, dispatch] = useContext(StoreContext)
  // Current user
  const user = state.auth.userData
  const currentChannel = state.channel.currentChannel || {}
  // Use effect to get messages data
  useEffect(() => {
    setMessages([])
    const newMessages = []
    firebase.messageRef.child(currentChannel.id).on('child_added', snap => {
      newMessages.push(snap.val())
      let messagesAdd = [...newMessages]
      setMessages(messagesAdd)
    })
    return () => {
      firebase.messageRef.child(currentChannel.id).off()
    }
  }, [currentChannel.id])
  // Open modal upload image
  const handleUploadMedia = () => {
    dispatch(setModal('ModalUploadMedia', {}))
  }
  const displayMessages = messages => {
    return (
      messages.length > 0 &&
      messages.map(mess => (
        <Message key={mess.timestamp} message={mess} user={user} />
      ))
    )
  }
  return (
    <React.Fragment>
      <MessagesHeader />
      <Segment>
        <Comment.Group className="messages">
          {displayMessages(messages)}
        </Comment.Group>
      </Segment>
      <MessageForm
        user={user}
        currentChannel={currentChannel}
        handleUploadMedia={handleUploadMedia}
      />
    </React.Fragment>
  )
}

export default Messages

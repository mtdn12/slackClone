import React from 'react'
import { object } from 'prop-types'
import { Comment } from 'semantic-ui-react'
import moment from 'moment'

const Message = ({ message, user }) => {
  const isOwnMessage = (message, user) => {
    return message.user.id === user.uid ? 'message__self' : ''
  }
  const timeFromNow = timeStamp => moment(timeStamp).fromNow()
  return (
    <Comment>
      <Comment.Avatar src={message.user.avatar} />
      <Comment.Content className={isOwnMessage(message, user)}>
        <Comment.Author as={'a'}>{message.user.name}</Comment.Author>
        <Comment.Metadata>{timeFromNow(message.timestamp)}</Comment.Metadata>
        <Comment.Text>{message.content}</Comment.Text>
      </Comment.Content>
    </Comment>
  )
}

Message.propTypes = {
  message: object.isRequired,
  user: object.isRequired,
}

export default Message

import React, { useState, useContext } from 'react'
import { object, func } from 'prop-types'
import { Segment, Button, Input } from 'semantic-ui-react'
import { FirebaseContext } from '../../../Stores/Firebase'
import ProgressBar from '../ProgressBar'

const MessagesForm = ({ user, currentChannel, handleUploadMedia }) => {
  const [message, setMessage] = useState('')
  const [errors, setError] = useState({})
  const [touched, setTouched] = useState({})
  const [isLoadingAction, setLoadingAction] = useState(false)
  // Fire base context
  const firebase = useContext(FirebaseContext)
  // handle create message
  const handleCreateMessage = () => {
    setLoadingAction(true)
    setTouched({
      message: true,
    })
    if (!message.trim()) {
      setError({
        message: 'Please input message',
      })
      return
    }
    let data = {
      message,
      user,
      channel: currentChannel,
    }
    firebase
      .doCreateMessage(data)
      .then(res => {
        setLoadingAction(false)
        setMessage('')
      })
      .catch(err => {
        setError({
          message: err.message,
        })
        setLoadingAction(false)
      })
  }

  return (
    <Segment className="message__form">
      <Input
        fluid
        name="message"
        value={message}
        onChange={e => {
          setMessage(e.target.value)
          if (e.target.value.trim() && errors.message) {
            setError({})
          }
        }}
        style={{ marginBottom: '0.7em' }}
        label={<Button icon="add" />}
        labelPosition="left"
        error={touched.message && Boolean(errors.message)}
        onBlur={e => setTouched({ message: true })}
        placeholder="Write your message"
      />
      <Button.Group icon widths="2">
        <Button
          color="orange"
          content="Add Reply"
          onClick={handleCreateMessage}
          labelPosition="left"
          icon="edit"
          loading={isLoadingAction}
          disabled={isLoadingAction}
        />
        <Button
          color="teal"
          onClick={handleUploadMedia}
          content="Upload Media"
          labelPosition="right"
          icon="cloud upload"
        />
      </Button.Group>
    </Segment>
  )
}

MessagesForm.propTypes = {
  user: object.isRequired,
  currentChannel: object.isRequired,
  handleUploadMedia: func.isRequired,
}

export default MessagesForm

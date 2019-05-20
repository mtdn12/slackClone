import React, { useState, useContext, useEffect } from 'react'
import { func, bool } from 'prop-types'
import uuidv4 from 'uuid/v4'
import mime from 'mime-types'
import { Modal, Input, Button, Icon } from 'semantic-ui-react'
import { FirebaseContext } from '../../../Stores/Firebase'
import { StoreContext } from '../../../Stores/StoreContext'
import { clearModal } from '../../../Stores/Modal/Actions'
import ProgressBar from '../ProgressBar'

const ModalUploadMedia = ({ handleClose }) => {
  // State to control file
  const [file, setFile] = useState(null)
  const [authorized, setAuthorized] = useState(['image/jpeg', 'image/png'])
  const [uploadState, setUploadState] = useState(null)
  const [uploadTask, setUploadTask] = useState(null)
  const [percentUploaded, setPercentUploaded] = useState(0)
  const [errors, setErrors] = useState({})
  // File context
  const firebase = useContext(FirebaseContext)
  // Store context
  const [state, dispatch] = useContext(StoreContext)
  // Handle add file
  const addFile = e => {
    const file = e.target.files[0]
    if (file) {
      setFile(file)
    }
  }
  const uploadFile = (file, metadata) => {
    const filePath = `chat/public/${uuidv4()}.jpg`
    setUploadState('Upload')
    setUploadTask(firebase.storageRef.child(filePath).put(file, metadata))
  }
  const sendFileMessage = fileUrl => {
    const data = {
      user: state.auth.userData,
      channel: state.channel.currentChannel,
      image: fileUrl,
    }
    firebase
      .doCreateMessage(data)
      .then(res => {
        setUploadState('Done')
        setUploadTask(null)
        dispatch(clearModal())
      })
      .catch(err => {
        setErrors({
          upload: err.message,
        })
        setUploadState('Error')
      })
  }
  // Add evenlistener
  useEffect(() => {
    if (uploadTask) {
      uploadTask.on(
        'state_changed',
        snap => {
          const percentUploaded = Math.round(
            (snap.bytesTransferred / snap.totalBytes) * 100
          )
          setPercentUploaded(percentUploaded)
        },
        err => {
          setErrors({ upload: err.message })
          setUploadState('Error')
          setUploadTask(null)
        },
        () => {
          uploadTask.snapshot.ref
            .getDownloadURL()
            .then(downloadUrl => {
              sendFileMessage(downloadUrl)
            })
            .catch(err => {
              setErrors({ upload: err.message })
              setUploadState('Error')
              setUploadTask(null)
            })
        }
      )
    }
  }, [uploadTask])

  const clearFile = () => {
    setFile(null)
  }
  const sendFile = () => {
    if (file !== null) {
      if (isAuthorized(file.name)) {
        const metadata = { contentType: mime.lookup(file.name) }
        uploadFile(file, metadata)
        clearFile()
      }
    }
  }
  const isAuthorized = fileName => {
    return authorized.includes(mime.lookup(fileName))
  }
  return (
    <Modal basic open>
      <Modal.Header>Select an Image File</Modal.Header>
      <Modal.Content>
        <Input
          fluid
          label="File types: jpg, png"
          name="file"
          type="file"
          onChange={addFile}
        />
      </Modal.Content>
      <Modal.Actions>
        {uploadState === 'Upload' ? (
          <ProgressBar
            uploadState={uploadState}
            percentUploaded={percentUploaded}
          />
        ) : (
          <React.Fragment>
            <Button color="green" inverted onClick={sendFile}>
              <Icon name="checkmark" /> Send
            </Button>
            <Button color="red" inverted onClick={handleClose}>
              <Icon name="remove" /> Cancel
            </Button>
          </React.Fragment>
        )}
      </Modal.Actions>
    </Modal>
  )
}

ModalUploadMedia.propTypes = {
  handleClose: func.isRequired,
}

export default ModalUploadMedia

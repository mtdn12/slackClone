import React, { useContext } from 'react'
import { bool, func, object } from 'prop-types'

import { Modal, Form, Input, Button, Icon } from 'semantic-ui-react'
import { Formik } from 'formik'
import * as Yup from 'yup'
import { StoreContext } from '../../../Stores/StoreContext'
import { FirebaseContext } from '../../../Stores/Firebase'
import {
  showLoadingAction,
  hideLoadingAction,
} from '../../../Stores/Loading/Actions'
import { showNotification } from '../../../Stores/Notification/Actions'

const CreateChannelModal = ({
  isLoadingAction,
  handleClose,
  item,
  createChannel,
}) => {
  const firebase = useContext(FirebaseContext)

  const { state, dispatch } = useContext(StoreContext)

  const handleCreateChannel = values => {
    dispatch(showLoadingAction())
    firebase
      .doCreateChannel(values)
      .then(() => {
        dispatch(hideLoadingAction())
        dispatch(
          showLoadingAction('Create Channel', 'Create channel success', 'blue')
        )
      })
      .catch(err => {
        dispatch(showLoadingAction('Create Channel', err.message, 'red'))
      })
  }
  return (
    <Modal basic open>
      <Modal.Header>Add a chanel</Modal.Header>
      <Formik
        initialValues={item}
        onSubmit={values => handleCreateChannel(values)}
        enableReinitialize
        validationSchema={Yup.object().shape({
          channelName: Yup.string().required('Please input Chanel name'),
          channelDetails: Yup.string().required('Please input Chanel detail'),
        })}
        render={({
          handleChange,
          handleBlur,
          values,
          touched,
          handleSubmit,
          errors,
        }) => (
          <React.Fragment>
            <Modal.Content>
              <Form onSubmit={handleSubmit}>
                <Form.Field>
                  <Input
                    fluid
                    label="Name of Chanel"
                    name="channelName"
                    value={values.chanelName}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    // error={touched.chanelName && Boolean(errors.chanelName)}
                    error
                  />
                </Form.Field>
                <Form.Field>
                  <Input
                    fluid
                    label="About the Chanel"
                    name="channelDetails"
                    value={values.chanelDetails}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={
                      touched.chanelDetails && Boolean(errors.chanelDetails)
                    }
                  />
                </Form.Field>
              </Form>
            </Modal.Content>
            <Modal.Actions>
              <Button
                color="green"
                inverted
                onClick={handleSubmit}
                loading={isLoadingAction}
                disabled={isLoadingAction}>
                <Icon name="checkmark" /> Add
              </Button>
              <Button color="red" inverted onClick={handleClose} type="button">
                <Icon name="remove" /> Cancel
              </Button>
            </Modal.Actions>
          </React.Fragment>
        )}
      />
    </Modal>
  )
}

CreateChannelModal.propTypes = {
  isLoadingAction: bool,
  handleClose: func.isRequired,
  item: object.isRequired,
  createChannel: func.isRequired,
}

export default CreateChannelModal

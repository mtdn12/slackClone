import React from 'react'
import { bool, func } from 'prop-types'

import { Modal, Form, Input, Button, Icon } from 'semantic-ui-react'

const CreateChanelModal = ({ isLoadingAction, handleClose }) => {
  console.log(handleClose)
  return (
    <Modal basic open>
      <Modal.Header>Add a chanel</Modal.Header>
      <Modal.Content>
        <Form>
          <Form.Field>
            <Input fluid label="Name of Chanel" name="chanelName" />
          </Form.Field>
          <Form.Field>
            <Input fluid label="About the Chanel" name="chanelDetails" />
          </Form.Field>
        </Form>
      </Modal.Content>
      <Modal.Actions>
        <Button color="green" inverted>
          <Icon name="checkmark" /> Add
        </Button>
        <Button color="red" inverted onClick={handleClose}>
          <Icon name="remove" /> Cancel
        </Button>
      </Modal.Actions>
    </Modal>
  )
}

CreateChanelModal.propTypes = {
  isLoadingAction: bool,
  handleClose: func.isRequired,
}

export default CreateChanelModal

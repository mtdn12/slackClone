import React from 'react'
import { connect } from 'react-redux'

import CreateChanelModal from '../Components/molecules/CreateChanelModal'

const CreateChanelModalContainer = ({...props}) => {
  return <CreateChanelModal {...props} />
}

const mapStateToProps = state => ({})

const mapDispatchToProps = dispatch => ({})

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
)

export default withConnect(CreateChanelModalContainer)

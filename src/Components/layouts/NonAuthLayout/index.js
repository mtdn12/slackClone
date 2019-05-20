import React from 'react'
import { node } from 'prop-types'

// import Notification from '../../../Containers/Notification'

const NonAuthLayout = ({ children }) => {
  return (
    <div className="app">
      {children}
      {/* <Notification /> */}
    </div>
  )
}

NonAuthLayout.propTypes = {
  children: node.isRequired,
}

export default NonAuthLayout

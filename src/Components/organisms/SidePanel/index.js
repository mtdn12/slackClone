import React from 'react'
import { func, object } from 'prop-types'
import { Menu } from 'semantic-ui-react'

import UserPanel from '../../molecules/UserPanel'
import Chanels from '../../molecules/Chanels'

const SidePanel = ({ doLogout, user, handleCreateChanel }) => {
  return (
    <Menu
      size="large"
      inverted
      fixed="left"
      vertical
      style={{
        background: '#4c3c4c',
        fontsize: '1.2rem',
      }}>
      <UserPanel doLogout={doLogout} user={user} />
      <Chanels chanels={[]} handleCreateChanel={handleCreateChanel} />
    </Menu>
  )
}

SidePanel.propTypes = {
  user: object.isRequired,
  doLogout: func.isRequired,
  handleCreateChanel: func.isRequired,
}

export default SidePanel

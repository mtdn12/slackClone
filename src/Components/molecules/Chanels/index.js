import React from 'react'
import { array, func } from 'prop-types'
import { Menu, Icon } from 'semantic-ui-react'

const Chanels = ({ chanels, handleCreateChanel }) => {
  return (
    <Menu.Menu style={{ paddingBottom: '2em' }}>
      <Menu.Item>
        <span>
          <Icon name="exchange" /> CHANNELS
        </span>
        ({chanels.length}){' '}
        <Icon
          name="add"
          onClick={handleCreateChanel}
          style={{ cursor: 'pointer' }}
        />
      </Menu.Item>
      {/*  chanels */}
    </Menu.Menu>
  )
}

Chanels.propTypes = {
  chanels: array.isRequired,
  handleCreateChanel: func.isRequired,
}

export default Chanels

import React from 'react'
import { func, object, array } from 'prop-types'
import { Menu, Icon } from 'semantic-ui-react'

const Channels = ({
  channels,
  handleCreateChanel,
  setCurrentChannel,
  currentChannel,
}) => {
  const displayChannesl = channels =>
    channels.length > 0 &&
    channels.map(chan => (
      <Menu.Item
        key={chan.id}
        onClick={() => setCurrentChannel(chan)}
        style={{ opacity: 0.7 }}
        active={currentChannel && currentChannel.id === chan.id}
        name={chan.name}>
        # {chan.name}
      </Menu.Item>
    ))
  return (
    <Menu.Menu style={{ paddingBottom: '2em' }}>
      <Menu.Item>
        <span>
          <Icon name="exchange" /> CHANNELS
        </span>
        ({channels.length}){' '}
        <Icon
          name="add"
          onClick={handleCreateChanel}
          style={{ cursor: 'pointer' }}
        />
      </Menu.Item>
      {/*  chanels */}
      {displayChannesl(channels)}
    </Menu.Menu>
  )
}

Channels.propTypes = {
  channels: array.isRequired,
  handleCreateChanel: func.isRequired,
  setCurrentChannel: func.isRequired,
  currentChannel: object.isRequired,
}

export default Channels

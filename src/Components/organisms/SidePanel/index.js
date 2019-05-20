import React, { useContext, useState, useEffect } from 'react'
import { func, object } from 'prop-types'
import { Menu, Button } from 'semantic-ui-react'
import { StoreContext } from '../../../Stores/StoreContext'
import { FirebaseContext } from '../../../Stores/Firebase'
import { setModal } from '../../../Stores/Modal/Actions'
import { setCurrentChannel } from '../../../Stores/Channel/Actions'

import UserPanel from '../../molecules/UserPanel'
import Channels from '../../molecules/Channels'

const SidePanel = () => {
  const [channels, setChannels] = useState([])
  // fire base
  const firebase = useContext(FirebaseContext)
  // Store context
  const [state, dispatch] = useContext(StoreContext)

  const user = state.auth.userData
  const currentChannel = state.channel.currentChannel
  // Handle logout
  const handleLogOut = () => {
    firebase.doSignOut()
  }
  // Get channels effect
  useEffect(() => {
    let newChannels = []
    firebase.channelRef.on('child_added', snap => {
      newChannels.push(snap.val())
      let channelsAdd = [...newChannels]
      setChannels(channelsAdd)
    })
    return () => {
      firebase.offChannelsListener()
    }
  }, [])
  // Handle create channel
  const handleCreateChanel = () => {
    const item = {
      channelName: '',
      channelDetails: '',
      user,
    }
    dispatch(
      setModal('CreateChannelModal', {
        item,
      })
    )
  }
  // Set current channel
  const handleSetCurrentChannel = channel => {
    dispatch(setCurrentChannel(channel))
  }
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
      <UserPanel doLogout={handleLogOut} user={user} />
      <Channels
        channels={channels}
        handleCreateChanel={handleCreateChanel}
        setCurrentChannel={handleSetCurrentChannel}
        currentChannel={currentChannel}
      />
    </Menu>
  )
}

export default SidePanel

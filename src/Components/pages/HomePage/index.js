import React, { useContext } from 'react'

import { Grid, Loader } from 'semantic-ui-react'
import { StoreContext } from '../../../Stores/StoreContext'

import ColorPanel from '../../organisms/ColorPanel'
import SidePanel from '../../organisms/SidePanel'
import Messages from '../../organisms/Messages'
import MetaPanel from '../../organisms/MetaPanel'

const HomePage = () => {
  const [state, dispatch] = useContext(StoreContext)
  return (
    <Grid columns="equal" className="app" style={{ background: '#eee' }}>
      <ColorPanel />
      <SidePanel />
      <Grid.Column style={{ marginLeft: 320 }}>
        {state.channel.currentChannel && <Messages />}
        {!state.channel.currentChannel && <Loader active />}
      </Grid.Column>
      <Grid.Column width={4}>
        <MetaPanel />
      </Grid.Column>
    </Grid>
  )
}

export default HomePage

import React from 'react'

import { Grid } from 'semantic-ui-react'

import ColorPanel from '../../organisms/ColorPanel'
import SidePanel from 'src/Containers/SidePanel'
import Messages from '../../organisms/Messages'
import MetaPanel from '../../organisms/MetaPanel'

const HomePage = () => {
  return (
    <Grid columns="equal" className="app" style={{ background: '#eee' }}>
      <ColorPanel />
      <SidePanel />
      <Grid.Column style={{ marginLeft: 320 }}>
        <Messages />
      </Grid.Column>
      <Grid.Column width={4}>
        <MetaPanel />
      </Grid.Column>
    </Grid>
  )
}

export default HomePage

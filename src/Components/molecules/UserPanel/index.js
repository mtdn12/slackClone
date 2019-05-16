import React from 'react'
import { func, object } from 'prop-types'
import { Grid, Header, Icon, Dropdown, Image } from 'semantic-ui-react'

const UserPanel = ({ doLogout, user }) => {
  const dropdownOptions = () => [
    {
      key: 'user',
      text: (
        <span>
          Signed in as <strong>{user.displayName}</strong>
        </span>
      ),
      disabled: true,
    },
    {
      key: 'avatar',
      text: <span>Change Avatar</span>,
    },
    {
      key: 'signout',
      text: <span onClick={doLogout}>Sign out</span>,
    },
  ]
  return (
    <Grid style={{ background: '#4c3c4c' }}>
      <Grid.Column>
        <Grid.Row style={{ padding: '1.2em', margin: 0 }}>
          {/* App header */}
          <Header inverted floated="left">
            <Icon name="code" />
            <Header.Content>DevChat</Header.Content>
          </Header>
          {/* User dropdow */}
          <Header style={{ padding: '0.25em' }} as="h4" inverted>
            <Dropdown
              trigger={
                <span>
                  <Image src={user.photoURL} avatar />
                  {user.displayName}
                </span>
              }
              options={dropdownOptions()}
            />
          </Header>
        </Grid.Row>
      </Grid.Column>
    </Grid>
  )
}

UserPanel.propTypes = {
  doLogout: func.isRequired,
  user: object.isRequired,
}

export default UserPanel

import React from 'react'
import { object } from 'prop-types'
import { Header, Button } from 'semantic-ui-react'



const NotFound = ({ classes }) => {
  return (
    <div>
      <Header as="h2">Not Found</Header>
      <Button as="a" href="/" primary>
        Go back to homepage
      </Button>
    </div>
  )
}
NotFound.propTypes = {
  classes: object.isRequired,
}
export default NotFound

import React from 'react'
import { bool } from 'prop-types'
import { Loader } from 'semantic-ui-react'



const LoadingPage = props => {
  if (props.error) {
    console.log(props.error)
    throw new Error(`Couldn't load LoadingPage`)
  }
  return (
    <div>
      <Loader active inline="centered" />
    </div>
  )
}

LoadingPage.propTypes = {
  error: bool,
}

export default LoadingPage

import React from 'react'

import { Loader, Dimmer } from 'semantic-ui-react'

const LoadingCheckAuthen = () => {
  return (
    <div>
      <Dimmer active>
        <Loader size="big">Please Wait...</Loader>
      </Dimmer>
    </div>
  )
}
export default LoadingCheckAuthen

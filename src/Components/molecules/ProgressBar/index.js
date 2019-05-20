import React from 'react'
import { Progress } from 'semantic-ui-react'

const ProgressBar = ({ percentUploaded, uploadState }) => {
  return (
    uploadState === 'Upload' && (
      <Progress
        className="progress__bar"
        progress
        percent={percentUploaded}
        indicating
        size="medium"
      />
    )
  )
}

export default ProgressBar

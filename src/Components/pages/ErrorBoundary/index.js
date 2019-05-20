import React, { PureComponent } from 'react'
import { node } from 'prop-types'



class ErrorBoundary extends PureComponent {
  static propTypes = {
    children: node,
  }

  state = {
    hasError: false,
  }

  // eslint-disable-next-line
  componentDidCatch(error, info) {
    this.setState({ hasError: true })
  }

  render() {
    if (this.state.hasError) {
      return <div>Something is wrong here! Please try refresh.</div>
    }

    return this.props.children
  }
}

export default ErrorBoundary

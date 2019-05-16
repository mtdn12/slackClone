import React from 'react'
import { Route, Switch } from 'react-router-dom'
import ErrorBoundary from './pages/ErrorBoundary'
import * as asyncComponents from './asyncComponents'
import Routes from '../Constants/Routes'

const App = () => {
  return (
    <ErrorBoundary>
      <Switch>
        <Route path={Routes.LOG_IN} component={asyncComponents.AsyncLogin} />
        <Route
          path={Routes.REGISTER}
          component={asyncComponents.AsyncRegister}
        />
        <Route component={asyncComponents.AsyncNotFound} />
      </Switch>
    </ErrorBoundary>
  )
}

export default App

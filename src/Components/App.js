import React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import PrivateRoute from 'src/Containers/PrivateRoute'
import PrivateRouteWithTemplate from 'src/Containers/PrivateRouteWithTemplate'
import ErrorBoundary from './pages/ErrorBoundary'
import * as routes from './routes'

const App = () => (
  <ErrorBoundary>
    <Switch>
      <Route path="/login" component={routes.AsyncLogin} />
      <Route path="/register" component={routes.AsyncRegister} />
      <Route component={routes.AsyncNotFound} />
    </Switch>
  </ErrorBoundary>
)

export default App

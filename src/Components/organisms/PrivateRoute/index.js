import React, { useContext } from 'react'
import { PropTypes } from 'prop-types'
import { Redirect, Route } from 'react-router-dom'
import { StoreContext } from '../../../Stores/StoreContext'

const PrivateRoute = ({ component: Component, ...rest }) => {
  const [state, dispatch] = useContext(StoreContext)
  return (
    <Route
      {...rest}
      render={({ location, ...props }) => {
        // Nếu có Login
        if (state.auth.userData) {
          return <Component location={location} {...props} />
        }

        // Nếu chưa login thì đưa về trang Login
        return (
          <Redirect
            to={{
              pathname: '/login',
              state: { from: location },
            }}
          />
        )
      }}
    />
  )
}

PrivateRoute.propTypes = {
  component: PropTypes.any.isRequired,
  userData: PropTypes.object,
}

export default PrivateRoute

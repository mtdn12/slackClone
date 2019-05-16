import Loadable from 'react-loadable'

import LoadingPage from './pages/LoadingPage'

// Not Found Page
export const AsyncNotFound = Loadable({
  loader: () => import('./pages/NotFound' /* webpackChunkName: "NotFound" */),
  loading: LoadingPage,
})

// Login page
export const AsyncLogin = Loadable({
  loader: () =>
    import('src/Containers/LoginPage' /* webpackChunkName: "LoginPage" */),
  loading: LoadingPage,
})

// Register page
export const AsyncRegister = Loadable({
  loader: () =>
    import(
      'src/Containers/RegisterPage' /* webpackChunkName: "RegisterPage" */
    ),
  loading: LoadingPage,
})

// Home page
export const AsyncHomePage = Loadable({
  loader: () =>
    import('./pages/HomePage' /* webpackChunkName: "RegisterPage" */),
  loading: LoadingPage,
})

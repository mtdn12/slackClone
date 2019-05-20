import React from 'react'

import useStore, { StoreContext } from '../Stores/StoreContext'

import App from '../Components/App'

const AppContainer = () => {
  return (
    <StoreContext.Provider value={useStore()}>
      <App />
    </StoreContext.Provider>
  )
}

export default AppContainer

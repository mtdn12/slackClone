import React, { useReducer } from 'react'
import rootReducer from './reducer'

const useStore = () => {
  return useReducer(rootReducer, {})
}

export const StoreContext = React.createContext(null)
export default useStore

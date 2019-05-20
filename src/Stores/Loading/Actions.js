import { MODULE_NAME } from './InitialState'

// Loading action
const SHOW_LOADING_ACTION = `@@${MODULE_NAME}/SHOW_LOADING_ACTION`
const HIDE_LOADING_ACTION = `@@${MODULE_NAME}/HIDE_LOADING_ACTION`
// Loading List
const SHOW_LOADING_LIST = `@@${MODULE_NAME}/SHOW_LOADING_LIST`
const HIDE_LOADING_LIST = `@@${MODULE_NAME}/HIDE_LOADING_LIST`
// Loading Item
const SHOW_LOADING_ITEM = `@@${MODULE_NAME}/SHOW_LOADING_ITEM`
const HIDE_LOADING_ITEM = `@@${MODULE_NAME}/HIDE_LOADING_ITEM`

// Action creator
export const showLoadingAction = () => ({
  type: SHOW_LOADING_ACTION,
})

export const hideLoadingAction = () => ({
  type: HIDE_LOADING_ACTION,
})

export const showLoadingList = () => ({
  type: SHOW_LOADING_LIST,
})

export const hideLoadingList = () => ({
  type: HIDE_LOADING_LIST,
})

export const showLoadingItem = name => ({
  type: SHOW_LOADING_ITEM,
  name,
})

export const hideLoadingItem = name => ({
  type: HIDE_LOADING_ITEM,
  name,
})

// Actions handler
export const actionsHandler = {
  [SHOW_LOADING_ACTION]: state => ({
    ...state,
    isLoadingAction: true,
  }),
  [HIDE_LOADING_ACTION]: state => ({
    ...state,
    isLoadingAction: false,
  }),
  [SHOW_LOADING_LIST]: state => ({
    ...state,
    isLoadingList: true,
  }),
  [HIDE_LOADING_LIST]: state => ({
    ...state,
    isLoadingList: false,
  }),
  [SHOW_LOADING_ITEM]: (state, action) => ({
    ...state,
    isLoadingItems: {
      ...state.isLoadingItems,
      [action.name]: true,
    },
  }),
  [HIDE_LOADING_ITEM]: (state, action) => ({
    ...state,
    isLoadingItems: {
      ...state.isLoadingItems,
      [action.name]: false,
    },
  }),
}

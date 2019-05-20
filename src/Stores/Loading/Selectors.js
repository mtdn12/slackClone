import { MODULE_NAME } from './InitialState'

export const getLoadingAction = state =>
  state[MODULE_NAME].isLoadingAction

export const getLoadingList = state => state[MODULE_NAME].isLoadingList

export const getLoadingItems = state => state[MODULE_NAME].isLoadingItems

export const LoadingSelectors = {
  getLoadingAction,
  getLoadingItems,
  getLoadingList,
}
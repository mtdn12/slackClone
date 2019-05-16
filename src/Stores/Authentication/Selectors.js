import { MODULE_NAME } from './InitialState'

const getRegisterItem = state => state[MODULE_NAME].get('registerItem')

const getLoginItem = state => state[MODULE_NAME].get('loginItem')

export const AuthSelectors = {
  getRegisterItem,
  getLoginItem,
}

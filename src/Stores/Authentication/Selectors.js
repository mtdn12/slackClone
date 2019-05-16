import { MODULE_NAME } from './InitialState'

const getRegisterItem = state => state[MODULE_NAME].get('registerItem')

const getLoginItem = state => state[MODULE_NAME].get('loginItem')

const getUser = state => state[MODULE_NAME].get('userData')

export const AuthSelectors = {
  getRegisterItem,
  getLoginItem,
  getUser,
}

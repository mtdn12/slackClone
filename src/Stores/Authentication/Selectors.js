import { MODULE_NAME } from './InitialState'

const getRegisterItem = state => state[MODULE_NAME].get('registerItem')

export const AuthSelectors = {
  getRegisterItem,
}

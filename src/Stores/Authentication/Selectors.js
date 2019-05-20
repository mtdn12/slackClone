import { MODULE_NAME } from './InitialState'


const getUser = state => state[MODULE_NAME].userData

const getLoadingCheckAuthen = state => state[MODULE_NAME].isCheckAuthen

export const AuthSelectors = {
  getUser,
  getLoadingCheckAuthen,
}

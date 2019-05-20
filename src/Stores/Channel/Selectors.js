import { MODULE_NAME } from './InitialState'

const getChannels = state => state[MODULE_NAME].get('channels')

const getCurrentChannel = state => state[MODULE_NAME].get('currentChannel')

export const ChannelSelectors = {
  getChannels,
  getCurrentChannel,
}

import { MODULE_NAME } from './InitialState'

const SET_MODAL = `@@${MODULE_NAME}/SET_MODAL`
const CLEAR_MODAL = `@@${MODULE_NAME}/CLEAR_MODAL`

// Action creator

export const setModal = (modalType, props) => ({
  type: SET_MODAL,
  modalType,
  props,
})

export const clearModal = () => ({
  type: CLEAR_MODAL,
})

// Action handler

export const actionsHandler = {
  [SET_MODAL]: (state, action) => ({
    ...state,
    modal: {
      type: action.modalType,
      props: action.props,
    },
  }),
  [CLEAR_MODAL]: (state, action) => ({
    ...state,
    modal: null,
  }),
}

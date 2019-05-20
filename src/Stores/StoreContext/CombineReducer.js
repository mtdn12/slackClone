export const combineReducers = reducers => (currentstate = {}, action) => {
  let state = { ...currentstate }
  Object.keys(reducers).map(reducer => {
    state[reducer] = reducers[reducer](state[reducer], action)
  })
  return state
}

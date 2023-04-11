export const state = () => ({
  licenceMode: null
})

export const mutations = {
  SET_MENU (state, { menuBar }) {
    state.menuBar = menuBar
  }
}

export const actions = {
  setMenu ({ commit }, { menuBar }) {
    commit('SET_MENU', { menuBar })
  }
}

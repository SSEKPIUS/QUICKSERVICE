export const state = () => ({
  page: 1
})

export const mutations = {
  RESET_PAGE (state) {
    state.page = 1
  },

  SET_PAGE (state, page) {
    state.page = page
  }
}

export const actions = {
  setPage ({ commit }, { page }) {
    commit('SET_PAGE', page)
  },

  resetPage ({ commit }) {
    commit('RESET_PAGE')
  }
}

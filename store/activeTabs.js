export const state = () => ({
  serviceBarTabInvoices: 0,
  serviceBarMain: 0,
  kitchenMain: 0
})

export const mutations = {
  SET_TAB_serviceBarTabInvoices (state, tab) {
    state.serviceBarTabInvoices = tab
  },

  SET_TAB_serviceBarMain (state, tab) {
    state.serviceBarMain = tab
  },

  SET_TAB_kitchenMain (state, tab) {
    state.kitchenMain = tab
  }
}

export const actions = {
  setTabserviceBarTabInvoices ({ commit }, tab) {
    commit('SET_TAB_serviceBarTabInvoices', tab)
  },

  setTabserviceBarMain ({ commit }, tab) {
    commit('SET_TAB_serviceBarMain', tab)
  },

  setKitchenMain ({ commit }, tab) {
    commit('SET_TAB_kitchenMain', tab)
  }
}

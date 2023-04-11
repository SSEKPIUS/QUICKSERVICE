export const state = () => ({
  menuMajor: [],
  menuMinor: []
})

export const getters = {
  getmenuMajor: state => state.menuMajor,
  getmenuMinor: state => state.menuMinor
}

export const mutations = {
  SET_MENU (state, { Major, Minor }) {
    state.menuMajor = Major
    state.menuMinor = Minor
  }
}

export const actions = {
  async fetch ({ commit, state }) {
    const config = {
      headers: { 'X-CSRF-TOKEN': state.token }
    }
    try {
      await this.$axios.$post('getMenuKitchen', {}, config)
        .then(({ result, menuKitchen }) => {
          if (result) {
            commit('SET_MENU', { ...menuKitchen })
          }
        })
        .catch((errors) => {
          if (errors.response.data.message) {
            this.$toast.error(this.$ObjTemplate.trim(errors.response.data.message))
          } else {
            this.$toast.error(this.$ObjTemplate.trim(errors.response.request.statusText))
          }
        })
    } catch (e) {
      this.$toast.error(e)
    }
  }
}

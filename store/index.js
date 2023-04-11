// @collapse
/* eslint-disable eqeqeq */
import cookies from 'js-cookie'
import { filter } from 'lodash'
import moment from 'moment-timezone'
import sound from '@/assets/bell_service_desk.wav'

moment.tz.setDefault('Africa/Kampala')

export const state = () => ({
  // timer
  timer: null,
  metricTimer: null,
  intervalTime: 15000,

  // pagination
  page: 1,

  // user
  token: null,
  user: null,
  users: [],

  // common
  orders: [],
  invoices: [],
  loading: false,

  // Rooms
  allGuests: [],
  loadingGuests: false,
  roomsPaginated: [],
  rooms: [],

  // Sauna
  steamsauna: [],
  massage: [],

  // Stock
  menuMajor: [],
  menuMinor: [],
  units: [],
  stock: [],
  loadingStock: false,
  stockReportList: {},

  // Menu
  AllMenu: [],

  // Invoices
  invoicePaginated: { data: [], links: [] },
  loadingInvoice: false,
  cashTile: {
    sumPaid: 0,
    sumHeldPaid: 0,
    totalArrears: 0
  },

  // Orders
  ordersPaginated: { data: [], links: [] },
  loadingOrders: false,

  // search
  search: {
    selection: null,
    search: null,
    DRange: {
      from: moment().startOf('day').subtract(1, 'month').format('MMM D, yyyy, h:mm a'), // format(Date.now(), 'MMM d, yyyy, h:mm a'),
      to: moment().endOf('day').format('MMM D, yyyy, h:mm a')
    }
  },
  selection: [
    'ALL',
    'SUPERVISOR',
    'SERVICE-BAR',
    'SERVICE-WAITER-WAITRESS',
    'RECEPTION',
    'KITCHEN',
    'STEAM-SAUNA-MASSAGE',
    'STORE',
    'ACCOUNTS',
    'HOUSE',
    'LAUNDRY',
    'CLEANER'],

  // logs
  logsPaginated: { data: [], links: [] },
  systemlogsPaginated: { data: [], links: [] },
  loadinglogs: false
})

const stateDefault = state

export const getters = {
  // pagination
  getPage: state => state.page,

  // Timer
  getTimer: state => state.timer,
  getMetricTimer: state => state.metricTimer,
  getTimerInterval: state => state.intervalTime,

  // user
  getUser: state => state.user,
  getToken: state => state.token,
  getUsers: state => state.users,

  // common
  getOrders: state => state.orders,
  getReceipts: state => state.invoices,

  // Rooms
  allGuests: state => state.allGuests,
  getloadingGuests: state => state.loadingGuests,
  roomsPaginated: state => state.roomsPaginated,
  rooms: state => state.rooms,

  // sauna
  allMassage: state => state.massage,
  allsteamsauna: state => state.steamsauna,

  // Stock
  getStockAll: state => state.stock,
  getmenuMajor: state => state.menuMajor,
  getmenuMinor: state => state.menuMinor,
  getUnits: state => state.units,
  getloadingStock: state => state.loadingStock,
  getStockReportList: state => state.stockReportList,

  // Menu
  getAllMenu: state => state.AllMenu,

  // Invoices
  getInvoicePaginated: state => state.invoicePaginated,
  getloadingInvoice: state => state.loadingInvoice,
  getCashTile: state => state.cashTile,

  // Orders
  getOrdersPaginated: state => state.ordersPaginated,
  getLoadingOrders: state => state.loadingOrders,

  // search
  getSearch: state => state.search,
  getSelection: state => state.selection,

  // logs
  getlogsPaginated: state => state.logsPaginated,
  getsystemlogsPaginated: state => state.systemlogsPaginated,
  getloadinglogs: state => state.loadinglogs
}

export const actions = {
  // user
  setUser ({ commit }, { user }) {
    commit('SET_USER', user)
  },
  setToken ({ commit }, { token, expiresIn }) {
    this.$axios.setToken(token, 'Bearer')
    const expiryTime = new Date(new Date().getTime() + expiresIn * 1000)
    cookies.set('x-access-token', token, { expires: expiryTime })
    commit('SET_TOKEN', token)
  },
  resetToken ({ commit }, { token }) {
    this.$axios.setToken(token, 'Bearer')
    commit('SET_TOKEN', token)
  },
  async logout ({ commit, state, redirect, route }) {
    this.$axios.setToken(false)
    cookies.remove('x-access-token')
    commit('REMOVE_TOKEN')
    try {
      clearInterval(state.timer)
      clearInterval(state.metricTimer)
      await this.$auth.logout()
    } catch (e) {
      console.error(e)
      redirect({ path: '/auth', query: { redirect: route.fullPath, message: 'Token Not Provided' } })
    }
    commit('resetState')
  },
  async loadUsers ({ commit, state }, filter = false) {
    const config = { headers: { 'X-CSRF-TOKEN': state.token } }
    try {
      await this.$axios.$post('api-Users', filter ? state.search : '', config)
        .then((resp) => {
          if (resp.users !== null) {
            commit('SET_USERS', resp.users)
          }
        })
        .catch((errors) => {
          console.error(errors.response)
        })
    } catch (e) {
      console.error(e)
    }
  },

  // Common
  async loadOrders ({ commit, state }) {
    const config = {
      headers: { 'X-CSRF-TOKEN': state.token }
    }
    const bodyParameters = {}
    try {
      await this.$axios.$post('getOrders', bodyParameters, config)
        .then(({ result, orders }) => {
          if (result && orders) {
            orders = Object.keys(orders).length > 0 ? orders : []
            if (Object.keys(filter(orders, function (o) {
              return (o.status == 10 || o.status == 20)
            })).length > 0) {
              const audio = new Audio(sound)
              audio.play().then().catch(err => this.$toast.error('cant play audio', err))
            }
            commit('SET_ORDERS', orders)
          }
        })
        .catch((errors) => {
          console.error(errors.response)
          if (errors.response.data.message) {
            this.$toast.error(this.$ObjTemplate.trim(errors.response.data.message))
          } else {
            this.$toast.error(this.$ObjTemplate.trim(errors.response.request.statusText))
          }
        })
    } catch (e) {
      console.error(e)
    }
  },
  async loadInvoices ({ commit, state }) {
    const config = {
      headers: { 'X-CSRF-TOKEN': state.token }
    }
    const bodyParameters = { /* Supply prev search sort, coz links dont provide the sort data */ }
    try {
      await this.$axios.$post('getReceipts', bodyParameters, config)
        .then(({ result, receipts }) => {
          if (result && receipts) {
            receipts = Object.keys(receipts).length > 0 ? receipts : []
            commit('SET_INVOICES', receipts)
          }
        })
        .catch((errors) => {
          console.error(errors.response)
          if (errors.response.data.message) {
            this.$toast.error(this.$ObjTemplate.trim(errors.response.data.message))
          } else {
            this.$toast.error(this.$ObjTemplate.trim(errors.response.request.statusText))
          }
        })
    } catch (e) {
      console.error(e)
    }
  },
  async download ({ commit, state }) {
    this.loading = true
    try {
      const config = {
        headers: { 'X-CSRF-TOKEN': this.getToken }
      }
      await this.$axios.$post('downloadsearchSauna', this.getSearch, config)
        .then((result) => {
          if (result.message) { this.$toast.success(result.message) }
          this.loading = false
        })
        .catch((error) => {
          this.loading = false
          console.error(error)
          if (error.message) { this.$toast.error(error.message) }
        })
    } catch (error) {
      this.loading = false
      this.$toast.error('Cannot find Network Resource')
      console.error(error)
    }
  },

  // Rooms
  async loadGuestsPaginated ({ commit, state }, url = 'searchSortGuests') {
    commit('setloadingGuests', true)
    const config = {
      headers: { 'X-CSRF-TOKEN': state.token }
    }
    try {
      await this.$axios
        .$post(url, state.search, config)
        .then(({ result, guests, sumPaid, sumHeldPaid, totalArrears }) => {
          if (result) {
            guests = Object.keys(guests).length > 0 ? guests : { data: [], links: [] }
            commit('setGuestsPaginated', guests)
            commit('setCashTile', { sumPaid, sumHeldPaid, totalArrears })
          }
        })
        .catch((errors) => {
          console.error(errors.response)
        })
    } catch (e) {
      console.log(e)
    }
    commit('setloadingGuests', false)
  },
  async loadguestsroomsPaginated ({ commit, state }, url = 'guestsroomsPaginated') {
    commit('setloadingGuests', true)
    const config = {
      headers: { 'X-CSRF-TOKEN': state.token }
    }
    try {
      await this.$axios
        .$post(url, state.search, config)
        .then(({ result, guests, rooms }) => {
          if (result) {
            guests = Object.keys(guests).length > 0 ? guests : []
            rooms = Object.keys(rooms).length > 0 ? rooms : []
            commit('setGuestsPaginated', guests)
            commit('setRoomsPaginated', rooms)
          }
        })
        .catch((errors) => {
          console.error(errors.response)
        })
    } catch (e) {
      console.error(e)
    }
    commit('setloadingGuests', false)
  },
  async loadguestsrooms ({ commit, state }) {
    commit('setloadingGuests', true)
    const config = {
      headers: { 'X-CSRF-TOKEN': state.token }
    }
    try {
      await this.$axios
        .$post('guestsrooms', state.search, config)
        .then(({ rooms }) => {
          if (rooms) {
            rooms = Object.keys(rooms).length > 0 ? rooms : []
            commit('setRooms', rooms)
          }
        })
        .catch((errors) => {
          console.error(errors.response)
        })
    } catch (e) {
      console.error(e)
    }
    commit('setloadingGuests', false)
  },

  // sauna
  async loadSteamSaunaMassagePaginated ({ commit, state }, url = 'searchSteamSaunaMassagePaginated') {
    commit('setloadingGuests', true)
    const config = {
      headers: { 'X-CSRF-TOKEN': state.token }
    }
    try {
      await this.$axios
        .$post(url, state.search, config)
        .then(({ result, guests, sumPaid, sumHeldPaid, totalArrears }) => {
          if (result) {
            guests = Object.keys(guests).length > 0 ? guests : { data: [], links: [] }
            commit('setGuestsPaginated', guests)
            commit('setCashTile', { sumPaid, sumHeldPaid, totalArrears })
          }
        })
        .catch((errors) => {
          console.error(errors.response)
        })
    } catch (e) {
      console.error(e)
    }
    commit('setloadingGuests', false)
  },

  async getSteamSaunaMassagePackages ({ commit, state }) {
    const config = {
      headers: { 'X-CSRF-TOKEN': state.token }
    }
    try {
      await this.$axios
        .$post('getSteamSaunaMassagePackages', null, config)
        .then(({ result, steamsauna, massage }) => {
          if (result) {
            steamsauna = Object.keys(steamsauna).length > 0 ? steamsauna : []
            massage = Object.keys(massage).length > 0 ? massage : []
            commit('setSteamSaunaMassage', { steamsauna, massage })
          }
        })
        .catch((errors) => {
          console.error(errors.response)
        })
    } catch (e) {
      console.error(e)
    }
  },

  // Stock
  async fetchMenu ({ commit, state }) {
    const config = {
      headers: { 'X-CSRF-TOKEN': state.token }
    }
    const bodyParameters = {
      key: ''
    }
    try {
      await this.$axios.$post('getAllInventoryMenu', bodyParameters, config)
        .then(({ result, menuMajor, menuMinor, units }) => {
          if (result && menuMajor && menuMinor && units) {
            menuMajor = Object.keys(menuMajor).length > 0 ? menuMajor : []
            menuMinor = Object.keys(menuMinor).length > 0 ? menuMinor : []
            units = Object.keys(units).length > 0 ? units : []
            commit('setMenu', { menuMajor, menuMinor, units })
          }
        })
        .catch((errors) => {
          console.error(errors.response)
          if (errors.response.data.message) {
            this.$toast.error(this.$ObjTemplate.trim(errors.response.data.message))
          } else {
            this.$toast.error(this.$ObjTemplate.trim(errors.response.request.statusText))
          }
        })
    } catch (e) {
      this.$toast.error(e)
      console.error(e)
    }
  },
  async fetchStock ({ commit, state }) {
    const config = {
      headers: { 'X-CSRF-TOKEN': state.token }
    }
    commit('setloadingStock', true)
    try {
      await this.$axios.$post('getAllInventoryStock', state.search, config)
        .then(({ result, stock }) => {
          if (result && stock) {
            stock = Object.keys(stock).length > 0 ? stock : []
            commit('setStock', stock)
          }
        })
        .catch((e) => {
          console.error(e.response)
        })
    } catch (e) {
      console.error(e)
    }
    commit('setloadingStock', false)
  },
  async fetchStockReportList ({ commit, state }, url = 'stockreportlist') {
    const config = {
      headers: { 'X-CSRF-TOKEN': state.token }
    }
    try {
      await this.$axios.$post(url, state.search, config)
        .then(({ list }) => {
          commit('setStockReportList', list)
        })
        .catch((errors) => {
          console.error(errors.response)
          if (errors.response.data.message) {
            this.$toast.error(this.$ObjTemplate.trim(errors.response.data.message))
          } else {
            this.$toast.error(this.$ObjTemplate.trim(errors.response.request.statusText))
          }
        })
    } catch (e) {
      console.error(e)
    }
  },

  // Menu
  async fetchAllMenu ({ commit, state }) {
    try {
      await this.$axios.$post('getAllMenu', {}, { headers: { 'X-CSRF-TOKEN': state.token } })
        .then(({ result, menu }) => {
          if (result && menu) {
            menu.Kitchen = Object.keys(menu.Kitchen).length > 0 ? menu.Kitchen : []
            menu.Bar = Object.keys(menu.Bar).length > 0 ? menu.Bar : []
            commit('setAllMenu', menu)
          }
        })
        .catch((errors) => {
          console.error(errors.response)
          if (errors.response.data.message) {
            this.$toast.error(this.$ObjTemplate.trim(errors.response.data.message))
          } else {
            this.$toast.error(this.$ObjTemplate.trim(errors.response.request.statusText))
          }
        })
    } catch (e) {
      console.error(e)
    }
  },

  // Invoices
  async loadInvoicesPaginated ({ commit, state }, url = 'getPaginatedReceipts') {
    const config = {
      headers: { 'X-CSRF-TOKEN': state.token }
    }
    commit('setloadingInvoice', true)
    try {
      await this.$axios.$post(url, state.search, config)
        .then(({ result, invoices, sumPaid, sumHeldPaid, totalArrears }) => {
          if (result && invoices) {
            invoices = Object.keys(invoices).length > 0 ? invoices : { data: [], links: [] }
            commit('setInvoicePaginated', invoices)
            commit('setCashTile', { sumPaid, sumHeldPaid, totalArrears })
          }
        })
        .catch((errors) => {
          console.error(errors)
          if (errors.response.data.message) {
            this.$toast.error(this.$ObjTemplate.trim(errors.response.data.message))
          } else {
            this.$toast.error(this.$ObjTemplate.trim(errors.response.request.statusText))
          }
        })
    } catch (e) {
      this.$toast.error(e)
      console.error(e)
    }
    commit('setloadingInvoice', false)
  },
  loadInvoicePaginationPage ({ dispatch, state }, url) {
    if (state.loadingInvoice) { return }
    if (!url) { return }
    dispatch('loadInvoicesPaginated', url)
  },

  // Orders
  async loadOrdersPaginated ({ commit, state }, url = 'getPaginatedOrders') {
    const config = {
      headers: { 'X-CSRF-TOKEN': state.token }
    }
    commit('setLoadingOrders', true)
    try {
      await this.$axios.$post(url, state.search, config)
        .then(({ result, orders }) => {
          if (result && orders) {
            orders = Object.keys(orders).length > 0 ? orders : { data: [], links: [] }
            commit('setOrdersPaginated', orders)
          }
        })
        .catch((errors) => {
          console.error(errors.response)
          if (errors.response.data.message) {
            this.$toast.error(this.$ObjTemplate.trim(errors.response.data.message))
          } else {
            this.$toast.error(this.$ObjTemplate.trim(errors.response.request.statusText))
          }
        })
    } catch (e) {
      this.$toast.error(e)
      console.error(e)
    }
    commit('setLoadingOrders', false)
  },

  // search

  // logs
  async loadlogsPaginated ({ commit, state }, url = 'getPaginatedInventoryLogs') {
    const config = {
      headers: { 'X-CSRF-TOKEN': state.token }
    }
    commit('setloadinglogs', true)
    try {
      await this.$axios.$post(url, state.search, config)
        .then(({ result, logs }) => {
          if (result && logs) {
            logs = Object.keys(logs).length > 0 ? logs : { data: [], links: [] }
            commit('setlogsPaginated', logs)
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
    commit('setloadinglogs', false)
  },
  async loadSystemlogsPaginated ({ commit, state }, url = 'getPaginatedSystemLogs') {
    const config = {
      headers: { 'X-CSRF-TOKEN': state.token }
    }
    commit('setloadinglogs', true)
    try {
      await this.$axios.$post(url, state.search, config)
        .then(({ result, logs }) => {
          if (result && logs) {
            logs = Object.keys(logs).length > 0 ? logs : { data: [], links: [] }
            commit('setSystemlogsPaginated', logs)
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
    commit('setloadinglogs', false)
  }
}

export const mutations = {
  resetState (state) {
    Object.assign(state, stateDefault()) // set the state back to its initial value
  },

  // user
  SET_TOKEN (state, token) {
    state.token = token
  },
  REMOVE_TOKEN (state) {
    state.token = null
    state.user = null
  },
  SET_USER (state, user) {
    state.user = user
  },
  SET_USERS (state, users) {
    state.users = users
  },

  // page nav
  setPage (state, page) {
    state.page = page
  },

  // Timer
  setTimer (state, val) {
    state.timer = val
  },
  setMetricTimer (state, val) {
    state.metricTimer = val
  },

  // Common
  SET_ORDERS (state, val) {
    state.orders = val
  },
  SET_INVOICES (state, val) {
    state.invoices = val
  },

  // Rooms
  setGuestsPaginated (state, guests) {
    state.allGuests = guests
  },
  setloadingGuests (state, bol) {
    state.loadingGuests = bol
  },
  setRoomsPaginated (state, rooms) {
    state.roomsPaginated = rooms
  },
  setRooms (state, rooms) {
    state.rooms = rooms
  },
  updateGuests (state, guest) {
    state.allGuests.unshift(guest)
  },
  updateRoom (state, data) {
    const { guest, active, room } = data
    const curRoom = state.roomsPaginated.find(el =>
      el.id === room.id
    )
    state.roomsPaginated[curRoom].guest = guest
    state.roomsPaginated[curRoom].active = active
  },

  // Sauna
  setSteamSaunaMassage (state, { steamsauna, massage }) {
    state.steamsauna = steamsauna
    state.massage = massage
  },

  // Stock
  setMenu (state, { menuMajor, menuMinor, units }) {
    state.menuMajor = menuMajor
    state.menuMinor = menuMinor
    state.units = units
  },
  setStock (state, stock) {
    state.stock = stock
  },
  setloadingStock (state, bol) {
    state.loadingStock = bol
  },
  setStockReportList (state, data) {
    state.stockReportList = data
  },

  // Menu
  setAllMenu (state, menu) {
    state.AllMenu = menu
  },

  // Search
  RESET_SEARCH (state) {
    state.search = { ...state.search, ...stateDefault().search }
  },
  SET_SEARCH (state, search) {
    state.search = { ...state.search, ...search }
  },

  // logs
  setlogsPaginated (state, logs) {
    state.logsPaginated = logs
  },
  setSystemlogsPaginated (state, logs) {
    state.systemlogsPaginated = logs
  },
  setloadinglogs (state, bol) {
    state.loadinglogs = bol
  },

  // Invoice
  setInvoicePaginated (state, invoices) {
    state.invoicePaginated = invoices
  },
  setloadingInvoice (state, bol = false) {
    state.loadingInvoice = bol
  },
  setCashTile (state, { sumPaid, sumHeldPaid, totalArrears }) {
    state.cashTile = {
      sumPaid,
      sumHeldPaid,
      totalArrears
    }
  },

  // Orders
  setOrdersPaginated (state, orders) {
    state.ordersPaginated = orders
  },
  setLoadingOrders (state, bol = false) {
    state.loadingOrders = bol
  }
}

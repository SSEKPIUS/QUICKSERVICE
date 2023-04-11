import Vue from 'vue'
import round from 'lodash/round'
import moment from 'moment'
// import pluralize from 'pluralize'
const pluralize = require('pluralize')

Vue.filter('number_format_', (value) => {
  return value ? round(value, 2).toFixed(0) : null
})

Vue.filter('humanDayDate', (value) => {
  return value ? moment(value).format('ddd D MMM, YYYY') : null
})

Vue.filter('number_format', (value) => {
  return value ? round(value).toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') : null
})

Vue.filter('pluralize', (value, number) => pluralize(value, number))

Vue.filter('truncate', value => Math.trunc(value))

// export const numberFormat = value => round(value).toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
// Vue.filter('number_format', numberFormat)

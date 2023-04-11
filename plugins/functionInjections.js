import Vue from 'vue'
const ObjTemplate = {
  trim (val) { return val.substring(0, 100) + '...' }
}
// this is to helpo webstorm with auto complete
Vue.prototype.$ObjTemplate = ObjTemplate

export default ({ app }, inject) => {
  inject('ObjTemplate', ObjTemplate)
}

<template>
  <div class=" min-w-min main">
    <div class="min-h-screen  flex flex-row">
      <TabTop :tabs="tabs" />
      <div class=" w-full p-2 text-center mx-auto border shadow-lg">
        <Orders :users="getUsers" :orders="orders" @loadOrders="loadOrders" />
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from 'vuex'
import _ from 'lodash'
import Orders from '@/components/kitchen/orders/Orders'
import TabTop from '@/components/common/tabroutes/TabTop'
export default {
  components: {
    Orders,
    TabTop
  },

  data () {
    return {
      tabs: [
        { name: 'NEW ORDERS', path: '/kitchen/new-orders', active: true, icon: 'fa fa-sort' },
        { name: 'ALL ORDERS', path: '/kitchen/all-orders', active: false, icon: 'fa fa-sort' },
        { name: 'INVENTORY', path: '/kitchen/inventory', active: false, icon: 'fa fa-archive' },
        { name: 'INVENTORY LOGS', path: '/kitchen/inventory-logs', active: false, icon: 'fa fa-file-text' }
      ]
    }
  },

  computed: {
    ...mapGetters(['getUsers', 'getToken', 'getTimer', 'getTimerInterval', 'getOrders']),

    getActiveTab () { return this.$store.state.activeTabs.kitchenMain },

    orders () {
      return this.filterNew_CancellingOrders(this.getOrders)
    }
  },

  mounted () {
    this.loadUsers()
    this.loadOrders()
    clearInterval(this.getTimer)
    this.setTimerInterval()
  },

  methods: {
    ...mapActions(['loadUsers', 'loadOrders']),
    ...mapMutations(['setTimer']),

    setTimerInterval () {
      this.setTimer(setInterval(this.refreshData, this.getTimerInterval))
    },

    refreshData () {
      this.loadOrders()
    },

    filterNew_CancellingOrders (orders) { // 5 pending, 10 new  15 served 20 cancelling 25 cancelled
      return _.filter(orders, function (o) {
        return (o.status == 10 || o.status == 20)
      })
    }
  }
}
</script>

<style scoped>
.main {
   min-width: 1280px;
}
</style>

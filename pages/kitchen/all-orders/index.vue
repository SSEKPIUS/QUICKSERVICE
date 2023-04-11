<template>
  <div class=" min-w-min main">
    <div class="min-h-screen  flex flex-row">
      <TabTop :tabs="tabs" />
      <div class=" w-full p-2 text-center mx-auto border shadow-lg">
        <Orders :users="getUsers" :orders="getOrders" @loadOrders="loadOrders" />
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from 'vuex'
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
        { name: 'NEW ORDERS', path: '/kitchen/new-orders', active: false, icon: 'fa fa-sort' },
        { name: 'ALL ORDERS', path: '/kitchen/all-orders', active: true, icon: 'fa fa-sort' },
        { name: 'INVENTORY', path: '/kitchen/inventory', active: false, icon: 'fa fa-archive' },
        { name: 'INVENTORY LOGS', path: '/kitchen/inventory-logs', active: false, icon: 'fa fa-file-text' }
      ]
    }
  },

  computed: {
    ...mapGetters(['getUsers', 'getToken', 'getTimer', 'getTimerInterval', 'getOrders'])
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
    }
  }
}
</script>

<style scoped>
.main {
   min-width: 1280px;
}
</style>

<template>
  <div class=" min-w-min main">
    <div class="min-h-screen  flex flex-row">
      <TabTop :tabs="tabs" />
      <div class=" w-full p-2 text-center mx-auto border shadow-lg relative">
        <Menu
          :user="getUser"
          @refresh="loadInvoices()"
        />
        <Invoices :user="getUser" :token="getToken" :receipts="receipts" @refresh="loadInvoices" />
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from 'vuex'
import _ from 'lodash'
import Invoices from '@/components/servicebar/invoices/Invoices'
import Menu from '@/components/common/Menu'
import TabTop from '@/components/common/tabroutes/TabTop'
export default {
  components: {
    Menu,
    Invoices,
    TabTop
  },

  data () {
    return {
      tabs: [
        { name: 'NEW ORDERS', path: '/servicebar/new-orders', active: false, icon: 'fa fa-sort' },
        { name: 'ALL ORDERS', path: '/servicebar/all-orders', active: false, icon: 'fa fa-sort' },
        { name: 'INVOICES', path: '/servicebar/invoices', active: true, icon: 'fa fa-money' },
        { name: 'INVENTORY', path: '/servicebar/inventory', active: false, icon: 'fa fa-archive' },
        { name: 'INVENTORY LOGS', path: '/servicebar/inventory-logs', active: false, icon: 'fa fa-file-text' }
      ]
    }
  },

  computed: {
    ...mapGetters(['getUser', 'getToken', 'getUsers', 'getTimer', 'getTimerInterval', 'getOrders', 'getReceipts']),
    receipts () {
      return _.filter(this.getReceipts, function (o) { // not closed invoices
        return (o.status != 15)
      })
    }
  },

  mounted () {
    this.loadUsers()
    this.loadInvoices()
    clearInterval(this.getTimer)
    this.setTimerInterval()
  },

  methods: {
    ...mapActions(['loadUsers', 'loadInvoices']),
    ...mapMutations(['setTimer']),

    setTimerInterval () {
      this.setTimer(setInterval(this.loadInvoices(), this.getTimerInterval))
    }
  }
}
</script>

<style scoped>
.main {
   min-width: 1280px;
}
</style>

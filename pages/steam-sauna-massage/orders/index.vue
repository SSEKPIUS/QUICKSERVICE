<template>
  <div class="min-w-min main">
    <div>
      <div class="flex flex-row">
        <SideNav
          class="shadow-sm min-h-screen"
          :service-waiter-waitress-arr-count="serviceWaiterWaitressArrCount"
        />

        <div class="border w-full">
          <Orders
            :service-waiter-waitress-arr="steamSaunaMassageArr"
            :token="getToken"
            :user="getUser"
            @refresh="loadInvoices()"
          />
        </div>
      </div>

      <InvoicePrint
        v-show="showModal"
        :showmodal.sync="showModal"
        :invoice="invoiceDataPrint"
      />
    </div>
  </div>
</template>

<script>
import _ from 'lodash'
import { mapGetters, mapMutations, mapActions } from 'vuex'
import SideNav from '@/components/steamsaunamassage/SideNav'
import Orders from '@/components/steamsaunamassage/dashboard/Orders'
import InvoicePrint from '@/components/dialog/InvoicePrintSaunaMassage'

export default {
  components: {
    SideNav,
    Orders,
    InvoicePrint
  },

  data () {
    return {
      routeName: 'index',
      showModal: false,
      invoiceDataPrint: [],
      steamSaunaMassageArr: []
    }
  },

  computed: {
    ...mapGetters(['getToken', 'getUser', 'getTimer', 'getTimerInterval', 'getReceipts']),

    serviceWaiterWaitressArrCount () {
      return Object.keys(this.steamSaunaMassageArr).length
    }
  },

  watch: {
    getReceipts: {
      handler (value) {
        this.steamSaunaMassageArr = _.filter(value, function (o) {
          return (o.section == 'STEAM-SAUNA-MASSAGE' && o.status != 15)
        })
      }
    }
  },

  mounted () {
    this.loadInvoices()
    this.fetchAllMenu()
    clearInterval(this.getTimer)
    this.setTimerInterval()
  },

  methods: {
    ...mapMutations(['setTimer']),
    ...mapActions(['loadInvoices', 'fetchAllMenu']),

    setTimerInterval () {
      this.setTimer(setInterval(this.refreshData, this.getTimerInterval))
    },

    refreshData () {
      this.loadInvoices()
    },

    Print (guest) {
      this.invoiceDataPrint = guest
      this.showModal = true
    }
  }
}
</script>

<style scoped>
.main {
  min-width: 1280px;
}
</style>

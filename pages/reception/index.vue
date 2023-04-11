<template>
  <div class="min-w-min main">
    <div class="flex flex-row">
      <SideNav
        class="min-h-screen"
        :page="routeName"
        :service-waiter-waitress-arr-count="serviceWaiterWaitressArrCount"
        @selection="setSelection"
      />
      <div class="border shadow-lg w-full">
        <Guests v-if="selection == 1" @Print="Print" />
        <Rooms v-if="selection == 2" />
        <Orders
          v-if="selection == 3"
          :service-waiter-waitress-arr="serviceWaiterWaitressArr"
          :token="getToken"
          :user="getUser"
          @refresh="loadInvoices"
        />
        <div v-if="selection == 4" class="w-full bg-white p-2 text-center mx-auto">
          <Inventory />
        </div>
      </div>
    </div>
    <InvoicePrint
      v-show="showModal"
      :showmodal.sync="showModal"
      :invoice="invoiceDataPrint"
    />
  </div>
</template>

<script>
import { filter } from 'lodash'
import { mapGetters, mapMutations, mapActions } from 'vuex'
import SideNav from '@/components/reception/SideNav'
import Guests from '@/components/reception/dashboard/Guests'
import Rooms from '@/components/reception/dashboard/Rooms'
import Orders from '@/components/reception/dashboard/Orders'
import InvoicePrint from '@/components/dialog/InvoicePrintRooms'
import Inventory from '@/components/common/Inventory'

export default {
  components: {
    SideNav,
    Guests,
    Rooms,
    Orders,
    InvoicePrint,
    Inventory
  },
  async asyncData ({ store }) {
    await store.commit('RESET_SEARCH')
    await store.commit('SET_SEARCH', { selection: 'RECEPTION' })
  },
  data () {
    return {
      routeName: 'index',
      selection: 1,
      showModal: false,
      invoiceDataPrint: [],
      serviceWaiterWaitressArr: []
    }
  },

  computed: {
    ...mapGetters(['getToken', 'getUser', 'getTimer', 'getTimerInterval', 'getReceipts']),

    serviceWaiterWaitressArrCount () {
      return Object.keys(this.serviceWaiterWaitressArr).length
    }
  },

  watch: {
    getReceipts: {
      handler (value) {
        this.serviceWaiterWaitressArr = filter(value, function (o) {
          return (o.section == 'RECEPTION' && o.status != 15)
        })
      }
    }
  },
  mounted () {
    this.loadguestsroomsPaginated()
    this.loadGuestsPaginated()
    this.loadguestsrooms()
    this.loadInvoices()
    this.fetchAllMenu()
    clearInterval(this.getTimer)
    this.setTimerInterval()
  },

  methods: {
    ...mapMutations(['setGuests', 'setRooms', 'setTimer']),
    ...mapActions(['loadInvoices', 'fetchAllMenu', 'loadguestsroomsPaginated', 'loadGuestsPaginated', 'loadguestsrooms']),

    setTimerInterval () {
      this.setTimer(setInterval(this.refreshData, this.getTimerInterval))
    },

    refreshData () {
      this.loadInvoices()
    },

    setSelection (selection) {
      this.selection = selection
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

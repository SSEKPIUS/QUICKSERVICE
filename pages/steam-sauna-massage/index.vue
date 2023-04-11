<template>
  <div class="min-w-min main">
    <div>
      <div class="flex flex-row">
        <SideNav
          class="shadow-sm min-h-screen"
        />

        <div class="border w-full">
          <Guests @refresh="loadSteamSaunaMassagePaginated" @Print="Print" />
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
/* eslint-disable no-console */
/* eslint-disable eqeqeq */
import { mapGetters, mapActions } from 'vuex'
import SideNav from '@/components/steamsaunamassage/SideNav'
import Guests from '@/components/steamsaunamassage/dashboard/Guests'
import InvoicePrint from '@/components/dialog/InvoicePrintSaunaMassage'

export default {
  components: {
    SideNav,
    Guests,
    InvoicePrint
  },

  data () {
    return {
      showModal: false,
      invoiceDataPrint: [],
      steamSaunaMassageArr: []
    }
  },

  computed: {
    ...mapGetters(['getTimerInterval', 'getTimer'])
  },

  mounted () {
    this.loadSteamSaunaMassagePaginated()
    this.getSteamSaunaMassagePackages()
    clearInterval(this.getTimer)
  },

  methods: {
    ...mapActions(['loadSteamSaunaMassagePaginated', 'getSteamSaunaMassagePackages']),

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

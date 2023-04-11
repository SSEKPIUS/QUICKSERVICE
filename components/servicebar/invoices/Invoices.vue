<template>
  <div class="h-auto">
    <!--actual component start-->
    <div class=" flex justify-center items-center  w-full">
      <ul class="flex justify-center items-center my-2">
        <li>
          <button :class="getActiveTab==0 ? 'bg-blue-600' : 'bg-blue-400'" class="cursor-pointer    relative text-white px-6 py-2 mx-2 rounded text-base font-bold overflow-visible" @click="setActiveTab(0)">
            SERVICE-BAR
            <span v-show="getserviceBarArrCount>0" class="absolute top-0 right-0 -mt-5 -mr-1 px-4 py-1 bg-red-500 rounded-full">
              {{ getserviceBarArrCount }}
            </span>
          </button>
        </li>
        <li>
          <button :class="getActiveTab==1 ? 'bg-blue-600' : 'bg-blue-400'" class="cursor-pointer relative text-white px-6 py-2 mx-2 rounded text-base font-bold overflow-visible" @click="setActiveTab(1)">
            SERVICE-WAITER-WAITRESS
            <span v-show="getserviceWaiterWaitressArrCount>0" class="absolute top-0 right-0 -mt-5 -mr-1 px-4 py-1 bg-red-500 rounded-full">
              {{ getserviceWaiterWaitressArrCount }}
            </span>
          </button>
        </li>
        <li>
          <button :class="getActiveTab==2 ? 'bg-blue-600' : 'bg-blue-400'" class="cursor-pointer relative text-white px-6 py-2 mx-2 rounded text-base font-bold overflow-visible" @click="setActiveTab(2)">
            RECEPTION
            <span v-show="getreceptionArrCount>0" class="absolute top-0 right-0 -mt-5 -mr-1 px-4 py-1 bg-red-500 rounded-full">
              {{ getreceptionArrCount }}
            </span>
          </button>
        </li>
        <li>
          <button :class="getActiveTab==3 ? 'bg-blue-600' : 'bg-blue-400'" class="cursor-pointer relative text-white px-6 py-2 mx-2 rounded text-base font-bold overflow-visible" @click="setActiveTab(3)">
            STEAM-SAUNA-MASSAGE
            <span v-show="steamSaunaMassageArrCount>0" class="absolute top-0 right-0 -mt-5 -mr-1 px-4 py-1 bg-red-500 rounded-full">
              {{ steamSaunaMassageArrCount }}
            </span>
          </button>
        </li>
      </ul>
    </div>

    <div class=" w-full p-2">
      <div class="w-full bg-white p-2 text-center mx-auto">
        <div v-show="getActiveTab==0">
          <Invoices
            :user="user"
            :invoices="getserviceBarArr"
            @cancel="cancelServiceBar"
            @ConfirmInvoice="ConfirmInvoice"
            @CloseInvoice="CloseInvoice"
            @Print="Print"
          />
        </div>
        <div v-show="getActiveTab==1">
          <Invoices
            :user="user"
            :invoices="getserviceWaiterWaitressArr"
            @cancel="cancelServiceBar"
            @ConfirmInvoice="ConfirmInvoice"
            @CloseInvoice="CloseInvoice"
            @Print="Print"
          />
        </div>
        <div v-show="getActiveTab==2">
          <Invoices
            :user="user"
            :invoices="getreceptionArr"
            @cancel="cancelServiceBar"
            @ConfirmInvoice="ConfirmInvoice"
            @CloseInvoice="CloseInvoice"
            @Print="Print"
          />
        </div>
        <div v-show="getActiveTab==3">
          <Invoices
            :user="user"
            :invoices="getsteamSaunaMassageArr"
            @cancel="cancelServiceBar"
            @ConfirmInvoice="ConfirmInvoice"
            @CloseInvoice="CloseInvoice"
            @Print="Print"
          />
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
import Invoices from '@/components/common/invoices/Invoices'
import InvoicePrint from '@/components/dialog/InvoicePrint'

export default {
  components: { Invoices, InvoicePrint },

  props: {
    user: {
      type: Object,
      required: true
    },
    token: {
      type: String,
      required: true
    },
    receipts: {
      type: [Object, Array],
      required: true
    }
  },

  data () {
    return {
      tabs: [
        'SERVICE-BAR',
        'SERVICE-WAITER-WAITRESS',
        'RECEPTION',
        'SAUNA-MASSAGE'
      ],
      serviceBarArr: [],
      serviceWaiterWaitressArr: [],
      receptionArr: [],
      steamSaunaMassageArr: [],
      intervalTime: 30000, // figure below server crashes make 30s
      showModal: false,
      invoiceDataPrint: []
    }
  },

  computed: {
    getActiveTab () { return this.$store.state.activeTabs.serviceBarTabInvoices },

    getserviceBarArrCount () { return Object.keys(this.serviceBarArr).length },

    getserviceWaiterWaitressArrCount () { return Object.keys(this.serviceWaiterWaitressArr).length },

    getreceptionArrCount () { return Object.keys(this.receptionArr).length },

    steamSaunaMassageArrCount () { return Object.keys(this.steamSaunaMassageArr).length },

    getserviceBarArr () { return this.serviceBarArr },

    getserviceWaiterWaitressArr () { return this.serviceWaiterWaitressArr },

    getreceptionArr () { return this.receptionArr },

    getsteamSaunaMassageArr () { return this.steamSaunaMassageArr }
  },

  watch: {
    receipts: {
      handler (value) {
        this.serviceBarArr = filter(value, function (o) {
          return (o.section == 'SERVICE-BAR')
        })

        this.serviceWaiterWaitressArr = filter(value, function (o) {
          return (o.section == 'SERVICE-WAITER-WAITRESS')
        })

        this.receptionArr = filter(value, function (o) {
          return (o.section == 'RECEPTION')
        })

        this.steamSaunaMassageArr = filter(value, function (o) {
          return (o.section == 'SAUNA-MASSAGE')
        })
      }
    }
  },

  methods: {
    setActiveTab (Tab) { this.$store.dispatch('activeTabs/setTabserviceBarTabInvoices', Tab) },

    cancelServiceBar (ordersid) { this.changeorderState(ordersid, 20) },

    ConfirmInvoice (invoice) {
      try {
        if (Object.keys(invoice.orders).length > 0) {
          this.updateInvoice(invoice.receipts_id, 'CONFIRM')
        } else {
          // eslint-disable-next-line no-throw-literal
          throw { message: 'The Invoice has no Orders!' }
        }
      } catch (error) {
        this.$toast.error(error.message)
      }
    },

    CloseInvoice (invoice) {
      try {
        if (Object.keys(invoice.orders).length > 0) {
          this.updateInvoice(invoice.receipts_id, 'CLOSE')
        } else {
          // eslint-disable-next-line no-throw-literal
          throw { message: 'The Invoice has no Orders!' }
        }
      } catch (error) {
        this.$toast.error(error.message)
      }
    },

    Print (invoice) {
      this.invoiceDataPrint = invoice
      this.showModal = true
    },

    async updateInvoice (id = 0, mode = null) {
      const config = {
        headers: { 'X-CSRF-TOKEN': this.token }
      }
      const bodyParameters = {
        id,
        mode
      }
      try {
        await this.$axios.$post('updateReceipts', bodyParameters, config)
          .then(({ result, message }) => {
            if (result && message) {
              this.$toast.success(message)
              this.$emit('refresh')
            }
          })
          .catch((errors) => {
            // eslint-disable-next-line no-console
            console.log(errors.response)
            if (errors.response.data.message) {
              this.$toast.error(this.$ObjTemplate.trim(errors.response.data.message))
            } else {
              this.$toast.error(this.$ObjTemplate.trim(errors.response.request.statusText))
            }
          })
      // eslint-disable-next-line no-unreachable
      } catch (e) {
        this.$toast.error(e)
        // eslint-disable-next-line no-console
        console.log(e)
      }
    },

    async changeorderState (Orderid = 0, stateMode = null) {
      const config = {
        headers: { 'X-CSRF-TOKEN': this.token }
      }
      const bodyParameters = {
        id: Orderid,
        state: stateMode
      }

      try {
        await this.$axios.$post('requestCancelOrder', bodyParameters, config)
          .then(({ result, message }) => {
            if (result && message) {
              this.$toast.success(message)
              this.$emit('refresh')
            }
          })
          .catch((errors) => {
            // eslint-disable-next-line no-console
            console.log(errors.response)
            if (errors.response.data.message) {
              this.$toast.error(this.$ObjTemplate.trim(errors.response.data.message))
            } else {
              this.$toast.error(this.$ObjTemplate.trim(errors.response.request.statusText))
            }
          })
      // eslint-disable-next-line no-unreachable
      } catch (e) {
        this.$toast.error(e)
        // eslint-disable-next-line no-console
        console.log(e)
      }
    }
  }
}
</script>

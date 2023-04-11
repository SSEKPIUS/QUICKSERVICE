<template>
  <div class=" mx-auto p-2">
    <div class=" mx-auto border shadow-lg rounded-sm text-gray-700 h-auto">
      <div class="flex p-3 border-l-8" :class="getorderStatus(parseInt(invoice.status)).styeBorder">
        <div class="space-y-1 border-r-2 pr-3">
          <div class="text-sm leading-5 font-semibold">
            <span class="text-xs leading-4 font-normal text-gray-500"> Invoice #</span> <span class=" font-extrabold"> {{ invoice.receipts_id }} </span>
          </div>
          <div class="text-sm leading-5 font-semibold">
            <span class="text-xs leading-4 font-normal text-gray-500 pr"> Total:</span> <span class=" font-extrabold"> Shs: {{ invoice.TTotal | number_format }}/= </span>
          </div>
          <div class="text-xm leading-5 font-semiboldtext-red-700">
            {{ invoice.name }}
          </div>
          <div class="text-xs leading-5 font-semibold text-gray-500">
            {{ invoice.created_at | humanDayDate }}
          </div>
          <div class=" flex flex-row gap-1">
            <button
              v-show="invoice.status == 5"
              class=" text-white text-center font-bold py-1 my-1 px-3 rounded text-xs hover:bg-green-700  bg-green-400 uppercase"
              @click="ConfirmInvoice(invoice)"
            >
              Confirm
            </button>
            <button
              v-show="invoice.status == 10"
              class=" text-white text-center font-bold py-1 my-1 px-3 rounded text-xs hover:bg-blue-700  bg-blue-400 uppercase"
              @click="$modal.show(`print_invoice_${invoice.receipts_id}`)"
            >
              Print
            </button>
            <button
              v-show="invoice.status == 10"
              class=" text-white text-center font-bold py-1 my-1 px-3 rounded text-xs hover:bg-red-700  bg-red-400 uppercase"
              @click="Close(invoice)"
            >
              Close
            </button>
          </div>
        </div>
        <div class="flex-1">
          <div class="ml-3 space-y-1 pr-3">
            <div class="text-sm leading-4 font-normal">
              <InvoiceOrder
                :orders-t-r="invoice.orders"
                :loading="loading"
                :usersection="usersection"
                @cancel="cancel"
              />
            </div>
          </div>
        </div>
      </div>
    </div>

    <!--print modal-->
    <modal
      :name="`print_invoice_${invoice.receipts_id}`"
      :adaptive="true"
      :draggable="true"
      :scrollable="true"
      width="320px"
      height="auto"
    >
      <ModalPrint
        :invoice="invoice"
      />
    </modal>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import InvoiceOrder from '@/components/common/orderFiltered/InvoiceOrder'
import ModalPrint from '@/components/dialog/ModalPrint'
export default {
  components: { InvoiceOrder, ModalPrint },
  props: {
    invoice: {
      type: [Array, Object],
      required: true
    },
    usersection: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      loading: false
    }
  },
  computed: {
    ...mapGetters({ token: 'getToken' })
  },
  methods: {
    ...mapActions(['loadInvoices']),
    getorderStatus (val) {
      switch (val) { // 5 unpaid, 10 paid
        case 5:
          return { styeBorder: 'border-yellow-200', styeBg: 'bg-yellow-200', text: 'Unpaid' }
        case 10:
          return { styeBorder: 'border-green-900', styeBg: 'bg-green-900', text: 'Paid' }
        default:
          return { styeBorder: 'border-gray-400', styeBg: 'bg-gray-00', text: 'Unknown' }
      }
    },
    cancel (ordersid) {
      this.changeorderState(ordersid, 20)
    },
    ConfirmInvoice (invoice) {
      try {
        if (Object.keys(invoice.orders).length > 0) {
          invoice.orders.forEach((element) => { // 5 pending, 10 new  15 served 20 cancelling, 25 cancelled
            if ((parseInt(element.status) !== 15) && (parseInt(element.status) !== 25)) {
              // eslint-disable-next-line no-throw-literal
              throw { message: 'The Invoice has Uncleared Orders!' }
            }
          })
          if (Object.keys(invoice.orders).length > 0) {
            this.updateInvoice(invoice.receipts_id, 'CONFIRM')
          } else {
            // eslint-disable-next-line no-throw-literal
            throw { message: 'The Invoice has no Orders!' }
          }
        }
      } catch (error) {
        this.$toast.error(error.message)
      }
    },
    async updateInvoice (id = 0, mode = null) {
      try {
        await this.$axios.$post('updateReceipts', { id, mode }, { headers: { 'X-CSRF-TOKEN': this.token } })
          .then(({ result, message }) => {
            if (result && message) {
              this.$toast.success(message)
              this.loadInvoices()
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
    },
    Close (invoice) {
      try {
        if (Object.keys(invoice.orders).length > 0) {
          invoice.orders.forEach((element) => { // 5 pending, 10 new  15 served 20 cancelling, 25 cancelled
            if ((parseInt(element.status) !== 15) && (parseInt(element.status) !== 25)) {
              // eslint-disable-next-line no-throw-literal
              throw { message: 'The Invoice has Uncleared Orders!' }
            }
          })
          this.CloseInvoice(invoice)
        }
      } catch (error) {
        this.$toast.error(error.message)
      }
    },
    CloseInvoice (invoice) {
      if (this.usersection !== 'SERVICE-BAR') {
        this.$toast.error('Only SERVICE-BAR is Allowed to Close an Invoice')
        return
      }
      this.updateInvoice(invoice.receipts_id, 'CLOSE')
    },
    async changeorderState (Orderid = 0, stateMode = null) {
      try {
        await this.$axios.$post('requestCancelOrder', { id: Orderid, state: stateMode }, { headers: { 'X-CSRF-TOKEN': this.token } })
          .then(({ result, message }) => {
            if (result && message) {
              this.loadInvoices()
              this.$toast.success(message)
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
    }
  }
}
</script>

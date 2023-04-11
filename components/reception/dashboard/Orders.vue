<template>
  <div class=" px-auto h-auto relative">
    <Menu
      :user="user"
      @refresh="$emit('refresh')"
    />
    <Invoices
      :user="user"
      :invoices="serviceWaiterWaitressArr"
      @cancel="cancelServiceBar"
      @ConfirmInvoice="ConfirmInvoice"
      @CloseInvoice="CloseInvoice"
      @Print="Print"
    />
    <InvoicePrint
      v-show="showModal"
      :showmodal.sync="showModal"
      :invoice="getinvoiceDataPrint"
    />
  </div>
</template>

<script>
import Menu from '@/components/common/Menu'
import Invoices from '@/components/common/invoices/Invoices'
import InvoicePrint from '@/components/dialog/InvoicePrint'
export default {
  components: { Menu, Invoices, InvoicePrint },

  props: {
    serviceWaiterWaitressArr: {
      type: [Array, Object],
      required: true
    },
    user: {
      type: Object,
      required: true
    },
    token: {
      type: [String, Object],
      required: true
    }
  },

  data () {
    return {
      AllowCloseInv: false,
      showModal: false,
      invoiceDataPrint: []
    }
  },

  computed: {
    getinvoiceDataPrint () { return this.invoiceDataPrint }
  },

  methods: {
    Print (invoice) {
      this.invoiceDataPrint = invoice
      this.showModal = true
    },

    ConfirmInvoice (invoice) {
      try {
        if (Object.keys(invoice.orders).length > 0) {
          this.updateInvoice(invoice.receipts_id, 'CONFIRM')
        } else {
          this.$toast.error('The Invoice has no Orders!')
        }
      } catch (error) {
        this.$toast.error(error.message)
      }
    },

    CloseInvoice (invoice) {
      try {
        if (Object.keys(invoice.orders).length > 0) {
          if (this.AllowCloseInv) {
            this.updateInvoice(invoice.receipts_id, 'CLOSE')
          } else {
            this.$toast.error('Contact Cashier to Close this Invoice!')
          }
        } else {
          this.$toast.error('The Invoice has no Orders!')
        }
      } catch (error) {
        this.$toast.error(error.message)
      }
    },

    cancelServiceBar (ordersid) { this.changeorderState(ordersid, 20) },

    async changeorderState (Orderid = 0, stateMode = null) {
      try {
        await this.$axios.$post('requestCancelOrder', { id: Orderid, state: stateMode }, { headers: { 'X-CSRF-TOKEN': this.token } })
          .then(({ result, message }) => {
            if (result && message) {
              this.$toast.success(message)
              this.$emit('refresh')
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

    async updateInvoice (id = 0, mode = null) {
      try {
        await this.$axios.$post('updateReceipts', { id, mode }, { headers: { 'X-CSRF-TOKEN': this.token } })
          .then(({ result, message }) => {
            if (result && message) {
              this.$toast.success(message)
              this.$emit('refresh')
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

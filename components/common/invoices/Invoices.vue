<!--eslint-disable vue/multi-word-component-names -->
<template>
  <div>
    <div class=" w-full p-2 pt-10 h-full">
      <Invoice
        v-for="(invoice,n) in invoices "
        :key="n"
        :invoice="invoice"
        :usersection="user.section"
      />
    </div>
  </div>
</template>

<script>
import Invoice from '@/components/common/orderFiltered/Invoice'
export default {
  name: 'InvoiceCommon',
  components: { Invoice },
  props: {
    invoices: {
      type: [Array, Object],
      required: true
    },
    user: {
      type: [Array, Object],
      required: true
    }
  },

  data () {
    return {
      invoicePaginated: [],
      currentUrl: null
    }
  }
}
</script>

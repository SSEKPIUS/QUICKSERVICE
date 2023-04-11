<template>
  <div class=" w-full p-2 h-full">
    <CashTile
      :loading="loading"
      :search="getSearch"
      :actual-balance="getCashTile.sumPaid"
      :actualbalance-held="getCashTile.sumHeldPaid"
      :expected-balance="getCashTile.totalArrears"
      @download="download"
    />
    <div class=" w-full p-2  shadow-2xl">
      <Invoices />
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Invoices from '@/components/common/invoicesUnfiltered/UnfilteredInvoices'
import CashTile from '@/components/accounts/CashTile'
export default {

  components: {
    Invoices, CashTile
  },

  layout: 'accounts',

  data () {
    return {
      loading: false
    }
  },

  computed: {
    ...mapGetters(['getUser', 'getCashTile', 'getSearch', 'getToken'])
  },

  methods: {
    async download () {
      this.loading = true
      try {
        const config = {
          headers: { 'X-CSRF-TOKEN': this.getToken },
          responseType: 'blob'
        }
        await this.$axios.$post('receiptreport/pdf', this.getSearch, config)
          .then((response) => {
            const fileURL = window.URL.createObjectURL(new Blob([response]))
            const fileLink = document.createElement('a')
            fileLink.href = fileURL
            fileLink.setAttribute('download', 'receiptreport.pdf')
            document.body.appendChild(fileLink)
            fileLink.click()
            this.loading = false
          })
          .catch((error) => {
            this.loading = false
            if (error.message) { this.$toast.error(error.message) }
          })
      } catch (error) {
        this.loading = false
        this.$toast.error('Cannot find Network Resource')
      }
    }
  }
}
</script>

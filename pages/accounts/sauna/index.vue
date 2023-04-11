<template>
  <div class=" w-full p-2">
    <CashTile
      :loading="loading"
      :search="getSearch"
      :actual-balance="getCashTile.sumPaid"
      :actualbalance-held="getCashTile.sumHeldPaid"
      :expected-balance="getCashTile.totalArrears"
      @download="download"
    />
    <div class=" w-full p-3  shadow-2xl">
      <BaseFilter
        section="Steam Sauna Massage"
        section-text="view Invoices"
        :search="false"
        :options="false"
      />
      <Guests />
    </div>
  </div>
</template>

<script>
/* eslint-disable no-console */
import { mapGetters } from 'vuex'
import BaseFilter from '@/components/filters/BaseFilter'
import Guests from '@/components/accounts/sauna/Guests'
import CashTile from '@/components/accounts/CashTile'
export default {
  components: { Guests, BaseFilter, CashTile },

  layout: 'accounts',

  data () {
    return {
      loading: false
    }
  },

  computed: {
    ...mapGetters(['getCashTile', 'getSearch', 'getToken'])
  },

  methods: {
    async download () {
      this.loading = true
      try {
        const config = {
          headers: { 'X-CSRF-TOKEN': this.getToken },
          responseType: 'blob'
        }
        await this.$axios.$post('saunamassagereport/pdf', this.getSearch, config)
          .then((response) => {
            const fileURL = window.URL.createObjectURL(new Blob([response]))
            const fileLink = document.createElement('a')
            fileLink.href = fileURL
            fileLink.setAttribute('download', 'saunamassagereport.pdf')
            document.body.appendChild(fileLink)
            fileLink.click()
            this.loading = false
          })
          .catch((error) => {
            this.loading = false
            console.log(error)
            if (error.message) { this.$toast.error(error.message) }
          })
      } catch (error) {
        this.loading = false
        this.$toast.error('Cannot find Network Resource')
        console.log(error)
      }
    }
  }

}
</script>

<!-- eslint-disable vue/no-v-html -->
<!-- eslint-disable vue/max-attributes-per-line -->
<template>
  <div>
    <div class=" w-full p-2 h-full relative">
      <div class="p-1 rounded-l-md h-8 w-min rounded absolute left-4 top-6" :class="getloadingInvoice ? '' : 'bg-gray-200'">
        <svg
          v-if="!getloadingInvoice"
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6 cursor-pointer"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          @click="reset"
        >
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
        </svg>
        <Spinner v-else />
      </div>

      <!--pagination-->
      <div v-show="getInvoicePaginated.links" class=" w-full p-2 border  shadow-xl rounded mt-2  ">
        <div class=" m-2 flex flex-row flex-nowrap justify-center items-center">
          <span
            v-for="(link, n) in getInvoicePaginated.links"
            :key="n" :class="getInvoicePaginated.current_page == link.label?' text-red-600':' text-black'" class=" px-2 cursor-pointer" @click="loadPaginationPage(link.url)" v-html="link.label"
          />
        </div>
      </div>

      <div class=" w-full p-5 border  shadow-xl rounded mt-5">
        <Invoice
          v-for="(invoice,n) in getInvoicePaginated.data "
          :key="n"
          :invoice="invoice"
          :loading="loadinghandleInvoice"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { debounce } from 'lodash'
import { mapGetters, mapActions, mapMutations } from 'vuex'
import Invoice from '@/components/common/orderUnfiltered/Invoice'
import Spinner from '@/components/filters/Spinner2'
export default {
  components: { Invoice, Spinner },

  data () {
    return {
      loadinghandleInvoice: false,
      update: debounce(() => this.loadInvoicesPaginated(), 500)
    }
  },

  computed: {
    ...mapGetters(['getInvoicePaginated', 'getloadingInvoice', 'getSearch'])
  },

  watch: {
    getSearch: {
      handler () {
        this.update()
      }
    }
  },

  mounted () {
    this.loadInvoicesPaginated()
  },

  methods: {
    ...mapActions(['loadInvoicesPaginated', 'loadInvoicePaginationPage']),
    ...mapMutations(['RESET_SEARCH']),

    reset () {
      this.RESET_SEARCH()
      this.loadInvoicesPaginated()
    },

    loadPaginationPage (url) {
      this.loadInvoicePaginationPage(url)
    }
  }
}
</script>

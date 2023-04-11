<template>
  <div>
    <div class="  w-full p-2 h-full relative">
      <div class="p-1 rounded-l-md h-8 w-min rounded absolute top-6 left-4" :class="getLoadingOrders ? '' : 'bg-gray-200'">
        <svg
          v-if="!getLoadingOrders"
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
      <div v-show="getOrdersPaginated.links" class=" w-full p-2 shadow-xl rounded mt-2  ">
        <div class=" m-2 flex flex-row flex-nowrap justify-center items-center">
          <span
            v-for="(link, n) in getOrdersPaginated.links"
            :key="n"
            :class="getOrdersPaginated.current_page == link.label ?
              ' text-red-600' : ' text-black'"
            class=" px-2 cursor-pointer"
            @click="loadPaginationPage(link.url)" v-html="link.label"
          />
        </div>
      </div>

      <div class=" w-full p-2 mt-5">
        <Order
          v-for="(order,n) in getOrdersPaginated.data "
          :key="n"
          :order="order"
          :users="getUsers"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { debounce } from 'lodash'
import { mapGetters, mapActions, mapMutations } from 'vuex'
import Order from '@/components/common/orderUnfiltered/UnfilteredOrder'
import Spinner from '@/components/filters/Spinner2'
export default {
  name: 'ContentOrders',

  components: { Order, Spinner },

  data () {
    return {
      ordersPaginated: [],
      ordersDebounced: debounce(() => this.loadOrdersPaginated(), 500)

    }
  },

  computed: {
    ...mapGetters(['getOrdersPaginated', 'getLoadingOrders', 'getSearch', 'getUsers'])
  },

  watch: {
    getSearch: {
      handler (value) {
        this.ordersDebounced()
      }
    }
  },

  mounted () {
    this.loadOrdersPaginated()
  },

  methods: {
    ...mapActions(['loadOrdersPaginated']),
    ...mapMutations(['RESET_SEARCH']),

    reset () {
      this.RESET_SEARCH()
      this.loadOrdersPaginated()
    },

    loadPaginationPage (url) {
      if (this.getLoadingOrders) { return }
      if (!url) { return }
      this.loadOrdersPaginated(url)
    }
  }
}
</script>

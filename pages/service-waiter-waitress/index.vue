<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class=" min-w-min main">
    <div class="flex flex-row">
      <div class="scroll min-h-screen h-full">
        <div class="p-1 pt-10">
          <User
            v-for="(objuser, n) in users"
            :key="n"
            v-model="user"
            :user="objuser"
            :invoices="receiptsFiltered"
          />
        </div>
      </div>

      <div class="w-full h-full min-h-screen shadow-md">
        <div class="w-full py-4 pl-5">
          <div class="flex flex-row">
            <div class="w-min whitespace-nowrap border-black border-r-2 mr-2">
              <span class="uppercase text-gray-500 font-black text-lg mr-2">selected account</span>
            </div>
            <span class="uppercase text-red-600 text-lg"> {{ user.name }} </span>
          </div>
          <div class="relative">
            <Menu
              :user="user"
              @mousemove.native="mouseMove"
              @refresh="loadInvoices"
            />
          </div>
        </div>
        <Invoices
          v-if="orders.length > 0"
          :user="user"
          :invoices="orders"
          @mousemove.native="mouseMove"
        />
        <div v-else class=" w-full flex justify-center items-center min-h-screen">
          <span class=" text-gray-200 text-6xl capitalize animate-pulse">select orders to show</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { filter } from 'lodash'
import debounce from 'lodash/debounce'
import { mapGetters, mapActions, mapMutations } from 'vuex'
import Menu from '@/components/common/Menu'
import User from '@/components/common/User'
import Invoices from '@/components/common/invoices/Invoices'
export default {
  components: { Menu, User, Invoices },
  layout: 'servicewaiterwairess',
  async asyncData ({ $axios, store }) {
    const [resp] = await Promise.all([
      $axios.$post('AllUsers', {}, { headers: { 'X-CSRF-TOKEN': store.state.token } })
    ])
    return { users: filter(resp.users, function (o) { return (o.section == 'SERVICE-WAITER-WAITRESS') }) }
  },
  data () {
    return {
      user: {
        id: null,
        section: null,
        name: null
      },
      receiptsFiltered: [],
      orders: [],
      timeout: debounce(() => this.reset(), 15000)
    }
  },
  computed: {
    ...mapGetters({ receipts: 'getReceipts', timer: 'getTimer', interval: 'getTimerInterval' })
  },

  watch: {
    'user.id': {
      handler (value, oldval) {
        if (value === oldval) { return }
        this.receiptsSorted()
      }
    },
    receiptsFiltered: {
      handler () {
        this.receiptsSorted()
      }
    },
    receipts: {
      handler (value) {
        this.receiptsFiltered = filter(value, function (o) {
          return (o.section == 'SERVICE-WAITER-WAITRESS' && o.status != 15)
        })
      }
    }
  },

  mounted () {
    this.loadInvoices()
    clearInterval(this.timer)
    this.timerInterval()
  },

  methods: {
    ...mapActions(['loadInvoices']),
    ...mapMutations(['setTimer']),

    mouseMove (e) {
      this.timeout()
    },
    timerInterval () {
      this.setTimer(setInterval(this.loadInvoices, this.interval))
    },
    receiptsSorted () {
      const uid = this.user.id
      if (Object.keys(this.receiptsFiltered).length > 0 && uid > 0) {
        this.orders = filter(this.receiptsFiltered, function (o) {
          return (o.uID == uid)
        })
      } else {
        this.orders = []
      }
    },
    reset () {
      this.orders = []
      this.user = { id: null, section: null, name: null }
    }
  }

}
</script>

<style scoped>
.scroll {
  overflow-y: scroll;
}

.scroll::-webkit-scrollbar {
    display: none;
}

.scroll {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>

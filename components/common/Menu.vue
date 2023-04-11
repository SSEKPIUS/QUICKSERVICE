<template>
  <div class=" mb-5 absolute top-0 left-0 w-min">
    <div class="max-w-max p-2 border  shadow-2xl mt-1 flex flex-row cursor-pointer bg-gray-400 rounded-r-md hover:text-white" @click="$modal.show('menu')">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
      </svg>
      <span class=" px-1 uppercase">menu</span>
    </div>

    <modal name="menu" :draggable="true" :scrollable="true" width="60%" height="100%">
      <div class=" h-full flex flex-col">
        <div class=" p-5">
          <div>********search**********</div>
          <div class="rounded-md mt-2 px-2 shadow-xl">
            <Major
              v-if="Object.keys(minorMenu).length === 0 && Object.keys(minorMenuOrder).length === 0" :menu="menuUnique"
              @clicked="fnselectionMain"
            />
            <Minor
              v-if="Object.keys(minorMenu).length > 0 && Object.keys(minorMenuOrder).length === 0" :menu="minorMenu"
              @clicked="setMinors" @cancel="back"
            />
            <MinorOrder
              v-if="Object.keys(minorMenuOrder).length > 0"
              :menu="minorMenuOrder" @add="add"
              @cancel="cancel" @clear="back"
            />
          </div>
        </div>
        <Invoice
          :receipt="receipt"
          class=" px-5 h-full m-0"
        />
        <div class="flex absolute bottom-2 right-2 z-50">
          <input type="button" class="button button-error" style=" margin-left: auto;" value="CLEAR" @click="clear">
          <input type="button" class="button button-success" value="SAVE" @click="saveReceipt">
        </div>
      </div>
    </modal>
  </div>
</template>

<script>
import { filter, uniqBy, reduce, shuffle } from 'lodash'
import { mapGetters, mapActions } from 'vuex'
import Major from './menu/Major.vue'
import Minor from './menu/Minor.vue'
import MinorOrder from './menu/MinorOrder.vue'
import Invoice from '@/components/common/InvoiceMini'

export default {
  components: { Invoice, Major, Minor, MinorOrder },
  props: {
    user: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      blendedMenu: [],
      minorMenu: [],
      minorMenuOrder: [],
      receipt: {
        uID: null,
        name: '',
        section: '',
        status: 5, // 5 unpaid, 10 paid
        TTotal: 0,
        orders: []
      }
    }
  },

  computed: {
    ...mapGetters({ menu: 'getAllMenu', token: 'getToken' }),
    menuUnique () {
      return uniqBy(this.blendedMenu, 'category')
    }
  },

  watch: {
    'receipt.orders': {
      deep: true,
      imediate: true,
      handler (value) {
        if (value.length > 0) {
          this.receipt.TTotal = reduce(value, (sum, obj) => sum + parseFloat(obj.price), 0)
        }
      }
    }
  },
  mounted () {
    const hold = async () => {
      await this.fetchAllMenu()
      this.blendedMenu = shuffle([...this.menu.Kitchen, ...this.menu.Bar])
    }
    hold()
  },

  methods: {
    ...mapActions(['fetchAllMenu']),
    clear () {
      this.minorMenu = []
      this.minorMenuOrder = []
      this.receipt = { uID: null, name: '', section: '', status: 5, TTotal: 0, orders: [] }
    },
    setMinors (obj) {
      this.minorMenuOrder = obj
    },
    fnselectionMain (category) {
      this.minorMenu = filter([...this.menu.Kitchen, ...this.menu.Bar], function (obj) {
        return (obj.category == category)
      })
    },
    async saveReceipt () {
      const usr = this.user
      let receipt = this.receipt
      if (usr.id && usr.section && usr.name) {
        receipt = { ...receipt, uID: usr.id, name: usr.name, section: usr.section }
        if (receipt.orders.length > 0) {
          try {
            await this.$axios.$post('addReceipts', receipt, { headers: { 'X-CSRF-TOKEN': this.token } })
              .then(({ result }) => {
                if (result) {
                  this.clear()
                  this.$toast.success('Receipt Published!')
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
        } else {
          this.$toast.error('Please add orders to invoice!')
        }
      } else {
        this.$toast.error('Please Select an account on the left!')
      }
    },
    add (obj) {
      const usr = this.user
      if (usr.id && usr.section && usr.name) {
        this.receipt.orders.push({ ...obj, uID: usr.id, names: usr.name, sentfrom: usr.section })
        this.minorMenuOrder = []
      }
    },
    cancel () {
      this.minorMenuOrder = []
    },
    back () {
      this.minorMenuOrder = this.minorMenu = []
    }
  }
}
</script>

<style scoped>
.scrollbar-hide::-webkit-scrollbar {
  display: none;
}

.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>

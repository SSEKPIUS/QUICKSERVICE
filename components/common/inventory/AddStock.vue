<template>
  <div class="w-full p-5 shadow-xl flex bg-gray-50">
    <div
      v-show="parseInt(menuidMajor) > 0"
      class=" border bg-white p-1  rounded-md flex justify-around ml-auto shadow-lg"
    >
      <div class="flex flex-col justify-center mx-4">
        <p class="text-gray-900 dark:text-gray-300 uppercase font-bold uppercase">
          {{ getMenuidMajor[0] ? getMenuidMajor[0].category : "" }}
        </p>
      </div>
    </div>

    <div
      v-show="parseInt(menuidMinor) > 0"
      class=" border bg-white p-1 rounded-md flex justify-around ml-2 shadow-lg"
    >
      <div class="flex flex-col justify-center mx-4">
        <p class="text-gray-900 dark:text-gray-300 font-bold uppercase">
          {{ getMenuidMinor[0] ? getMenuidMinor[0].category : "" }}
        </p>
      </div>
    </div>

    <div
      v-show="parseInt(unitid) > 0 && getMenuidMinor[0]"
      class=" border bg-white p-1 rounded-md flex justify-around ml-2 shadow-lg"
    >
      <div class="flex flex-col justify-center mx-4">
        <p class="text-gray-900 dark:text-gray-300 font-bold uppercase">
          <span class=" text-gray-500">UNIT</span>  ({{ getUnitid[0] ? getUnitid[0].category : "" }})
        </p>
      </div>
      <svg
        v-if="!loading"
        xmlns="http://www.w3.org/2000/svg"
        class="h-10 w-10 cursor-pointer text-green-800 hover:text-black transform hover:translate-x-2"
        viewBox="0 0 20 20"
        fill="currentColor"
        @click="addStock"
      >
        <path
          d="M2 6a2 2 0 012-2h5l2 2h5a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V6z"
        />
        <path
          stroke="#fff"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M8 11h4m-2-2v4"
        />
      </svg>
      <Spinner v-else class="h-10 w-10 rounded-full" />
    </div>
  </div>
</template>

<script>
import { filter } from 'lodash'
export default {
  name: 'AddStoc',
  props: {
    menuidMajor: {
      type: Number,
      default: 0
    },
    menuidMinor: {
      type: Number,
      default: 0
    },
    unitid: {
      type: Number,
      default: 0
    },
    inventoryMajorPaginated: {
      type: [Object, Array],
      default: () => []
    },
    inventoryMinorPaginated: {
      type: [Object, Array],
      default: () => []
    },
    unitsPaginated: {
      type: [Object, Array],
      default: () => []
    },
    usersection: {
      type: String,
      default: ''
    },
    token: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      loading: false
    }
  },
  computed: {
    getMenuidMajor () {
      const id = this.menuidMajor
      return filter(this.inventoryMajorPaginated, function (o) {
        return o.stocks_id == id
      })
    },
    getMenuidMinor () {
      const id = this.menuidMinor
      return filter(this.inventoryMinorPaginated, function (o) {
        return o.stock1s_id == id
      })
    },
    getUnitid () {
      const id = this.unitid
      return filter(this.unitsPaginated, function (o) {
        return o.stock2s_id == id
      })
    }
  },
  methods: {
    addStock () {
      if (this.getMenuidMajor[0] && this.getMenuidMinor[0] && this.getUnitid[0]) {
        this.addStocks(
          this.usersection, // Section
          this.getMenuidMinor[0].category, // Stocks
          this.menuidMinor, //  stock1sid
          this.getMenuidMajor[0].category, // Category
          this.getUnitid[0].category // Unit
        )
      } else {
        this.$toast.error('Make Full Selection')
      }
    },
    async addStocks (Section, Stocks, stock1sid, Category, Unit) {
      const bodyParameters = {
        section: Section,
        stocks: Stocks,
        stock1s_id: stock1sid,
        category: Category,
        unit: Unit
      }
      this.loading = true
      try {
        await this.$axios
          .$post('AddStocks', bodyParameters, { headers: { 'X-CSRF-TOKEN': this.token } })
          .then(({ result }) => {
            if (result) {
              this.$toast.success('Added ' + Category)
              this.$emit('refresh')
            } else {
              this.$toast.error('Adding ' + Category + ' might have failed!')
            }
          })
          .catch((errors) => {
            if (errors.response.data.message) {
              this.$toast.error(
                this.$ObjTemplate.trim(errors.response.data.message)
              )
            } else {
              this.$toast.error(
                this.$ObjTemplate.trim(errors.response.request.statusText)
              )
            }
          })
      } catch (e) {
        this.$toast.error(e)
      }
      this.loading = false
    }
  }
}
</script>

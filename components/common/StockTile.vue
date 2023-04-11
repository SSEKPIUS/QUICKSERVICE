<template>
  <div class=" w-full h-auto border rounded-sm shadow-xl p-4 mb-1">
    <div class=" flow-root items-center w-full flex-row flex-nowrap">
      <span class=" w-11/12 text-left float-left uppercase text-base font-extrabold text-transparent bg-clip-text bg-gradient-to-r  from-gray-900 to-pink-600">{{ stock.stocks }}</span>
      <span class=" float-right">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6 cursor-pointer"
          :class="usersection == 'SUPERVISOR' ? 'text-red-500' : 'text-gray-500' "
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          @click="deleteTile()"
        >
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
        </svg>
      </span>
    </div>

    <popper
      trigger="clickToOpen"
      :options="{
        placement: 'top',
        modifiers: { offset: { offset: '0,10px' } }
      }"
    >
      <div class="popper">
        <div class=" w-full px-3">
          <!--stock usage-->
          <div
            v-show="(stock.section === usersection && stockOperationUse == true) ||
              (stockOperationUse == true && usersection == 'STORE' && (stock.section == 'STORE' || stock.section == 'HOUSE' || stock.section == 'LAUNDRY' || stock.section == 'CLEANER'))"
            class="border shadow-md my-2 p-2 bg-white"
          >
            <label for="outbound" class=" capitalize  w-full text-sm font-black">stock usage</label>
            <BaseDropdownTiles
              :selection="selectOperations"
              selected-text="type"
              @fnselection="consumeStock"
            />
            <div class=" mx-1">
              <input
                id="outbound"
                v-model="StockOperationsData"
                type="number"
                min="0"
                name="outbound"
                class=" border text-center rounded-sm w-full mb-2 mt-2"
              >
              <input
                v-show="StockOperationsData > 0"
                type="button"
                value="Apply"
                class=" border w-full cursor-pointer border-green-400  hover:border-blue-500 uppercase font-bold rounded-sm"
                @click="consumeTile()"
              >
            </div>
          </div>
          <!--Correct Stock-->
          <div
            v-show="usersection == 'SUPERVISOR'"
            class="border shadow-md my-2 p-2 bg-white"
          >
            <div class="flex flex-col w-full">
              <label for="outbound" class=" capitalize  w-full text-sm font-black">Correct Stock</label>
              <label for="outbound" class=" capitalize  w-full text-xs font-base text-red-600">ADD</label>
              <input
                id="outbound"
                v-model="fix_inboundData"
                type="number"
                min="0"
                name="outbound"
                class=" border w-full mb-2 text-center rounded-sm"
              >
              <input
                v-show="fix_inboundData > 0"
                type="button"
                value="ADD"
                class=" border w-full  cursor-pointer border-green-400  hover:border-blue-500 uppercase font-bold  rounded-sm"
                @click="fixInboundTile()"
              >
              <label for="outbound" class=" capitalize  w-full text-xs font-base text-red-600">REMOVE</label>
              <input
                id="outbound"
                v-model="fix_outboundData"
                type="number"
                min="0"
                name="outbound"
                class=" border w-full mb-2 text-center rounded-sm"
              >
              <input
                v-show="fix_outboundData > 0"
                type="button"
                value="REMOVE"
                class=" border w-full  cursor-pointer border-green-400  hover:border-blue-500 uppercase font-bold  rounded-sm"
                @click="fixOutboundTile()"
              >
            </div>
          </div>
          <!--add to stock-->
          <div
            v-show="(usersection == 'STORE' && stock.section == 'STORE')"
            class="border shadow-md my-2 p-2 bg-white"
          >
            <label for="inbound" class=" capitalize w-full text-sm font-black">add to stock</label>
            <input
              id="inbound"
              v-model="inboundData"
              type="number"
              min="0"
              name="inbound"
              class=" border w-full mb-2 text-center rounded-sm"
            >
            <input
              v-show="inboundData > 0"
              type="button"
              value="Restock"
              class=" border w-full  cursor-pointer border-green-400 hover:border-blue-500 uppercase font-bold  rounded-sm"
              @click="inboundTile()"
            >
          </div>
          <!--Trasfer stock-->
          <div
            v-show="(usersection == 'STORE' && stock.section == 'STORE')"
            class="border shadow-md my-2 p-2 bg-white"
          >
            <label for="outbound" class=" capitalize  w-full text-sm font-black">Trasfer stock</label>
            <BaseDropdownTiles
              :selection="getUserDepartments"
              selected-text="Select"
              @fnselection="selectDept"
            />
            <BaseDropdownTiles
              :selection="getUsersBYdept"
              selected-text="Select"
              @fnselection="selectUser"
            />
            <div class=" mx-1">
              <input
                id="outbound"
                v-model="outboundData"
                type="number"
                min="0"
                name="outbound"
                class=" border w-full mb-2 mt-2 text-center rounded-sm"
              >
              <input
                v-show="outboundData > 0"
                type="button"
                value="Transfer"
                class=" border w-full  cursor-pointer border-green-400  hover:border-blue-500 uppercase font-bold  rounded-sm"
                @click="outboundTile()"
              >
            </div>
          </div>
        </div>
      </div>

      <button slot="reference" class=" w-full">
        <div>
          <span class=" text-left float-left capitalize text-base text-transparent bg-clip-text text-gray-500 hover:text-gray-700 transform hover:translate-x-1 font-bold cursor-pointer">{{ stock.section }}
            <span class="text-gray-400 text-base uppercase">( {{ stock.category }} )</span>
          </span>
        </div>
      </button>
    </popper>

    <div class=" flex flex-row items-start w-full">
      <span class=" uppercase mr-4 text-xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r  from-gray-900 to-blue-600 oldstyle-nums">
        {{ getStockdiff }}
      </span>
      <span class=" capitalize text-gray-500 text-left">
        <span class=" text-base font-bold">
          {{ stock.stocks }}  {{ stock.unit | pluralize( parseInt(getStockdiff)) }}
        </span>
      </span>
    </div>

    <div class="items-center w-full overflow-x-hidden">
      <div class=" flex align-middle justify-center relative">
        <ChartDoughnut :key="component_key" :height="150" :chartdata="chatData.data" :options="chatData.options" />
      </div>
    </div>
  </div>
</template>

<script>
// @collapse
import Popper from 'vue-popperjs'
import 'vue-popperjs/dist/vue-popper.css'

import { map, uniq, remove, filter } from 'lodash'
import round from 'lodash/round'
import randomColor from 'randomcolor'
import BaseDropdownTiles from '@/components/filters/BaseDropdownTiles'

export default {
  components: {
    BaseDropdownTiles,
    Popper
  },
  props: {
    stock: {
      type: [Array, Object],
      required: true
    },
    usersection: {
      type: String,
      default: ''
    },
    stockOperationUse: {
      type: Boolean,
      default: false
    },
    selectionUsers: {
      type: [Array, Object],
      required: true
    }

  },

  data () {
    return {
      component_key: 0,
      selectedDepartment: null,
      selectedUser: null,
      selectedUseOperation: null,
      inboundData: null,
      fix_inboundData: null,
      outboundData: null,
      fix_outboundData: null,
      StockOperationsData: null
    }
  },

  computed: {
    selectOperations () { return ['Used', 'Expired', 'Lost', 'Damaged'] },

    getStockdiff () { return parseInt(this.stock.inbound) - parseInt(this.stock.outbound) },

    getUserDepartments () {
      let section = map(this.selectionUsers, 'section')
      section = uniq(section, 'section')
      section = remove(section, function (currentObject) {
        return (currentObject.toLowerCase() !== 'store' && currentObject.toLowerCase() !== 'administrator')
      })
      return section
    },

    getUsersBYdept () {
      const selectedDepartment = this.selectedDepartment
      const users = filter(this.selectionUsers, function (o) {
        return (o.section == selectedDepartment)
      })
      return map(users, 'name')
    },

    chatData () {
      return {
        data: {
          labels: ['Stocked'],
          datasets: [
            {
              backgroundColor: [randomColor()],
              data: this.percIncrease(this.stock.inbound, this.stock.outbound)
            }
          ],
          offset: 0,
          borderWidth: 10
        },
        options: {
          responsive: true,
          maintainAspectRatio: true,
          animation: {
            animateRotate: true,
            duration: 2000
          },
          tooltips: {
            enabled: true // show tooltips
          },
          cutoutPercentage: 80, // cahrt breadth,
          legend: {
            // display: false,
            position: 'top',
            labels: {
              boxWidth: 9,
              usePointStyle: true
            }
          }
        }
      }
    }
  },

  watch: {
    inboundData: {
      handler (newvalue) {
        if (parseInt(newvalue) > 0) { this.outboundData = null }
      }
    },
    outboundData: {
      handler (newvalue) {
        if (parseInt(newvalue) > 0) { this.inboundData = null }
      }
    },
    fix_inboundData: {
      handler (newvalue) {
        if (parseInt(newvalue) > 0) { this.fix_outboundData = null }
      }
    },
    fix_outboundData: {
      handler (newvalue) {
        if (parseInt(newvalue) > 0) { this.fix_inboundData = null }
      }
    },
    'chatData.data.datasets': {
      handler (newvalue) {
        this.component_key += 1 /* refresh component */
      }
    }
  },

  methods: {
    percIncrease (inbound, outbound) {
      const perc = round(((inbound - outbound) / inbound) * 100, 2).toFixed(0)
      return [perc, (100 - perc)]
    },

    selectDept (val) {
      this.selectedUser = null
      this.selectedDepartment = val
    },

    selectUser (val) {
      this.selectedUser = val
    },

    deleteTile () {
      if (this.usersection == 'SUPERVISOR') { this.$emit('deleteStock', this.stock) }
    },

    inboundTile () {
      if (this.stock && this.inboundData > 0) {
        this.$emit('inboundTile', this.stock, this.inboundData)
        this.inboundData = null
      } else { this.$toast.error('Make Selections!') }
    },

    outboundTile () {
      if (this.stock && this.selectedDepartment && this.selectedUser && this.outboundData > 0) {
        this.$emit('outboundTile', this.stock, this.selectedDepartment, this.selectedUser, this.outboundData)
        this.outboundData = null
      } else { this.$toast.error('Make Selections!') }
    },

    fixInboundTile () {
      if (this.stock && this.fix_inboundData > 0) {
        this.$emit('fixinboundStock', this.stock, this.fix_inboundData)
        this.fix_inboundData = null
      } else { this.$toast.error('Make Selections!') }
    },

    fixOutboundTile () {
      if (this.stock && this.fix_outboundData > 0) {
        this.$emit('fixoutboundStock', this.stock, this.fix_outboundData)
        this.fix_outboundData = null
      } else { this.$toast.error('Make Selections!') }
    },

    consumeStock (val) {
      this.selectedUseOperation = val
    },

    consumeTile () {
      if (this.selectedUseOperation && (this.StockOperationsData > 0)) {
        this.$emit('consumeTile', this.stock, this.selectedUseOperation, this.StockOperationsData)
        this.StockOperationsData = null
      } else { this.$toast.error('Make Selections!') }
    }
  }
}
</script>

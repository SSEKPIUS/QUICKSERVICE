<template>
  <div class="container mx-auto p-2  my-2">
    <div class="bg-gray-50 mx-auto border rounded-sm shadow-lg text-gray-700 h-auto">
      <div class="flex p-3 border-l-8" :class="getorderStatus(parseInt(order.status)).styeBorder">
        <div class="space-y-1 border-r-2 pr-3">
          <div class="text-sm text-left  leading-5 font-semibold whitespace-nowrap">
            <span class="text-xs leading-4 font-normal text-gray-500"> OrderID #</span> <span class=" font-extrabold"> {{ order.OrderID }} </span>
          </div>
          <div class="text-sm text-left  leading-5 font-semibold whitespace-nowrap">
            <span class="text-xs leading-4 font-normal text-gray-500"> USER </span> <span class=" font-extrabold"> {{ getSortedUserName }} </span>
          </div>
          <div class="text-sm text-left  leading-5 font-semibold whitespace-nowrap">
            <span class="text-xs leading-4 font-normal text-gray-500 pr"> Invoice #</span> <span class=" font-extrabold">  {{ order.receipts_id }} </span>
          </div>
          <div class="text-sm text-left  leading-5 font-semibold whitespace-nowrap">
            <span class="text-xs leading-4 font-normal text-gray-500 pr"> Amount:</span> <span class=" text-xs font-extrabold"> UGX: {{ order.cost }} </span>
          </div>
          <div class="text-sm text-left  leading-5 font-semibold text-gray-500 whitespace-nowrap">
            {{ order.created_at | humanDayDate }}
          </div>
        </div>

        <div class="flex-1">
          <div class="ml-3 space-y-1 pr-3">
            <div class="text-base text-left  leading-6 uppercase font-extrabold whitespace-nowrap">
              {{ order.dish }}
            </div>
            <div class="text-sm text-left  leading-4 font-normal uppercase">
              {{ order.Description }}
            </div>
            <div class="text-xl text-left  leading-4 text-blue-600 font-black">
              {{ order.qty }} {{ 'Unit' | pluralize( parseInt(order.qty)) }}
            </div>
            <div class="text-sm  text-left  leading-4 font-normal whitespace-nowrap">
              Fom: <span class=" font-extrabold">{{ order.SentFrom }} </span> <br>To: <span class=" font-extrabold">{{ order.section }} </span>
            </div>
          </div>
        </div>

        <div v-show="order.reason" class="w-full my-auto">
          <div class="mx-3 my-1 border-gray-200 border-2 bg-gray-100 p-1 h-full">
            <div class="uppercase text-xs leading-4 font-medium text-left">
              Reason:
            </div>
            <div class="text-xs leading-4 font-normal max-w-sm text-gray-500 text-left h-full">
              {{ order.reason }}
            </div>
          </div>
        </div>

        <div class="flex items-center min-w-max ">
          <div class="flex h-full items-center min-w-max p-1 w-20 rounded-md">
            <div class=" w-full uppercase text-xs px-1 leading-4 font-black text-center text-yellow-100">
              <span class=" px-4 rounded-sm py-1" :class="getorderStatus(parseInt(order.status)).styeBg">  {{ getorderStatus(parseInt(order.status)).text }} </span>
            </div>
          </div>
        </div>

        <div class="flex items-center ">
          <div class="flex flex-col items-center">
            <div class=" p-1 flex flex-row items-center">
              <SwitchContainer
                :loading-perm="serving"
                :state="getStateServed"
                @handleToggleActive="showModal = true; modalRoutine = 'handleServe'; Modalmessage = 'Served?'; requireMessage=false"
              />
              <span class=" capitalize font-extrabold text-gray-400 text-sm" :class="{'text-green-400' : getStateServed}"> served </span>
            </div>
            <div class=" p-1 flex flex-row items-center">
              <SwitchContainer
                :loading-perm="cancelling"
                :state="getStateCancelled"
                @handleToggleActive="showModal = true; modalRoutine = 'handleCancel'; Modalmessage = 'Do you Wish to Cancel!'; requireMessage=true"
              />
              <span class=" capitalize font-extrabold text-gray-400 text-sm" :class="{'text-red-400' : getStateCancelled}"> cancel </span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Dialog
      v-show="showModal"
      :showmodal.sync="showModal"
      :head="Modalhead"
      :message="Modalmessage"
      :modal-routine="modalRoutine"
      :require-message="requireMessage"
      @click-modal="clickmodal"
    />
  </div>
</template>

<script>
import { filter, debounce } from 'lodash'
import SwitchContainer from '@/components/common/SwitchContainer'
import Dialog from '@/components/dialog/Dialog.vue'
export default {
  name: 'OrderFiltered',
  components: { SwitchContainer, Dialog },
  props: {
    users: {
      type: [Object, Array],
      required: true
    },
    order: {
      type: [Object, Array],
      required: true
    }
  },
  data () {
    return {
      serving: false,
      cancelling: false,
      // start mordal
      requireMessage: false,
      showModal: false,
      modalRoutine: null,
      Modalhead: this.order.dish,
      Modalmessage: null
      // end mordal
    }
  },
  computed: {
    getStateServed () {
      return parseInt(this.order.status) == 15
    },

    getStateCancelled () {
      return parseInt(this.order.status) == 25
    },

    getSortedUserName () {
      return this.sortUser()
    }
  },
  methods: {
    sortUser () {
      const srt = this.order.uID
      const usr = filter(this.users, function (o) {
        return (o.id == srt)
      })
      return usr[0] ? usr[0].name : ''
    },
    clickmodal (bol, mode, message = null) {
      this.showModal = false
      if (bol == true) {
        switch (mode) {
          case 'handleServe' :
            this.handleServe()
            break
          case 'handleCancel' :
            this.handleCancel(message)
            break
          default :
        }
      }
    },
    getorderStatus (val) {
      switch (val) { // 5 pending, 10 new  15 served 20 cancelled
        case 5:
          return { styeBorder: 'border-yellow-100', styeBg: 'bg-yellow-100 text-yellow-800', text: 'Pending' }
        case 10:
          return { styeBorder: 'border-blue-100', styeBg: 'bg-blue-100 text-blue-800', text: 'New' }
        case 15:
          return { styeBorder: 'border-green-100', styeBg: 'bg-green-100 text-green-800', text: 'Served' }
        case 20:
          return { styeBorder: 'border-red-100', styeBg: 'bg-red-100 text-red-800 animate-bounce', text: 'Cancelling' }
        case 25:
          return { styeBorder: 'border-red-100', styeBg: 'bg-red-100 text-red-800', text: 'Cancelled' }
        default:
          return { styeBorder: 'border-gray-100', styeBg: 'bg-gray-100 text-gray-800', text: 'Unknown' }
      }
    },
    handleServe () {
      this.serving = true
      this.debounce_fun()
      if (parseInt(this.order.status) == 10) { // 5 pending, 10 new  15 served 20 cancelling 25 cancelled
        this.$emit('changeorderState', this.order.orders_id, 15)
      } else {
        switch (parseInt(this.order.status)) {
          case 5:
            this.$toast.error('This Order is still Pending')
            break
          case 15:
            this.$toast.error('This Order was served')
            break
          case 20:
            this.$toast.error('This Order is cancelling')
            break
          case 25:
            this.$toast.error('This Order is cancelled')
            break
          default:
            break
        }
      }
    },
    handleCancel (message) {
      if (message == null) {
        this.$toast.error('Please Provide Reason for Cancelling')
      } else {
        this.cancelling = true
        this.debounce_fun()
        this.$emit('changeorderState', this.order.orders_id, 25, message)
      }
    },
    debounce_fun () {
      debounce(() => {
        this.cancelling = false
        this.serving = false
      }, 4000)()
    }
  }
}
</script>

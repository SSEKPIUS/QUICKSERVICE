<template>
  <tr class="border-b border-grey-light ">
    <td class="py-2  px-1 text-left" :class="{'line-through':crossed}">
      {{ orderTR.dish }}
    </td>
    <td class="py-2  px-1 text-left" :class="{'line-through':crossed}">
      {{ orderTR.Description }}
    </td>
    <td class="py-2 flex justify-start align-middle items-center px-1 text-left">
      {{ orderTR.qty }}
      <span
        class=" ml-1 px-4 rounded-sm py-1 font-light"
        :class="getClass(parseInt(orderTR.status))"
      > {{ getStatus(parseInt(orderTR.status)) }}
      </span>
    </td>
    <td class="py-2  px-1 text-left font-black" :class="{'line-through':crossed}">
      {{ orderTR.cost | number_format }}
    </td>
    <td class="py-2  px-2 text-left">
      {{ orderTR.reason }}
    </td>
    <td class="py-2  px-2 text-center">
      <div class=" flex flex-col">
        <span v-show="orderTR.destRmn">{{ orderTR.destRmn }}</span>
        <span v-show=" orderTR.destTbl">{{ orderTR.destTbl }}</span>
      </div>
    </td>
    <!--controls-->
    <td class="py-2  px-1">
      <div v-if="parseInt(orderTR.status) != 5" class=" flex flex-col">
        <button
          v-if="parseInt(orderTR.status) == 10"
          class=" text-red-700 hover:text-white text-center font-bold py-1 my-1 px-1 rounded text-xs hover:bg-red-500  bg-red-200 uppercase"
          @click="$emit('cancel', orderTR.orders_id)"
        >
          cancel
        </button>
      </div>
    </td>
  </tr>
</template>

<script>
export default {
  name: 'InvoiceOrderTableRow',
  props: {
    orderTR: {
      type: Object,
      required: true
    }
  },
  computed: {
    crossed () {
      return parseInt(this.orderTR.status) == 25
    }
  },
  methods: {
    getStatus (status) {
      switch (status) { // 5 pending, 10 new  15 served 20 cancelled
        case 5:
          return 'pending'
        case 10:
          return 'new'
        case 15:
          return 'served'
        case 20:
          return 'cancelling'
        case 25:
          return 'cancelled'
        default:
          break
      }
    },

    getClass (status) {
      switch (status) { // 5 pending, 10 new  15 served 20 cancelling 25 cancelled
        case 5:
          return 'bg-gray-100 text-green-700'
        case 10:
          return 'bg-yellow-100 text-yellow-700'
        case 15:
          return 'bg-green-100 text-green-700'
        case 20:
          return 'bg-red-100 text-red-700'
        case 25:
          return 'bg-red-100 text-red-700'
        default:
          break
      }
    }
  }
}
</script>

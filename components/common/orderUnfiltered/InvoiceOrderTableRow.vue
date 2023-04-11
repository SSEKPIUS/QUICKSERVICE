<template>
  <tr>
    <td class="py-2  px-6 text-center">
      {{ orderTR.dish }}
    </td>
    <td class="py-2  px-6 text-center lowercase">
      {{ orderTR.description }}
    </td>
    <td class="py-2  px-6 text-center flex justify-center items-center">
      {{ orderTR.qty }}
      <span
        class=" ml-1 px-4 rounded-sm py-1 font-light"
        :class="getClass(parseInt(orderTR.status))"
      > {{ getStatus(parseInt(orderTR.status)) }}
      </span>
    </td>
    <td class="py-2  px-6 text-center">
      Ugx:{{ orderTR.cost | number_format }}
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

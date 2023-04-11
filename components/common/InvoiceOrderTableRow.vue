<template>
  <tr v-if="((orderTR.section == usersection) && (parseInt(orderTR.status) != 5)) || usersection == 'SUPERVISOR'" class="hover:bg-grey-lighter">
    <td class="py-2  px-6 border-b border-grey-light text-center font-bold">
      {{ orderTR.OrderID }}
    </td>
    <td class="py-2  px-6 border-b border-grey-light text-center">
      {{ orderTR.Names }}
    </td>
    <td class="py-2  px-6 border-b border-grey-light text-center">
      {{ orderTR.Description }}
    </td>
    <td class="py-2  px-6 border-b border-grey-light text-center">
      {{ orderTR.qty }}
    </td>
    <td class="py-2  px-6 border-b border-grey-light text-center">
      {{ orderTR.cost }}
    </td>
    <td class="py-2  px-6 border-b border-grey-light text-center">
      {{ orderTR.SentFrom }}
    </td>
    <td class="py-2  px-6 border-b border-grey-light text-center">
      {{ orderTR.reason }}
    </td>
    <td class="py-2  px-6 border-b border-grey-light text-center uppercase font-extrabold text-white" :class="getClass(parseInt(orderTR.status))">
      <span> {{ getStatus(parseInt(orderTR.status)) }} </span>
    </td>
    <td class="py-2  px-6 border-b border-grey-light">
      <div v-if="parseInt(orderTR.status) != 5" class=" flex flex-col">
        <a
          v-if="parseInt(orderTR.status) == 10 && ((orderTR.SentFrom == usersection) || (orderTR.section == usersection) )"
          href="#"
          class=" text-white text-center font-bold py-0 my-1 px-3 rounded text-xs hover:bg-red-500  bg-red-400 uppercase"
        >cancel</a>
        <a
          v-if="parseInt(orderTR.status) == 10 && orderTR.section == usersection"
          href="#"
          class="text-white text-center font-bold py-0 my-1 px-3 rounded text-xs hover:bg-green-500 bg-green-400 uppercase"
        >serve</a>
        <a
          v-if="(parseInt(orderTR.status) == 15 || parseInt(orderTR.status) == 20) && ((orderTR.SentFrom == usersection) || (orderTR.section == usersection) )"
          href="#"
          class="text-white text-center  font-bold py-0 my-1 px-3 rounded text-xs hover:bg-blue-500 bg-blue-400 uppercase"
        >restore</a>
      </div>
      <div v-else>
        Pending
      </div>
    </td>
  </tr>
</template>

<script>
export default {
  // eslint-disable-next-line vue/require-prop-types
  props: ['orderTR', 'loading', 'usersection'],

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
          return 'bg-gray-500'
        case 10:
          return 'bg-yellow-500'
        case 15:
          return 'bg-green-500'
        case 20:
          return 'bg-red-300'
        case 25:
          return 'bg-red-500'
        default:
          break
      }
    }

  }
}
</script>

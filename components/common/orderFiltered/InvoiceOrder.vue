<template>
  <div class="mx-auto">
    <div>
      <table class="text-left w-full">
        <thead>
          <tr class=" border-b-2 border-grey-light ">
            <th class="py-1  px-1 bg-grey-lightest uppercase text-sm  text-left text-black font-black">
              Item
            </th>
            <th />
            <th class="py-1  px-1 bg-grey-lightest font-black  uppercase text-sm  text-left text-black">
              qty
            </th>
            <th class="py-1  px-1 bg-grey-lightest font-black  uppercase text-sm  text-left text-black">
              cost
            </th>
            <th class="py-1  px-1 bg-grey-lightest font-black  uppercase text-sm  text-left text-black">
              reason
            </th>
            <th class="py-1  px-1 bg-grey-lightest font-black  uppercase text-sm  text-left text-black">
              Dest'n
            </th>
            <th class="py-1  px-1 bg-grey-lightest font-black  uppercase text-sm  text-center text-black">
              controls
            </th>
          </tr>
        </thead>
        <tbody>
          <InvoiceOrderTableRow
            v-for="(order,n) in ordersTR"
            :key="n"
            :order-t-r="order"
            :loading="loading"
            :usersection="usersection"
            class=" my-1"
            @cancel="cancel"
          />
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import InvoiceOrderTableRow from '@/components/common/orderFiltered/InvoiceOrderTableRow'

export default {
  components: { InvoiceOrderTableRow },

  // eslint-disable-next-line vue/require-prop-types
  props: ['ordersTR', 'loading', 'usersection'],

  methods: {
    cancel (ordersid) { this.$emit('cancel', ordersid) }
  }

}
</script>

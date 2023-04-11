<template>
  <div class="mx-auto">
    <table class="text-left w-full border-collapse">
      <thead>
        <tr>
          <th class="py-1  px-1 bg-grey-lightest font-black  uppercase text-xs text-center text-black">
            Item
          </th>
          <th class="py-1  px-1 bg-grey-lightest font-black  uppercase text-xs text-center text-black">
            Description
          </th>
          <th class="py-1  px-1 bg-grey-lightest font-black  uppercase text-xs text-center text-black">
            qty
          </th>
          <th class="py-1  px-1 bg-grey-lightest font-black  uppercase text-xs text-center text-black">
            cost
          </th>
        </tr>
      </thead>
      <tbody>
        <InvoiceOrderTableRow v-for="(order,n) in ordersTR" :key="n" :order-t-r="order" />
      </tbody>
    </table>
  </div>
</template>

<script>
import InvoiceOrderTableRow from '@/components/common/orderUnfiltered/InvoiceOrderTableRow'
export default {
  name: 'InvoiceOrder',
  components: { InvoiceOrderTableRow },
  props: {
    ordersTR: {
      type: [Array, Object],
      required: true
    }
  }
}
</script>

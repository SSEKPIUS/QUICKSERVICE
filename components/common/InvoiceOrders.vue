<template>
  <div class="mx-auto">
    <div class="bg-white shadow-md rounded">
      <table class="text-left w-full border-collapse">
        <!--Border collapse doesn't work on this site yet but it's available in newer tailwind versions -->
        <thead>
          <tr>
            <th class="py-1  px-1 bg-grey-lightest font-black uppercase  text-xs  border-b border-grey-light text-center text-black">
              OrderID
            </th>
            <th class="py-1  px-1 bg-grey-lightest font-black  uppercase text-xs  border-b border-grey-light text-center text-black">
              Names
            </th>
            <th class="py-1  px-1 bg-grey-lightest font-black  uppercase text-xs  border-b border-grey-light text-center text-black">
              Description
            </th>
            <th class="py-1  px-1 bg-grey-lightest font-black  uppercase text-xs  border-b border-grey-light text-center text-black">
              qty
            </th>
            <th class="py-1  px-1 bg-grey-lightest font-black  uppercase text-xs  border-b border-grey-light text-center text-black">
              cost
            </th>
            <th class="py-1  px-1 bg-grey-lightest font-black  uppercase text-xs  border-b border-grey-light text-center text-black">
              SentFrom
            </th>
            <th class="py-1  px-1 bg-grey-lightest font-black  uppercase text-xs  border-b border-grey-light text-center text-black">
              reason
            </th>
            <th class="py-1  px-1 bg-grey-lightest font-black  uppercase text-xs  border-b border-grey-light text-center text-black" />
            <th class="py-1  px-1 bg-grey-lightest font-black  uppercase text-xs  border-b border-grey-light text-center text-black">
              controls
            </th>
          </tr>
        </thead>
        <tbody>
          <InvoiceOrderTableRow v-for="(order,n) in ordersTR" :key="n" :order-t-r="order" :loading="loading" :usersection="usersection" />
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import InvoiceOrderTableRow from '@/components/common/InvoiceOrderTableRow'

export default {
  components: { InvoiceOrderTableRow },

  // eslint-disable-next-line vue/require-prop-types
  props: ['ordersTR', 'loading', 'usersection']

}
</script>

<style lang="scss" scoped>

</style>

<!-- eslint-disable vue/multi-word-component-names-->
<template>
  <div class="container mx-auto p-2 antialiased">
    <div class="bg-gray-50 mx-auto border text-gray-700 h-auto  rounded-sm shadow-md">
      <div class="flex p-3 border-l-8" :class="getorderStatus(parseInt(invoice.status)).styeBorder">
        <div class="space-y-1 border-r-2 pr-3 flex flex-col">
          <p class="text-sm leading-5 font-semibold text-left">
            <span class="text-xs leading-4 font-normal text-gray-500"> Invoice #</span> <span class=" font-extrabold"> {{ invoice.receipts_id }} </span>
          </p>
          <p class="text-sm leading-5 font-semibold text-left">
            <span class="text-xs leading-4 font-normal text-gray-500 pr"> Total:</span> <span class=" font-extrabold"> UGX: {{ invoice.TTotal }} </span>
          </p>
          <p class="text-sm leading-5 font-semibold text-green-500 text-left">
            {{ invoice.section }}
          </p>
          <p class="text-xm leading-5 font-semiboldtext-red-700 text-left">
            {{ invoice.name }}
          </p>
          <p class="text-xs leading-5 font-semibold text-gray-500 text-left">
            {{ invoice.created_at | humanDayDate }}
          </p>
        </div>

        <div class="flex-1">
          <div class="ml-3 space-y-1 pr-3">
            <div class="text-sm leading-4 font-normal">
              <InvoiceOrder
                :orders-t-r="invoice.orders"
                :loading="loading"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import InvoiceOrder from '@/components/common/orderUnfiltered/InvoiceOrder'
export default {
  components: { InvoiceOrder },
  // eslint-disable-next-line vue/require-prop-types
  props: ['invoice', 'loading'],
  methods: {
    getorderStatus (val) {
      switch (val) { // 5 unpaid, 10 paid
        case 5:
          return { styeBorder: 'border-yellow-200', styeBg: 'bg-yellow-200', text: 'Unpaid' }
        case 10:
          return { styeBorder: 'border-green-900', styeBg: 'bg-green-900', text: 'Paid' }
        default:
          return { styeBorder: 'border-gray-400', styeBg: 'bg-gray-00', text: 'Unknown' }
      }
    }
  }
}
</script>

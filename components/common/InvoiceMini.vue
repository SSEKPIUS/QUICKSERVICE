<template>
  <div class="container mx-auto  py-2 antialiased">
    <div class="mx-auto bg-gray-50 shadow-md border rounded-sm text-gray-700 h-auto">
      <div class="flex p-3 border-l-8" :class="getorderStatus(parseInt(receipt.status)).styeBorder">
        <div class="space-y-1 border-r-2 pr-3">
          <div class="text-sm leading-5 font-semibold">
            <span class="text-xs leading-4 font-normal text-gray-500 pr"> Total:</span> <span class=" font-extrabold"> UGX: {{ receipt.TTotal | number_format }} </span>
          </div>
        </div>

        <div class="flex-1">
          <div class="ml-3 space-y-1 border-r-2 pr-3">
            <div class="text-sm leading-4 font-normal max-h-52 overflow-y-scroll">
              <InvoiceOrder :orders-t-r="receipt.orders" />
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
  name: 'InvoiceMini',
  components: { InvoiceOrder },
  props: {
    receipt: {
      type: Object,
      required: true
    }
  },
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

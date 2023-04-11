<template>
  <div class=" w-full p-2 h-full">
    <Orders />
  </div>
</template>

<script>
import Orders from '@/components/common/ordersUnfiltered/Order'
export default {
  components: {
    Orders
  },
  layout: 'accounts'
}
</script>

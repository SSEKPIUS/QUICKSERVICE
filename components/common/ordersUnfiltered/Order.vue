<template>
  <div class="w-full p-2 h-full">
    <div class=" w-full p-2  shadow-xl">
      <BaseFilter
        section="orders"
        section-text="view orders"
        :search="true"
        :options="true"
        :dates="true"
      />
      <ContentOrders />
    </div>
  </div>
</template>

<script>
import BaseFilter from '@/components/filters/BaseFilter'
import ContentOrders from '@/components/common/ordersUnfiltered/ContentOrders'
export default {
  name: 'Order',
  components: {
    ContentOrders, BaseFilter
  }
}
</script>

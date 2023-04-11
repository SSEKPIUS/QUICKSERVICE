<!--  eslint-disable vue/multi-word-component-names -->
<template>
  <div class="w-full p-2 h-full">
    <div class=" w-full p-2 shadow-2xl">
      <BaseFilter
        section="Inventory logs"
        section-text="view logs"
      />
      <ContentInventoryLogs />
    </div>
  </div>
</template>

<script>
import BaseFilter from '@/components/filters/BaseFilter'
import ContentInventoryLogs from '@/components/common/ContentInventoryLogs'
export default {
  components: {
    ContentInventoryLogs, BaseFilter
  }
}
</script>

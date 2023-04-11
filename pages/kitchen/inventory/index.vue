<template>
  <div class=" min-w-min main">
    <div class="min-h-screen  flex flex-row">
      <TabTop :tabs="tabs" />
      <div class=" w-full p-2 text-center mx-auto border shadow-lg">
        <Inventory />
      </div>
    </div>
  </div>
</template>
<script>
import Inventory from '@/components/common/Inventory'
import TabTop from '@/components/common/tabroutes/TabTop'
export default {
  components: {
    Inventory,
    TabTop
  },
  async asyncData ({ store }) {
    await store.commit('RESET_SEARCH')
    await store.commit('SET_SEARCH', { selection: 'KITCHEN' })
  },
  data () {
    return {
      tabs: [
        { name: 'NEW ORDERS', path: '/kitchen/new-orders', active: false, icon: 'fa fa-sort' },
        { name: 'ALL ORDERS', path: '/kitchen/all-orders', active: false, icon: 'fa fa-sort' },
        { name: 'INVENTORY', path: '/kitchen/inventory', active: true, icon: 'fa fa-archive' },
        { name: 'INVENTORY LOGS', path: '/kitchen/inventory-logs', active: false, icon: 'fa fa-file-text' }
      ]
    }
  }
}
</script>
<style scoped>
.main {
   min-width: 1280px;
}
</style>

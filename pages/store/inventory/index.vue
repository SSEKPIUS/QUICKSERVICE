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
    await store.dispatch('loadUsers')
    await store.commit('RESET_SEARCH')
    await store.commit('SET_SEARCH', { selection: 'STORE' })
  },

  data () {
    return {
      users: [],
      tabs: [
        { name: 'INVENTORY', path: '/store/inventory', active: true, icon: 'fa fa-archive' },
        { name: 'INVENTORY LOGS', path: '/store/inventory-logs', active: false, icon: 'fa fa-file-text' }
      ]
    }
  }
}
</script>

<style scoped>
.main {
   min-width: 1280px;
}
.menu li {
    color: #343434;
    font-weight: normal;
    font-family: 'Ultra', sans-serif;
    line-height: 40px;
    text-transform: uppercase;
    text-shadow: 0 2px white, 0 3px #777;
}

@media (max-width: 767px) {
    .menu li {
        font-size: 18px;
        line-height: 10px;
        text-transform: uppercase;
        text-shadow: 0 2px white, 0 3px #777;
    }

}
</style>

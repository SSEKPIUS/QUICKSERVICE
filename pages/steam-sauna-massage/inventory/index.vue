<template>
  <div class="min-w-min main">
    <div>
      <div class="flex flex-row">
        <SideNav
          class="shadow-sm min-h-screen"
        />
        <div class="border w-full">
          <div class="w-full bg-white p-2 text-center mx-auto">
            <Inventory />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import SideNav from '@/components/steamsaunamassage/SideNav'
import Inventory from '@/components/common/Inventory'

export default {
  components: {
    SideNav,
    Inventory
  },
  async asyncData ({ store }) {
    await store.commit('SET_SEARCH', { selection: 'SAUNA-MASSAGE' })
  }
}
</script>

<style scoped>
.main {
  min-width: 1280px;
}
</style>

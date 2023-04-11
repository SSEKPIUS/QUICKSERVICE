<template>
  <div class=" min-w-min main">
    <div class="min-h-screen  flex flex-row">
      <TabTop :tabs="tabs" />
      <div class=" w-full p-2 text-center mx-auto border shadow-lg">
        <MenuKitchen />
      </div>
    </div>
  </div>
</template>

<script>
import MenuKitchen from '@/components/supervisor/menu/MenuKitchen'
import TabTop from '@/components/common/tabroutes/TabTop'
export default {
  components: {
    MenuKitchen,
    TabTop
  },

  data () {
    return {
      tabs: [
        { name: 'MENU BAR', path: '/supervisor/menu-bar', active: false, icon: 'fa fa-glass' },
        { name: 'MENU KITCHEN', path: '/supervisor/menu-kitchen', active: true, icon: 'fa fa-cutlery' },
        { name: 'INVOICES', path: '/supervisor/invoices', active: false, icon: 'fa fa-money' },
        { name: 'ORDERS', path: '/supervisor/orders', active: false, icon: 'fa fa-sort' },
        { name: 'HOTEL ROOMS', path: '/supervisor/rooms', active: false, icon: 'fa fa-bed' },
        { name: 'SAUNA-MASSAGE', path: '/supervisor/sauna-massage', active: false, icon: 'fa fa-tint' },
        { name: 'INVENTORY', path: '/supervisor/inventory', active: false, icon: 'fa fa-archive' },
        { name: 'REPORTS', path: '/supervisor/reports', active: false, icon: 'fa fa-book' },
        { name: 'INVENTORY LOGS', path: '/supervisor/inventory-logs', active: false, icon: 'fa fa-file-text' },
        { name: 'SYSTEM LOGS', path: '/supervisor/system-logs', active: false, icon: 'fa fa-file-text' }
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

<template>
  <div class=" min-w-min main">
    <div class="min-h-screen  flex flex-row">
      <TabTop :tabs="tabs" />
      <div class=" w-full p-2 text-center mx-auto border shadow-lg">
        <div class=" py-3 flex justify-start items-center">
          <span class=" text-gray-500 uppercase font-extrabold text-xl border-gray-600 border-r-4 pr-2 mr-4">section</span>
          <span class=" uppercase font-bold mr-2 cursor-pointer border-black" :class="{'border-b-2 text-blue-900':tab===0}" @click="tab=0">rooms</span>
          <span class=" uppercase font-bold cursor-pointer border-black" :class="{'border-b-2 text-blue-900':tab===1}" @click="tab=1">guests</span>
        </div>
        <div v-show="tab===0" class="w-full p-2 text-center mx-auto">
          <HotelRooms @refresh="loadguestsroomsPaginated()" />
        </div>
        <div v-show="tab===1" class="w-full p-2 text-center mx-auto">
          <Guests />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable no-console */
import { mapGetters, mapActions } from 'vuex'
import HotelRooms from '@/components/supervisor/rooms/HotelRooms'
import TabTop from '@/components/common/tabroutes/TabTop'
import Guests from '@/components/reception/dashboard/Guests'
export default {
  components: {
    HotelRooms,
    Guests,
    TabTop
  },

  data () {
    return {
      tab: 0,
      tabs: [
        { name: 'MENU BAR', path: '/supervisor/menu-bar', active: false, icon: 'fa fa-glass' },
        { name: 'MENU KITCHEN', path: '/supervisor/menu-kitchen', active: false, icon: 'fa fa-cutlery' },
        { name: 'INVOICES', path: '/supervisor/invoices', active: false, icon: 'fa fa-money' },
        { name: 'ORDERS', path: '/supervisor/orders', active: false, icon: 'fa fa-sort' },
        { name: 'HOTEL ROOMS', path: '/supervisor/rooms', active: true, icon: 'fa fa-bed' },
        { name: 'SAUNA-MASSAGE', path: '/supervisor/sauna-massage', active: false, icon: 'fa fa-tint' },
        { name: 'INVENTORY', path: '/supervisor/inventory', active: false, icon: 'fa fa-archive' },
        { name: 'REPORTS', path: '/supervisor/reports', active: false, icon: 'fa fa-book' },
        { name: 'INVENTORY LOGS', path: '/supervisor/inventory-logs', active: false, icon: 'fa fa-file-text' },
        { name: 'SYSTEM LOGS', path: '/supervisor/system-logs', active: false, icon: 'fa fa-file-text' }
      ]
    }
  },

  computed: {
    ...mapGetters(['getToken'])
  },

  mounted () {
    this.loadguestsroomsPaginated()
    this.loadGuestsPaginated()
  },

  methods: {
    ...mapActions(['loadGuestsPaginated', 'loadguestsroomsPaginated'])
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

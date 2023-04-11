
<template>
  <div>
    <div class=" flex flex-col justify-center mx-5 pt-10">
      <div class="text-white text-center w-full mb-5 cursor-pointer">
        <div @click="$emit('selection',1)">
          <div ref="guests" class="p-2 text-xl mx-auto max-w-max rounded-full flex justify-center bg-gray-500">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
            </svg>
          </div>
          <p class="text-sm text-black">
            Guests
          </p>
        </div>
      </div>

      <div class="text-white text-center w-full my-5 cursor-pointer">
        <div @click="$emit('selection',2)">
          <div ref="rooms" class="p-2 text-xl mx-auto max-w-max rounded-full flex justify-center bg-gray-500">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M10.496 2.132a1 1 0 00-.992 0l-7 4A1 1 0 003 8v7a1 1 0 100 2h14a1 1 0 100-2V8a1 1 0 00.496-1.868l-7-4zM6 9a1 1 0 00-1 1v3a1 1 0 102 0v-3a1 1 0 00-1-1zm3 1a1 1 0 012 0v3a1 1 0 11-2 0v-3zm5-1a1 1 0 00-1 1v3a1 1 0 102 0v-3a1 1 0 00-1-1z" clip-rule="evenodd" />
            </svg>
          </div>
          <p class="text-sm text-black">
            Rooms
          </p>
        </div>
      </div>

      <div class="text-white text-center w-full my-5 cursor-pointer">
        <div @click="$emit('selection',3)">
          <div ref="rooms" class="p-2 text-xl mx-auto max-w-max rounded-full flex justify-center bg-gray-500">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 13v-1m4 1v-3m4 3V8M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
            </svg>
          </div>
          <div class="text-sm text-black">
            Orders
            <div v-show="serviceWaiterWaitressArrCount>0" class=" max-w-min -mt-16 -mr-1 px-2 py-1 bg-red-500 text-yellow-50 rounded-full" style=" font-size: 13px">
              {{ serviceWaiterWaitressArrCount }}
            </div>
          </div>
        </div>
      </div>

      <div class="text-white text-center w-full my-5 cursor-pointer">
        <div @click="$emit('selection',4)">
          <div ref="rooms" class="p-2 text-xl mx-auto max-w-max rounded-full flex justify-center bg-gray-500">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 13v-1m4 1v-3m4 3V8M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
            </svg>
          </div>
          <div class="text-sm text-black">
            Inventory
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable vue/require-prop-types */
export default {
  name: 'SideNav',

  props: ['page', 'serviceWaiterWaitressArrCount'],

  data () {
    return {
      serviceBarArr: [{ id: 0 }, { id: 1 }]
    }
  },

  computed: {
    getserviceBarArrCount () { return Object.keys(this.serviceBarArr).length }
  },

  mounted () {
    // change it's class
    const addClass = ['bg-purple-800', 'shadow-xl']
    addClass.forEach((e) => {
      // item.classList.add(e)
    })
  }
}
</script>

<style scoped>

</style>

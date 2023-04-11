
<template>
  <div>
    <!-- side nav -->
    <div class=" flex flex-col justify-center mx-5 pt-10">
      <div class="text-white text-center w-full mb-5 cursor-pointer">
        <nuxt-link to="/steam-sauna-massage">
          <div ref="guests" class="p-2 text-xl mx-auto max-w-max rounded-full flex justify-center bg-gray-500">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
            </svg>
          </div>
          <p class="text-sm text-black">
            Guests
          </p>
        </nuxt-link>
      </div>

      <div class="text-white text-center w-full my-5 cursor-pointer">
        <nuxt-link to="/steam-sauna-massage/orders">
          <div ref="rooms" class="p-2 text-xl mx-auto max-w-max rounded-full flex justify-center bg-gray-500">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 13v-1m4 1v-3m4 3V8M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
            </svg>
          </div>
          <div class="text-sm text-black">
            Orders
          </div>
        </nuxt-link>
      </div>
    </div>

    <div class="text-white text-center w-full my-5 cursor-pointer">
      <nuxt-link to="/steam-sauna-massage/inventory">
        <div ref="rooms" class="p-2 text-xl mx-auto max-w-max rounded-full flex justify-center bg-gray-500">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 13v-1m4 1v-3m4 3V8M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
          </svg>
        </div>
        <div class="text-sm text-black">
          Inventory
        </div>
      </nuxt-link>
    </div>
  </div>
  <!-- end of first div -->
</template>

<script>
export default {
  name: 'SideNav',

  data () {
    return {
      serviceBarArr: [{ id: 0 }, { id: 1 }]
    }
  },

  computed: {
    getserviceBarArrCount () { return Object.keys(this.serviceBarArr).length }
  }
}
</script>

<style scoped>

</style>

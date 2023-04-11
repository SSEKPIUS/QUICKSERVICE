<template>
  <div
    class="px-5 py-2 border-2  rounded-lg flex items-center justify-between space-x-8"
    :class="menuid == menu.menu_bars_id ? 'bg-gray-500 text-white' : 'bg-white'"
  >
    <div class="flex-1 flex justify-between items-center">
      <div class="w-48 font-bold uppercase rounded text-left">
        {{ menu.category }}
      </div>
      <div class="rounded-lg flex flex-row cursor-pointer transition duration-500 ease-in-out transform hover:translate-x-2" @click="selectMenu">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 left-0 cursor-pointer" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 1.414L10.586 9H7a1 1 0 100 2h3.586l-1.293 1.293a1 1 0 101.414 1.414l3-3a1 1 0 000-1.414z" clip-rule="evenodd" />
        </svg>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    menu: {
      type: Object,
      required: true
    },
    menuid: {
      type: Number,
      required: true
    }
  },

  methods: {
    selectMenu () { this.$emit('selectMenu', this.menu) }
  }
}
</script>

<template>
  <div
    class="p-5 py-2 border shadow-lg  rounded-lg flex items-center justify-between space-x-8"
    :class="menuid == (menu.stock2s_id ? menu.stock2s_id : (menu.stock1s_id ? menu.stock1s_id : (menu.menus_id ? menu.menus_id : menu.stocks_id))) ? 'bg-gray-500' : 'bg-white'"
  >
    <div class="flex-1 flex justify-between items-center">
      <div class="w-auto uppercase rounded text-left">
        {{ menu.category }}
      </div>
      <div class="rounded-lg flex flex-row cursor-pointer mr-4" @click="selectMenu">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 left-0 cursor-pointer transition duration-500 ease-in-out transform hover:translate-x-2" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 1.414L10.586 9H7a1 1 0 100 2h3.586l-1.293 1.293a1 1 0 101.414 1.414l3-3a1 1 0 000-1.414z" clip-rule="evenodd" />
        </svg>
      </div>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-5 w-5 absolute right-0 text-red-500 hover:text-red-700 mr-1 cursor-pointer"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        @click="showModal = true; modalRoutine = 'deleteMenu'"
      >
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    </div>
    <Dialog
      v-show="showModal"
      :showmodal.sync="showModal"
      :head="Modalhead"
      :message="Modalmessage"
      :modal-routine="modalRoutine"
      @click-modal="clickmodal"
    />
  </div>
</template>

<script>
import Dialog from '@/components/dialog/Dialog'
export default {
  components: {
    Dialog
  },

  props: {
    menu: {
      type: Object,
      required: true
    },
    menuid: {
      type: Number,
      default: 0
    }
  },

  data () {
    return {
      // start mordal
      showModal: false,
      modalRoutine: null,
      Modalhead: this.menu.category,
      Modalmessage: 'Do you Wish to Delete?'
      // end mordal
    }
  },

  methods: {
    clickmodal (bol, mode, message = null) {
      this.showModal = false
      // eslint-disable-next-line eqeqeq
      if (bol == true) {
        switch (mode) {
          case 'deleteMenu' :
            this.deleteMenu()
            break
          default :
        }
      }
    },

    deleteMenu () { this.$emit('deleteMenu', this.menu.stock2s_id ? this.menu.stock2s_id : (this.menu.stock1s_id ? this.menu.stock1s_id : (this.menu.menus_id ? this.menu.menus_id : this.menu.stocks_id))) },

    selectMenu () { this.$emit('selectMenu', this.menu.stock2s_id ? this.menu.stock2s_id : (this.menu.stock1s_id ? this.menu.stock1s_id : (this.menu.menus_id ? this.menu.menus_id : this.menu.stocks_id))) }
  }
}
</script>

<style lang="scss" scoped>

</style>

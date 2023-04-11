<template>
  <div>
    <div class=" flex flex-row justify-center items-center border bg-gray-500 rounded-md">
      <div class=" text-left mr-5 ml-5" style=" flex-basis: 50%;">
        <span class=" uppercase font-bold text-white text-left">{{ menu.stocks }}</span>
      </div>
      <div class=" flex flex-row bg-gray-50 w-full px-5 py-2 justify-end">
        <div class=" flex flex-col w-full">
          <div>
            <p class=" text-left">
              {{ menu.description }}
            </p>
          </div>
          <div>
            <p class=" text-left">
              UGX: {{ menu.price| number_format }} /=
            </p>
          </div>
        </div>
        <div class="my-auto ml-auto">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5 text-red-500 cursor-pointer hover:text-red-700"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            @click="showModal = true; modalRoutine = 'deleteMenu'"
          >
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
      </div>
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
import Dialog from '@/components/dialog/Dialog.vue'
export default {
  components: {
    Dialog
  },

  props: {
    menu: {
      type: Object,
      required: true
    }

  },

  data () {
    return {
      // start mordal
      showModal: false,
      modalRoutine: null,
      Modalhead: this.menu.stocks,
      Modalmessage: 'Do you Wish to Delete?'
      // end mordal
    }
  },

  methods: {
    clickmodal (bol, mode, message = null) {
      this.showModal = false
      if (bol == true) {
        switch (mode) {
          case 'deleteMenu' :
            this.deleteMenu()
            break
          default :
        }
      }
    },

    deleteMenu () { this.$emit('deleteMenu', this.menu.menu_bars_id) }
  }
}
</script>

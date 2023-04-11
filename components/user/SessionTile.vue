<template>
  <div class="flex flex-row items-center justify-end w-full h-full">
    <button
      v-show="$auth.user"
      class="bg-blue-700 hover:bg-red-400 hover:text-white text-red-400 text-sm font-bold m-2 py-2 px-4 rounded-md uppercase"
      @click="logoutUser"
    >
      Sign Out
    </button>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {

  data () {
    return {
      form: {
        user: 'Show user options',
        token: 'Show token options'
      }
    }
  },

  computed: {
    ...mapGetters(['getUser'])
  },

  methods: {
    ...mapActions(['logout']),

    logoutUser () {
      this.logout()
    }
  }
}
</script>

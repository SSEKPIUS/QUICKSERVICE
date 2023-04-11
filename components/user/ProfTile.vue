<template>
  <div class=" flex flex-row items-center justify-start w-full m-2">
    <img
      class="h-16 w-16 m-2 border border-gray-400 rounded-full"
      :src="getUser?getUser.image:pf"
      alt="user photo"
    >
    <div class=" flex flex-col  m-3">
      <span class="text-black text-base md:text-xl font-bold whitespace-nowrap uppercase">
        {{ getUser ? getUser.name : '' }}
      </span>
      <span class=" text-xl md:text-sm font-bold whitespace-nowrap uppercase">
        {{ getUser ? getUser.section : '' }}
      </span>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Uimage from '@/assets/f.png'
export default {
  data () {
    return {
      pf: Uimage
    }
  },

  computed: {
    ...mapGetters(['getUser'])
  }
}
</script>

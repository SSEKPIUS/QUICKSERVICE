<!-- eslint-disable vue/multi-word-component-names-->
<template>
  <div>
    <div v-if="$nuxt.isOffline" class="w-full bg-red-500 text-center p-2 text-red-900">
      <span class="font-semibold ">You are offline! </span>
      <span>Please check your Internet Connection.</span>
    </div>
    <Header
      :names="getUser?getUser.name:''"
      :department="getUser?getUser.section:''"
      :pf="getUser?getUser.image:upf"
    />
    <div class="container flex relative bg-white">
      <TheSideMenu class=" absolute z-50 h-full top-0 bottom-0" />
      <div class="w-full">
        <nuxt class=" pl-24 min-h-screen" />
      </div>
    </div>
    <Footer />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Uimage from '@/assets/f.png'
import TheSideMenu from '@/components/navigation/TheSideMenu'

export default {
  components: {
    Header,
    Footer,
    TheSideMenu
  },

  middleware: 'authenticated',

  data () {
    return {
      upf: Uimage
    }
  },

  computed: {
    ...mapGetters(['getUser'])
  }
}
</script>

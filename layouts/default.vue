<template>
  <div style=" min-width: 1280px;">
    <div v-if="$nuxt.isOffline" class="w-full bg-red-500 text-center p-2 text-red-900">
      <span class="font-semibold ">You are offline! </span>
      <span>Please check your Internet Connection.</span>
    </div>
    <Header
      :names="getUser?getUser.name:''"
      :department="getUser?getUser.section:''"
      :pf="getUser?getUser.image:upf"
    />
    <Nuxt />
    <Footer />
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Uimage from '@/assets/f.png'
export default {
  components: {
    Header,
    Footer
  },

  middleware: 'authenticated',

  data () {
    return {
      upf: Uimage
    }
  },

  async fetch () {
    clearInterval(this.getMetricTimer)
    this.setTimerInterval()
    await this.fetchMetric()
  },

  computed: {
    ...mapGetters(['getUser', 'getMetricTimer'])
  },

  methods: {
    ...mapMutations(['setMetricTimer']),

    setTimerInterval () {
      this.setMetricTimer(setInterval(this.refreshData, this.getTimerInterval))
    },

    refreshData () {
      this.fetchMetric()
    },

    fetchMetric () {
      ;
    }
  }
}
</script>

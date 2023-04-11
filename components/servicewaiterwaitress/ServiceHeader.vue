<template>
  <div class="mh-1/6 text-gray-500 w-full bg-gray-50 border flex flex-row shadow-xl">
    <div class=" w-1/4">
      <ServiceProfTile />
    </div>
    <div class=" w-1/2">
      <CompanyTile />
    </div>
    <div class=" w-1/4 pt-4 pr-2">
      <div v-if="getUser" class=" flex flex-row items-center justify-center w-full m-2 mt-0">
        <img class=" h-20 w-20 m-2 mt-0  rounded-sm" :src="getUser?getUser.image:pf" alt="user photo">
        <div class=" flex flex-col  m-3 mt-0">
          <span class="text-gray-600 text-xs">Space is Run and operated by:-</span>
          <span class="text-green-600 text-sm font-bold uppercase">{{ getUser ? getUser.name : '' }}</span>
          <span class=" text-sm font-bold">{{ getUser ? getUser.email : '' }}</span>
          <span class=" text-sm font-bold text-blue-300 w-full text-left cursor-pointer hover:text-blue-500" @click="logoutUser">SignOut</span>
        </div>
      </div>
      <div v-else class=" flex flex-row items-center justify-center w-full m-2 pt-0">
        <div class=" flex flex-col  m-3">
          <span class="text-gray-600 text-xs">Space is Openely operated</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import ServiceProfTile from '@/components/servicewaiterwaitress/ServiceProfTile'
import CompanyTile from '@/components/user/CompanyTile'
import Uimage from '@/assets/f.png'
export default {
  components: {
    ServiceProfTile, CompanyTile
  },

  data () {
    return {
      licenced: true,
      pf: Uimage
    }
  },

  computed: {
    ...mapGetters(['getUser'])
  },

  methods: {
    ...mapActions(['logout']),

    logoutUser () {
      this.logout()
      this.$auth.setUser(null)
      // window.location.reload(true)
    }
  }
}
</script>

<style scoped>
 .BG {
     background-color: rgba(255, 0, 0, 0.2);
     margin-top: -2px;
 }
</style>

<!--eslint-disable vue/multi-word-component-names-->
<template>
  <div class="mh-1/6 text-gray-500 w-full bg-gray-50 border flex flex-row shadow-xl">
    <div class=" w-1/4 md:w-full">
      <ProfTile />
    </div>
    <div class=" w-1/2 md:w-full">
      <CompanyTile />
    </div>
    <div class=" w-1/4 md:w-full">
      <SessionTile />
    </div>
  </div>
</template>

<script>
import ProfTile from '@/components/user/ProfTile'
import CompanyTile from '@/components/user/CompanyTile'
import SessionTile from '@/components/user/SessionTile'
export default {
  components: {
    ProfTile, CompanyTile, SessionTile
  },

  data () {
    return {
      licenced: true
    }
  }
}
</script>

<style scoped>
 .BG {
     background-color: rgba(255, 0, 0, 0.1);
     margin-top: -2px;
 }
</style>

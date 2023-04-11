<template>
  <div class=" flex items-center justify-center w-full">
    <img :src="require('@/assets/logo.png')" alt="logo" class="w-14 m-2 mt-3">
    <div class="flex flex-col items-start m-2">
      <span class="main">
        <h1>MACSEDO QUICK SERVICE</h1>
      </span>
      <span class="md:hidden">
        <DigitalClock /></span>
    </div>
  </div>
</template>

<script>
import DigitalClock from '@/components/user/DigitalClock'
export default {
  components: {
    DigitalClock
  }
}
</script>

<style scoped>
.main h1 {
    margin: 0;
    color: #343434;
    font-weight: normal;
    font-family: 'Ultra', sans-serif;
    font-size: 20px;
    line-height: 40px;
    text-transform: uppercase;
    text-shadow: 0 2px white, 0 3px #777;
}

@media (max-width: 767px) {
    .main h1 {
       /* margin: .2em 0 0.2em 0;
        font-size: 18px;
        line-height: 10px;
        text-transform: uppercase;
        text-shadow: 0 2px white, 0 3px #777;*/
    }

}
</style>

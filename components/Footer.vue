<template>
  <div class="bottom-0  fixed  text-gray-500 text-xs w-full  flex justify-center bg-gray-50 border">
    <span><span class=" text-blue-400 mr-2">Developed by Centinellabs:</span>Centinellabs@gmail.com</span>
    <span class=" w-10" />
    <span><span class=" text-blue-400 mr-2">Call Us:</span>0704795264, 0785176863</span>
    <span class=" w-10" />
    <span class=" font-semibold"><span class=" text-blue-400 mr-2 font-normal">Programme Version:</span>{{ baseVersion }}</span>
    <span class=" w-10" />
    <span class=" font-semibold"><span class=" text-blue-400 mr-2 font-normal">Last Update:</span>{{ updated }}</span>
  </div>
</template>

<script>
export default {
  data () {
    return {
      baseVersion: process.env.VERSION || '0.0.0',
      updated: process.env.UPDATED || '0/0/0'
    }
  }
}
</script>

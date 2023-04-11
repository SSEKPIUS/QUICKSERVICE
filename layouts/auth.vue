<template>
  <div>
    <div v-if="$nuxt.isOffline" class="w-full bg-red-500 text-center p-2 text-red-900">
      <span class="font-semibold ">You are offline! </span>
      <span>Please check your Internet Connection.</span>
    </div>
    <Nuxt />
    <Footer />
  </div>
</template>

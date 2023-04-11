<template>
  <div style=" min-width: 1280px;">
    <div v-if="$nuxt.isOffline" class="w-full bg-red-500 text-center p-2 text-red-900">
      <span class="font-semibold ">You are offline! </span>
      <span>Please check your Internet Connection.</span>
    </div>
    <ServiceHeader />
    <Nuxt style=" min-height: 720px" />
    <Footer />
  </div>
</template>

<script>
import ServiceHeader from '@/components/servicewaiterwaitress/ServiceHeader'
import Footer from '@/components/Footer'
export default {
  components: { ServiceHeader, Footer },

  middleware: 'authenticated'
}
</script>

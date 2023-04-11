<!--eslint-disable vue/multi-word-component-names -->
<template>
  <div class="p-5 flex justify-between text-center items-center h-full">
    <div v-if="$nuxt.isOffline" class="w-full bg-red-500 text-center p-2 text-red-900">
      <span class="font-semibold ">You are offline! </span>
      <span>Please check your Internet Connection.</span>
    </div>
    <div class="w-full mt-20">
      <div v-if="error.statusCode == 404" class="text-gray-600 font-semibold">
        <span class="text-gray-500 bottom-shadow py-4 block">Sorry! The page that you are looking for was not found.</span>
        <div class="mt-3">
          <span class="text-gray-600">Please have something else on the menu!</span>
        </div>
      </div>
      <div v-else-if="error.statusCode == 403" class="text-gray-600 font-semibold">
        <span class="text-gray-500 bottom-shadow py-4 block">It looks like you don't have permission to access this page.</span>
        <div class="mt-3">
          <span class="text-gray-600">Please check your permissions and try again!</span>
        </div>
      </div>
      <div v-else-if="error.statusCode == 401" class="text-gray-600 font-semibold">
        <span class="text-gray-500 bottom-shadow py-4 block">You are not authorized to access this page.</span>
        <div class="mt-3">
          <span class="text-gray-600">Please <nuxt-link to="/auth/login">login</nuxt-link> to gain access!</span>
        </div>
      </div>
      <h1 v-else class="bottom-shadow py-4">
        {{ error.message }}
      </h1>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    error: {
      type: Object,
      required: true
    }
  }
}
</script>

<style scoped>
.bottom-shadow {
  box-shadow: 0 5px 10px -8px #999;
}
</style>

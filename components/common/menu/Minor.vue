<template>
  <div class="container flex">
    <ul class=" w-11/12 flex flex-wrap gap-2 rounded-md py-5 mx-auto items-start justify-center overflow-y-scroll scrollbar-hide h-80">
      <li v-for="(obj, n) in menu" :key="n" @click="$emit('clicked',obj)">
        <div class="w-44 border shadow-md px-2 bg-gray-100 transition duration-500 ease-in-out transform hover:-translate-y-1 hover:shadow-lg cursor-pointer hover:text-red-700">
          <div class=" w-full flex flex-col">
            <h3 class=" text-left uppercase font-bold">
              {{ obj.stocks }}
            </h3>
            <p class=" text-left text-sm text-gray-600 lowercase">
              {{ obj.description }}
            </p>
          </div>
          <div class=" w-full text-left text-gray-600">
            {{ obj.price | number_format }} UGX
          </div>
        </div>
      </li>
    </ul>
    <div class="w-1/12">
      <div class="flex flex-col gap-3 w-full ml-auto pt-5">
        <input type="button" class="button button-error" style="margin: 0;" value="<" @click="$emit('cancel')">
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Minor',
  props: {
    menu: {
      type: [Object, Array],
      required: true
    }
  }
}
</script>
<style scoped>
::-webkit-scrollbar {
  display: none;
}
</style>

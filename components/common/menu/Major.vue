<template>
  <div class="container flex mx-auto items-center justify-center">
    <ul class="flex flex-wrap gap-2 rounded-md w-auto py-5 mx-auto items-start justify-center overflow-y-scroll scrollbar-hide h-80">
      <li v-for="(obj, n) in menu" :key="n" @click="$emit('clicked',obj.category)">
        <div class="hover:bg-gray-200 text-2xl hover:text-red-700 font-black select-none cursor-pointer uppercase rounded-sm flex flex-1 items-center p-2 px-3 transition duration-500 ease-in-out transform hover:-translate-y-1 shadow-md hover:shadow-lg text-" :class="getColor(obj)">
          {{ obj.category }}
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'Major',
  props: {
    menu: {
      type: [Object, Array],
      required: true
    }
  },
  methods: {
    getColor (obj) {
      switch (obj.section) {
        case 'SERVICE-BAR':
          return 'bg-blue-50 text-blue-900'
        default:
          return 'bg-purple-50 text-blue-900'
      }
    }
  }
}
</script>
<style scoped>
::-webkit-scrollbar {
  display: none;
}
</style>

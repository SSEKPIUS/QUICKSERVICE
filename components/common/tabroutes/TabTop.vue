<template>
  <div class="h-full w-auto">
    <ul class="flex flex-col gap-4 justify-start items-start mt-10">
      <div v-for="(tab, index) in tabs" :key="index">
        <nuxt-link
          class="cursor-pointer whitespace-nowrap py-2 px-4 text-gray-500 flex items-center transition duration-500 ease-in-out transform hover:translate-x-2"
          :to="tab.path"
        >
          <i :class="tab.icon" />
          <span class="ml-2 font-bold" :class="{'text-black' : tab.active}">{{ tab.name }}</span>
        </nuxt-link>
      </div>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'TabTop',
  props: {
    tabs: {
      type: [Array, Object],
      required: true
    }
  }
}
</script>

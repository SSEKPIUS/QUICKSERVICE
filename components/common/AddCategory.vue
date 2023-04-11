<template>
  <div>
    <div class="flex items-center max-w-md mx-auto bg-white rounded-full border drop-shadow-lg ">
      <div class="w-full">
        <input
          v-model="search"
          type="search"
          class="w-full px-4 ml-2 py-1 text-gray-900 rounded-full focus:outline-none"
          :class="uppercase?'uppercase':'capitalize'"
          placeholder="add"
        >
      </div>
      <div>
        <button type="submit" class="flex items-center justify-center w-12 h-12 text-gray-100 rounded-full m-1" :class="(search.length >= 4) ? 'bg-purple-500' :'bg-gray-500 cursor-not-allowed'" :disabled="search.length < 4" @click="fireEvent">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
        </button>
      </div>
    </div>
    <slot />
  </div>
</template>

<script>
export default {
  props: {
    uppercase: { type: Boolean, required: false, default: true },
    data: { type: Boolean, required: false, default: false }
  },

  data () {
    return {
      search: ''
    }
  },

  watch: {
    search: {
      immediate: true,
      handler (value) {
        this.$emit('input', value)
      }
    }
  },

  methods: {
    fireEvent () {
      if (this.search.length >= 4) {
        this.$emit('fire')
      }
    }
  }
}
</script>

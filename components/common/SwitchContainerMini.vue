<template>
  <div class=" flex flex-row items-center">
    <div
      :class="{ 'bg-blue-700': state }"
      class="w-14 h-7 flex items-center bg-gray-300 rounded-full mx-1 px-1 cursor-pointer"
      @click="handleInput"
    >
      <!-- Switch -->
      <div
        class="bg-white w-5 h-5 rounded-full shadow-md transform cursor-pointer"
        :class="{ 'translate-x-7 ': state }"
      />
    </div>
    <div class=" ml-5 capitalize font-medium">
      {{ desc }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'SwitchContainerMini',
  props: {
    value: {
      type: Boolean,
      required: true
    },
    desc: {
      type: String,
      required: false,
      default: null
    }
  },
  data () {
    return {
      state: this.value
    }
  },
  watch: {
    value: {
      immediate: true,
      handler (val) {
        this.state = val
      }
    }
  },
  methods: {
    handleInput (e) {
      this.state = !this.state
      this.$emit('input', this.state)
    }
  }
}
</script>

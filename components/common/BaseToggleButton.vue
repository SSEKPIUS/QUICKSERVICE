<template>
  <div>
    <label :for="id" class="flex items-center input-group">
      <input
        :id="id"
        :value="state"
        :checked="state"
        type="checkbox"
        class="switch"
        @change="update()"
      >
      <span class="capitalize ml-2 text-gray-800">{{ label }}</span>
    </label>
    <span v-if="error" class="text-red-600 text-sm font-medium block mt-1">{{ error }}</span>
    <span v-if="helpText" class="text-gray-500 text-sm">{{ helpText }}</span>
  </div>
</template>

<script>
export default {
  name: 'BaseToggleButton',
  props: {
    id: {
      type: String,
      default () {
        return `toggle-input-${this._uid}`
      }
    },
    value: {
      type: [Boolean],
      default: false
    },
    label: {
      type: [String],
      default: null
    },
    error: {
      type: String,
      default: null,
      required: false
    },
    helpText: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      state: this.value
    }
  },
  watch: {
    value () {
      this.state = this.value
    }
  },
  methods: {
    update () {
      this.state = !this.state
      this.$emit('input', this.state)
    }
  }
}
</script>
<style scoped>
    input[type='checkbox']{
        height: 22px;
        width: 38px;
        transition: background .3s ease, border-color .3s ease;
        @apply bg-white shadow-none appearance-none outline-none rounded-full;
        @apply border-2 border-gray-500 cursor-pointer relative;
    }

    input[type='checkbox']:after{
        content: '';
        transition: transform .3s ease, opacity .2s ease, filter .3s ease;
        left: 2px;
        top: 2px;
        width: 14px;
        height: 14px;
        @apply bg-gray-400 rounded-full absolute;
    }

    input[type='checkbox']:checked{
        @apply bg-blue-500 border-blue-500;
    }

    input[type='checkbox']:checked:after{
        @apply bg-blue-500 border-blue-500;
        @apply bg-white;
        transform: translateX(16px);
        filter: drop-shadow(0 1px 2px rgba(18, 22, 33, .1));
        transition: opacity .3s ease, filter .3s ease, transform .6s cubic-bezier(.175, .88, .32, 1.2);
    }

     input[type='checkbox']:disabled{
        @apply bg-gray-100 cursor-not-allowed opacity-50;
     }

     input[type='checkbox']:disabled:checked{
        @apply border-gray-400 bg-gray-200;
     }

    input[type='checkbox']:hover:not(:checked):not(:disabled){
        @apply border-blue-500;
    }
</style>

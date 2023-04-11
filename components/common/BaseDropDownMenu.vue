<template>
  <popper :trigger="trigger" :options="options">
    <div class="popper">
      <slot />
    </div>
    <button slot="reference">
      <slot name="menu-button">
        <div class="p-1">
          <span class="fe fe-more-vertical text-2xl" />
        </div>
      </slot>
    </button>
  </popper>
</template>

<script>
import Popper from 'vue-popperjs'

export default {
  name: 'BaseDropDownMenu',
  components: {
    Popper
  },
  props: {
    trigger: {
      type: String,
      require: false,
      default: 'hover'
    }
  },
  data () {
    return {
      options: {
        placement: 'bottom',
        modifiers: { offset: { offset: '5, 0' } }
      }
    }
  }
}
</script>

<style>
  .popper {
    @apply inline-block z-50 w-auto bg-white text-base rounded-lg border border-gray-200 text-left;
    box-shadow: 0 0 25px -9px rgba(72,91,128,.8)
  }
</style>

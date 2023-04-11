<template>
  <li v-show="!disabled" class="mx-2 cursor-pointer">
    <slot />
  </li>
</template>

<script>
export default {
  props: {
    disabled: {
      type: Boolean,
      default: false
    }
  }
}
</script>

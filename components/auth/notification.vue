<template>
  <div class="notification is-danger text-red-500">
    {{ message }}
  </div>
</template>

<script>
export default {
  name: 'Notification',
  props: {
    message: {
      type: String,
      required: false,
      default: ''
    }
  }
}
</script>

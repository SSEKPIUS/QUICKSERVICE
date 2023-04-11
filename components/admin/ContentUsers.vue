<template>
  <div v-show="users" class=" container m-auto grid grid-cols-4 items-center justify-start">
    <span v-if="!users">No Users</span>
    <ContentUsersTile
      v-for="(user,n) in users"
      :key="n"
      :user="user"
      :token="token"
      @refresh-users="refreshUsers"
      @fileUploaded="refreshUsers"
    />
  </div>
</template>

<script>
import ContentUsersTile from '@/components/admin/ContentUsersTile'
export default {
  components: {
    ContentUsersTile
  },
  props: {
    users: {
      type: Array,
      required: false,
      default: () => []
    },
    token: {
      type: String,
      rerequired: true,
      default: ''
    }
  },
  methods: {
    refreshUsers () { this.$emit('refresh-users') }
  }
}
</script>

<style lang="scss" scoped>

</style>

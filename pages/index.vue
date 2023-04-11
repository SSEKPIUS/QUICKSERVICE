<template>
  <div />
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  middleware: 'authenticated',

  computed: {
    ...mapGetters(['getUser'])
  },

  created () {
    const user = this.getUser
    const section = user ? user.section : null
    switch (section) {
      case 'administrator':
        this.$router.push('/admin')
        break
      case 'SUPERVISOR':
        this.$router.push('/supervisor/menu-bar')
        break
      case 'STORE':
        this.$router.push('/store/inventory')
        break
      case 'SERVICE-BAR':
        this.$router.push('/servicebar/new-orders')
        break
      case 'SERVICE-WAITER-WAITRESS':
        this.$router.push('/service-waiter-waitress')
        break
      case 'RECEPTION':
        this.$router.push('/reception')
        break
      case 'KITCHEN':
        this.$router.push('/kitchen/new-orders')
        break
      case 'STEAM-SAUNA-MASSAGE':
        this.$router.push('/steam-sauna-massage')
        break
      case 'ACCOUNTS':
        this.$router.push('/accounts')
        break
      case 'HOUSE':
        this.$router.push('/house')
        break
      case 'LAUNDRY':
        this.$router.push('/laundry')
        break
      case 'CLEANER':
        this.$router.push('/cleaner')
        break
      default:
        return this.$router.push('/auth')
    }
  }
}
</script>

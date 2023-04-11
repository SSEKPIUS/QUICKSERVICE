<template>
  <section class=" w-full h-screen overflow-hidden bg-auth-pattern bg-no-repeat bg-cover flex flex-row md:flex-col items-center justify-center">
    <div class="w-3/12 md:w-10/12 top-40 md:top-20  rounded overflow-hidden shadow-lg bg-gray-50 m-1">
      <div class=" p-5">
        <div class=" flex items-center justify-center p-4 w-full text-center uppercase font-black">
          <img :src="require('@/assets/logo.png')" alt="logo" class="w-6 h-6 mr-1">
          <span>macsedo quick service</span>
        </div>
        <h2 class=" font-black uppercase">
          Welcome back!
        </h2>
        <Notification v-if="error" :message="error.toString()" />
        <form method="post" @submit.prevent="login">
          <div class=" w-full mt-2 mb-2">
            <input
              v-model="form.email"
              type="email"
              :class="{'text-danger': mailhasError}"
              class=" w-full text-xl border-2 border-blue-500 rounded-md pl-2 pr-2"
              name="email"
              placeholder="Account Email"
            >
          </div>

          <div class="w-full mt-2 mb-2">
            <input
              v-model="form.password"
              type="password"
              :class="{'text-danger': pwhasError}"
              class=" w-full text-xl border-2 border-blue-500 rounded-md pl-2 pr-2"
              name="password"
              placeholder="Account Password"
            >
          </div>

          <button
            v-if="!loading" type="submit"
            :class="{'bg-black hover:bg-blue-800':isChrome, 'bg-gray-500':!isChrome}"
            class=" w-full rounded-lg text-indigo-50 pt-2 pb-2  uppercase"
          >
            Log In
          </button>

          <Spinner v-else />
        </form>
        <div class=" text-xs mt-2 text-blue-400">
          <p>
            Don't have an account? Consult ADMIN
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { mapActions } from 'vuex'
import Notification from '~/components/auth/notification'
import Spinner from '@/components/filters/Spinner'

export default {
  components: {
    Notification, Spinner
  },

  layout: 'auth',

  data () {
    return {
      loading: false,
      error: null,
      mailhasError: false,
      pwhasError: false,
      form: {
        selectedAccountText: 'Show options',
        email: '',
        password: ''
      }
    }
  },

  computed: {
    isChrome () {
      return process.browser ? this.checkChrome() : false
    }
  },

  created () {
    if (process.browser) {
      this.checkChrome()
    }
  },

  methods: {
    ...mapActions(['setToken', 'setUser']),

    async login () {
      if (!this.isChrome) { return }
      this.error = null
      this.mailhasError = false
      this.pwhasError = false
      this.loading = true
      try {
        await this.$axios.$post('web-auth', this.form)
          .then(({ token, expiresIn, user }) => {
            // this.$store.dispatch('authStore/setToken', { token, expiresIn })
            this.setToken({ token, expiresIn })
            // this.$store.dispatch('authStore/setUser', { user })
            this.setUser({ user })
            this.$auth.setUser(user.name)
            // this.$router.push({ name: 'index' })
            this.$router.push('/')
            // eslint-disable-next-line no-console
            // console.log('token  %s \n expiresIn %s \n', token, expiresIn)
            // eslint-disable-next-line no-console
            // console.log(user)
          })
          .catch((errors) => {
            try {
              const jsObject = JSON.parse(errors.response.data.message)
              if (jsObject.state == 'email') {
                this.mailhasError = true
              } else if (jsObject.state == 'password') {
                this.pwhasError = true
              } else {
                this.mailhasError = true
                this.pwhasError = true
              }
              this.error = jsObject.message
              this.$toast.error(jsObject.message)
            } catch (error) {
              if (errors.response.data.message) {
                this.$toast.error(this.$ObjTemplate.trim(errors.response.data.message))
              } else {
                this.$toast.error(this.$ObjTemplate.trim(errors.response.request.statusText))
              }
            }
          })
      } catch (e) {
        this.$toast.error('Cannot find Network Resource')
        console.log(e)
      }
      this.loading = false
    },

    checkChrome () {
      // please note,
      // that IE11 now returns undefined again for window.chrome
      // and new Opera 30 outputs true for window.chrome
      // but needs to check if window.opr is not undefined
      // and new IE Edge outputs to true now for window.chrome
      // and if not iOS Chrome check
      // so use the below updated condition
      const winNav = window.navigator

      const isChromium = window.chrome
      const vendorName = winNav.vendor
      const isOpera = typeof window.opr !== 'undefined'
      const isIEedge = winNav.userAgent.includes('Edg')
      const isIOSChrome = winNav.userAgent.match('CriOS')

      if (isIOSChrome) {
        return true
      } else if (
        isChromium !== null &&
        typeof isChromium !== 'undefined' &&
        vendorName == 'Google Inc.' &&
        isOpera == false &&
        isIEedge == false
      ) {
        return true
      } else {
        return false
      }
    }
  }
}
</script>

<style scoped>
  .text-danger {
     border: red solid ;
  }
</style>

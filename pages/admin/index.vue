<template>
  <div class=" min-w-min main">
    <div class=" border  w-full p-10">
      <div class=" w-full p-5 border  shadow-2xl h-screen">
        <BaseFilter
          section="user accounts"
          section-text="Register New Accounts"
          :search="false"
          :options="true"
          :dates="false"
          :redirect="true"
        />
        <ContentUsers
          :users="displayData"
          :token="getToken"
          @refresh-users="refreshUsers"
        />
        <div>
          <Pagination
            :itemlist="getUsers"
            resource="Users"
            :expectcurrentpage="getPage"
            :per-page="8"
            @display-data="setDisplayData"
            @selectedPage="setSelectedPage"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from 'vuex'
import BaseFilter from '@/components/filters/BaseFilter'
import ContentUsers from '@/components/admin/ContentUsers'
import Pagination from '@/components/pagination/Pagination'
export default {
  components: {
    BaseFilter,
    ContentUsers,
    Pagination
  },

  async asyncData ({ store }) {
    await store.dispatch('loadUsers')
  },

  data () {
    return {
      displayData: []
    }
  },

  computed: {
    ...mapGetters(['getPage', 'getUsers', 'getToken', 'getSearch'])
  },

  watch: {
    getSearch: {
      handler (value) {
        this.setSelectedPage(1)
        this.loadUsers(true)
      }
    }
  },

  mounted () {
    this.setSelectedPage(1)
    this.RESET_SEARCH()
  },

  methods: {
    ...mapActions(['loadUsers']),
    ...mapMutations(['setPage', 'RESET_SEARCH']),

    setDisplayData (data) {
      this.displayData = data
    },

    setSelectedPage (page) {
      this.setPage(page)
    },

    refreshUsers () { this.loadUsers() }
  }
}
</script>

<style scoped>
.main {
   min-width: 1280px;
   min-height: 100vh;
}
</style>

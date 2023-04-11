<template>
  <div>
    <div class=" my-4">
      <div class=" w-full py-2">
        <span class=" uppercase text-gray-500 font-extrabold">add kitchen menu</span>
      </div>
    </div>
    <div class="grid grid-cols-2 gap-2">
      <!--major-->
      <div class=" w-full">
        <div class="flex items-center justify-center px-2">
          <div class=" w-full max-w-lg">
            <div class="m-8 relative space-y-4">
              <span class=" capitalize text-gray-500">major category</span>
              <AddCategory
                v-model="searchMajor"
                :enabled="enabledMajor"
                @fire="firedEventMajor"
              />
              <div class=" flex flex-col gap-2">
                <MajorCategory
                  v-for="(menu, n) in majorPaginated"
                  :key="n"
                  :menu="menu"
                  :menuid="menuid"
                  @deleteMenu="(e) => deleteMenu(e, 'Major')"
                  @selectMenu="selectMajor"
                />
              </div>
              <div class="">
                <Pagination
                  :per-page="parseInt(7)"
                  :itemlist="majorFiltered"
                  resource="Major Menu"
                  :expectcurrentpage="currentPage"
                  @display-data="dataMajor"
                  @selectedPage="selectedPage"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <!--minor-->
      <div class=" w-full">
        <div class="flex items-center justify-center px-2">
          <div class=" w-full max-w-lg">
            <div class="m-8 relative space-y-4">
              <span class=" capitalize text-gray-500">minor category</span>
              <AddCategory
                v-model="searchMinor"
                :enabled="enabledMinor"
                @fire="firedEventMinor"
              >
                <div v-if="searchMinor && showDetails" class=" w-full p-2 relative">
                  <div class=" px-8 py-4 border rounded-sm absolute w-full bg-white shadow-lg">
                    <div class="mb-2">
                      <label class="block text-gray-700 text-sm font-bold mb-2 text-left" for="description">
                        Description <span
                          class=" float-right text-lg font-bold text-black -mt-2" @click="closeInputExtra()"
                        >x</span>
                      </label>
                      <textarea
                        id="description"
                        v-model="minorExtras.Menudescription"
                        class="shadow appearance-none border rounded w-full py-2 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        type="text"
                        placeholder="Description"
                      />
                    </div>
                    <div class="mb-2">
                      <label class="block text-gray-700 text-sm font-bold mb-2 text-left" for="price">
                        Price
                      </label>
                      <input
                        id="price"
                        v-model="minorExtras.Menuprice"
                        class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                        type="number"
                        placeholder="0.00"
                        min="500"
                      >
                    </div>
                  </div>
                </div>
              </AddCategory>
              <MinorCategory
                v-for="(menu, n) in minorPaginated"
                :key="n"
                :menu="menu"
                @deleteMenu="(val) => {deleteMenu(val, 'Minor')}"
              />
              <Pagination
                :per-page="parseInt(3)"
                :itemlist="minorFiltered"
                resource="Minor Menu"
                @display-data="setDisplayDataMenuMinor"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import { filter } from 'lodash'
import MajorCategory from '@/components/common/MajorCategory'
import MinorCategory from '@/components/common/MinorCategory'
import AddCategory from '@/components/common/AddCategory'
export default {
  name: 'MenuKitchen',
  components: {
    MajorCategory,
    AddCategory,
    MinorCategory
  },

  data () {
    return {
      showDetails: true,
      searchMajor: '',
      searchMinor: '',
      minorExtras: {
        Menudescription: null,
        Menuprice: 0
      },
      enabledMajor: false,
      enabledMinor: false,
      menuid: 0,
      minorSelected: [],
      majorPaginated: [],
      minorPaginated: [],
      currentPage: 1
    }
  },

  computed: {
    ...mapGetters({ token: 'getToken', major: 'menuStore/getmenuMajor', minor: 'menuStore/getmenuMinor' }),

    majorFiltered () {
      return filter(this.major, (o) => {
        return o.category.toLowerCase().trim().includes(this.searchMajor.toLowerCase().trim())
      })
    },

    minorFiltered () {
      return filter(this.minorSelected, (o) => {
        return o.category.toLowerCase().trim().includes(this.searchMinor.toLowerCase().trim())
      })
    }
  },

  watch: {
    majorFiltered: {
      handler () {
        this.minorSelected = []
        this.menuid = 0
      }
    },

    searchMinor: {
      handler (value) {
        if (!value) { this.showDetails = true }
      }
    }
  },

  mounted () {
    this.fetch()
  },

  methods: {
    ...mapActions({ fetch: 'menuStore/fetch' }),
    closeInputExtra () {
      this.showDetails = false
      this.minorExtras = {
        Menudescription: null,
        Menuprice: 0
      }
    },

    firedEventMajor () {
      this.addMenu(this.searchMajor, 'Major')
    },

    firedEventMinor () {
      if (!this.menuid || this.menuid === 0 || this.minorExtras.Menuprice < 500) {
        this.$toast.error('Major Menu Not Selected or Required Fields are not provided')
        return
      }
      this.addMenu(this.searchMinor, 'Minor', this.menuid, this.minorExtras.Menudescription, this.minorExtras.Menuprice)
    },

    setDisplayDataMenuMinor (data) {
      this.minorPaginated = data
    },

    dataMajor (data) {
      this.majorPaginated = data
    },

    selectedPage (page) {
      this.currentPage = page
    },

    selectMajor (id) {
      const temp = filter(this.minor, function (o) {
        return (parseInt(o.menus_id, 10) == parseInt(id, 10))
      })
      this.minorSelected = temp
      this.menuid = id
    },

    async deleteMenu (menuid, section) {
      const config = {
        headers: { 'X-CSRF-TOKEN': this.token }
      }
      const bodyParameters = {
        id: menuid,
        type: section
      }
      try {
        await this.$axios.$post('delMenu', bodyParameters, config)
          .then(({ result, category }) => {
            if (result) {
              this.minorSelected = []
              section === 'Major' ? this.searchMajor = '' : this.searchMinor = ''
              this.$toast.success('Deleted ' + category)
              this.fetch()
            } else {
              this.$toast.error('Deleting ' + category + ' might have failed!')
            }
          })
          .catch((errors) => {
            if (errors.response.data.message) {
              this.$toast.error(this.$ObjTemplate.trim(errors.response.data.message))
            } else {
              this.$toast.error(this.$ObjTemplate.trim(errors.response.request.statusText))
            }
          })
      } catch (e) {
        this.$toast.error(e)
      }
    },

    async addMenu (category, type, menuid = 0, Menudescription = '', Menuprice = 1000) {
      const config = {
        headers: { 'X-CSRF-TOKEN': this.token }
      }
      const bodyParameters = {
        category,
        type,
        id: menuid,
        description: Menudescription,
        price: Menuprice
      }
      try {
        await this.$axios.$post('addMenu', bodyParameters, config)
          .then(async ({ result, category }) => {
            if (result) {
              this.minorPaginated = []
              this.minorSelected = []
              this.search = null
              this.Menudescription = null
              this.Menuprice = null
              this.searchMinor = ''
              this.$toast.success('Added ' + category)
              this.closeInputExtra()
              await this.fetch()
              //
              //
              //
              //
              //
              //
              this.selectMajor(this.menuid)
            } else {
              this.$toast.error('Adding ' + category + ' might have failed!')
            }
          })
          .catch((errors) => {
            if (errors.response.data.message) {
              this.$toast.error(this.$ObjTemplate.trim(errors.response.data.message))
            } else {
              this.$toast.error(this.$ObjTemplate.trim(errors.response.request.statusText))
            }
          })
      } catch (e) {
        this.$toast.error('Adding Category failed!')
      }
    }
  }
}
</script>

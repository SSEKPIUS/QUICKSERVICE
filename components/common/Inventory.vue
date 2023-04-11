<template>
  <div class=" w-full">
    <div v-show="usersection == 'STORE'">
      <div class="w-full p-5 border shadow-xl mt-2 flex flex-row">
        <span class=" border rounded-md px-3 bg-gray-50 uppercase font-bold  cursor-pointer transform hover:translate-x-1" @click="$modal.show('add-stock-menu')">add stock</span>
      </div>
    </div>

    <BaseFilter
      v-show="usersection == 'STORE' || usersection == 'SUPERVISOR' || usersection == 'SERVICE-BAR'"
      section="Inventory logs"
      section-text="view logs"
      class=" mt-5 mx-1"
      :dates="false"
      :options="false"
    />

    <InventoryList />

    <modal name="add-stock-menu" height="auto" width="90%" :draggable="true" :scrollable="false">
      <div>
        <div class=" grid grid-cols-3 bg-gray-50">
          <div class="w-full">
            <div class="bg-gray-50 flex items-center justify-center px-2">
              <div class="w-full max-w-lg">
                <div class="m-8 relative space-y-1">
                  <span class="capitalize text-gray-500 font-bold">add major category</span>
                  <AddCategory
                    v-model="filterSearchMajor"
                    :uppercase="true"
                    @fire="() => addMenu(filterSearchMajor, 'Major')"
                  />
                  <div v-if="getmenuMajor.length > 0">
                    <Category
                      v-for="(inventory, n) in inventoryMajorPaginated"
                      :key="n"
                      :menu="inventory"
                      :loading="loading.mode == 'major' && loading.id == inventory.stocks_id && loading.value == true"
                      :menuid="MenuidMajor"
                      class=" my-1"
                      @deleteMenu="(val) => deleteStockMenu(val, 'Major')"
                      @selectMenu="selectInventoryMajor"
                    />
                  </div>
                  <div>
                    <Pagination
                      :per-page="parseInt(6)"
                      :itemlist="getmenuMajorFiltered"
                      resource="Major Menu"
                      :expectcurrentpage="1"
                      @display-data="setDisplayDataMenuMajor"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="w-full">
            <div class="bg-gray-50 flex items-center justify-center px-2">
              <div class="w-full max-w-lg">
                <div class="m-8 relative space-y-1">
                  <span class="capitalize text-gray-500 font-bold">add minor category</span>
                  <AddCategory
                    v-model="filterMinor"
                    :uppercase="true"
                    @fire="() => firedEventMinor (filterMinor)"
                  />
                  <div v-if="inventoryMinorSelected.length > 0">
                    <Category
                      v-for="(inventory, n) in inventoryMinorPaginated"
                      :key="n"
                      :menu="inventory"
                      :loading="loading.mode == 'minor' && loading.id == inventory.stock1s_id && loading.value == true"
                      :menuid="MenuidMinor"
                      class=" my-1"
                      @deleteMenu="(val) => deleteStockMenu(val, 'Minor')"
                      @selectMenu="(val) => { MenuidMinor = val; Unitid = 0}"
                    />
                  </div>
                  <div v-else class="text-red-500">
                    <p>No Menu Selected!</p>
                  </div>
                  <div>
                    <Pagination
                      :per-page="parseInt(6)"
                      :itemlist="getinventoryMinorSelected"
                      resource="Minor Menu"
                      @display-data="(data) => inventoryMinorPaginated = data"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="w-full">
            <div class="bg-gray-50 flex items-center justify-center px-2">
              <div class="w-full max-w-lg">
                <div class="m-8 relative space-y-1">
                  <span class="capitalize text-gray-500 font-bold">add units of measure</span>
                  <AddCategory
                    v-model="filterUnits"
                    :uppercase="true"
                    @fire="() => addMenu(filterUnits, 'Unit')"
                  />
                  <Category
                    v-for="(unit, n) in unitsPaginated"
                    :key="n"
                    :menu="unit"
                    :loading="loading.mode == 'units' && loading.id == unit.stock2s_id && loading.value == true"
                    :menuid="Unitid"
                    @deleteMenu="(val) => deleteStockMenu(val, 'Unit')"
                    @selectMenu="(val) => Unitid = val"
                  />
                  <div>
                    <Pagination
                      :per-page="parseInt(6)"
                      :itemlist="getmenuUnitsFiltered"
                      :expectcurrentpage="1"
                      resource="Units"
                      @display-data="(data) => {unitsPaginated = data}"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <AddStock
          :menuid-major="MenuidMajor"
          :menuid-minor="MenuidMinor"
          :unitid="Unitid"
          :inventory-major-paginated="inventoryMajorPaginated"
          :inventory-minor-paginated="inventoryMinorPaginated"
          :units-paginated="unitsPaginated"
          :usersection="usersection"
          :token="getToken"
          @refresh="refresh()"
        />
      </div>
    </modal>
  </div>
</template>

<script>
import { filter } from 'lodash'
import { mapGetters, mapMutations, mapActions } from 'vuex'
import InventoryList from '@/components/common/inventory/InventoryList'
import AddCategory from '@/components/common/AddCategory'
import Category from '@/components/common/MajorCategory'
import AddStock from '@/components/common/inventory/AddStock'
import BaseFilter from '@/components/filters/BaseFilter'

export default {
  name: 'Inventory',

  components: {
    InventoryList, AddCategory, Category, AddStock, BaseFilter
  },

  data () {
    return {
      MenuidMajor: 0,
      MenuidMinor: 0,
      Unitid: 0,
      filterMinor: '',
      filterSearchMajor: '',
      filterUnits: '',
      getmenuMajorFiltered: [],
      inventoryMajorPaginated: [],
      inventoryMinorPaginated: [],
      inventoryMinorSelected: [],
      unitsPaginated: [],
      loading: { mode: null, id: 0, value: false },
      categoryText: ''
    }
  },

  computed: {
    ...mapGetters(['getToken', 'getUser', 'getmenuMajor', 'getUnits', 'getmenuMinor']),
    usersection () { return this.getUser ? this.getUser.section : null },
    getinventoryMinorSelected () {
      return filter(this.inventoryMinorSelected, (o) => {
        return o.category.includes(this.filterMinor)
      })
    },
    getmenuUnitsFiltered () {
      return filter(this.getUnits, (o) => {
        return o.category.includes(this.filterUnits)
      })
    }
  },

  watch: {
    getmenuMajor: {
      handler (value) {
        if (value) {
          this.getmenuMajorFiltered = value
        }
      }
    },
    filterSearchMajor: {
      handler (value) {
        if (value) {
          this.getmenuMajorFiltered = filter(this.getmenuMajor, (o) => {
            return o.category.includes(value)
          })
        } else {
          this.getmenuMajorFiltered = this.getmenuMajor
        }
      }
    }
  },

  created () {
    this.setPage(1)
    this.fetchMenu()
  },

  methods: {
    ...mapActions(['fetchMenu', 'fetchStock']),
    ...mapMutations(['setPage']),
    refresh () {
      this.MenuidMajor = 0
      this.MenuidMinor = 0
      this.Unitid = 0
      this.fetchStock()
    },
    setDisplayDataMenuMajor (data) {
      this.inventoryMajorPaginated = data
    },
    selectInventoryMajor (val) {
      const temp = filter(this.getmenuMinor, function (o) {
        return parseInt(o.stocks_id, 10) == parseInt(val, 10)
      })
      this.inventoryMinorSelected = temp.length > 0 ? temp : []
      this.MenuidMajor = val
      this.MenuidMinor = 0
      this.Unitid = 0
      this.inventoryMinorPaginated = []
    },
    firedEventMinor (val) {
      if (!this.MenuidMajor || !(this.MenuidMajor > 0)) {
        this.$toast.error(
          'Major Menu Not Selected or Required Fields are not provided'
        )
        return
      }
      this.addMenu(val, 'Minor', this.MenuidMajor)
    },
    async deleteStockMenu (Stockid, section) {
      const config = {
        headers: { 'X-CSRF-TOKEN': this.getToken }
      }
      const bodyParameters = {
        id: Stockid,
        type: section
      }
      switch (section) {
        case 'Major':
          this.loading = { mode: 'major', id: Stockid, value: true }
          break
        case 'Minor':
          this.loading = { mode: 'minor', id: Stockid, value: true }
          break
        case 'Unit':
          this.loading = { mode: 'units', id: Stockid, value: true }
          break
        default:
          this.loading = { mode: null, id: Stockid, value: true }
      }
      try {
        await this.$axios
          .$post('delStockMenu', bodyParameters, config)
          .then(({ result }) => {
            if (result) {
              this.MenuidMajor = 0
              this.inventoryMinorPaginated = []
              this.inventoryMinorSelected = []
              this.$toast.success('Deleted Successfully')
              this.fetchMenu()
              this.filterUnits = ''
            } else {
              this.$toast.error('Deleting might have failed!')
            }
          })
          .catch((errors) => {
            if (errors.response.data.message) {
              this.$toast.error(
                this.$ObjTemplate.trim(errors.response.data.message)
              )
            } else {
              this.$toast.error(
                this.$ObjTemplate.trim(errors.response.request.statusText)
              )
            }
          })
      } catch (e) {
        this.$toast.error(e)
      }
      this.loading = { mode: null, id: 0, value: false }
    },
    async addMenu (val, section, Menuid = 0) {
      const config = {
        headers: { 'X-CSRF-TOKEN': this.getToken }
      }
      const bodyParameters = {
        category: val,
        type: section,
        id: Menuid
      }
      try {
        await this.$axios
          .$post('addStockMenu', bodyParameters, config)
          .then(({ result }) => {
            if (result) {
              this.categoryText = null
              this.inventoryMinorPaginated = []
              this.inventoryMinorSelected = []
              this.$toast.success('Added Successfully')
              this.fetchMenu()
            } else {
              this.$toast.error('Adding  might have failed!')
            }
          })
          .catch((errors) => {
            if (errors.response.data.message) {
              this.$toast.error(
                this.$ObjTemplate.trim(errors.response.data.message)
              )
            } else {
              this.$toast.error(
                this.$ObjTemplate.trim(errors.response.request.statusText)
              )
            }
          })
      } catch (e) {
        this.$toast.error(e)
      }
    }
  }
}
</script>

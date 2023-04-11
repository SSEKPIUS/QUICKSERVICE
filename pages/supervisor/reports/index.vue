<template>
  <div class=" min-w-min main">
    <div class="min-h-screen  flex flex-row">
      <TabTop :tabs="tabs" />
      <div class=" w-full p-2 text-center mx-auto border shadow-lg">
        <div class="w-full bg-white p-2 text-center mx-auto flex flex-col items-stretch">
          <div class=" p-5 m-1 h-full w-full">
            <div class=" w-full p-5 border  shadow-2xl">
              <BaseFilter
                section="STOCK"
                section-text="SORT"
                :dates="false"
                :search="false"
                class=" mb-5"
              />
              <div v-for="(data, n) in stockReportList.data" :key="n">
                <ContentStockList :data="data" />
              </div>
            </div>
            <div v-show="stockReportList.links" class=" w-full p-2">
              <div class=" m-2 flex flex-row flex-nowrap justify-center items-center">
                <span
                  v-for="(link, n) in stockReportList.links"
                  :key="n"
                  :class="stockReportList.current_page == link.label?' text-red-600':' text-black'"
                  class=" px-2 cursor-pointer"
                  @click="loadPaginationPage(link.url)"
                  v-html="link.label"
                />
              </div>
            </div>
          </div>
          <div class="p-5 m-1 h-full w-full">
            <div class="w-full p-5 border  shadow-2xl">
              <div class=" flex flex-wrap gap-3">
                <SwitchContainer
                  v-model="form.CreateCleanerReports"
                  class=" mb-2 border rounded-md p-2 shadow-lg bg-gray-100" desc="create Cleaner's Stock reports"
                />
                <SwitchContainer
                  v-model="form.CreateLaundryReports"
                  class=" mb-2 border rounded-md p-2 shadow-lg bg-gray-100" desc="create bar Laundry Stock reports"
                />
                <SwitchContainer
                  v-model="form.CreateHouseReports"
                  class=" mb-2 border rounded-md p-2 shadow-lg bg-gray-100" desc="create House Stock reports"
                />
                <SwitchContainer
                  v-model="form.CreateAccountsReports"
                  class=" mb-2 border rounded-md p-2 shadow-lg bg-gray-100" desc="create Accounts' Stock reports"
                />
                <SwitchContainer
                  v-model="form.CreateSteamSaunaMassageReports"
                  class=" mb-2 border rounded-md p-2 shadow-lg bg-gray-100" desc="create Steam/Sauna/Massage Stock reports"
                />
                <SwitchContainer
                  v-model="form.CreateReceptionReports"
                  class=" mb-2 border rounded-md p-2 shadow-lg bg-gray-100" desc="create Reception Stock reports"
                />
                <SwitchContainer
                  v-model="form.CreateKitechReports"
                  class=" mb-2 border rounded-md p-2 shadow-lg bg-gray-100" desc="create Kitchen Stock reports"
                />
                <SwitchContainer
                  v-model="form.CreateServiceBarReports"
                  class=" mb-2 border rounded-md p-2 shadow-lg bg-gray-100" desc="create Service Bar reports"
                />
                <SwitchContainer
                  v-model="form.CreateSupervisorReports"
                  class="  mb-2 border rounded-md p-2 shadow-lg bg-gray-100" desc="create Supervisor Stock reports"
                />
                <SwitchContainer
                  v-model="form.CreateFinancialReports"
                  class=" mb-2 border rounded-md p-2 shadow-lg bg-gray-100" desc="create Financial reports"
                />
                <MultiInput v-model="form.emails" class=" mb-2" header="Send Email Reports to these addresses" />
              </div>
              <div class=" my-2 flex w-full">
                <div class=" ml-auto">
                  <input type="button" class="button button-success" value="SAVE SETTINGS" @click="saveSettings">
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import BaseFilter from '@/components/filters/BaseFilter'
import TabTop from '@/components/common/tabroutes/TabTop'
import ContentStockList from '@/components/common/ContentStockList'
import SwitchContainer from '@/components/common/SwitchContainerMini'
import MultiInput from '@/components/common/MultiInput'

export default {
  components: {
    TabTop,
    ContentStockList,
    SwitchContainer,
    MultiInput,
    BaseFilter
  },

  data () {
    return {
      tabs: [
        { name: 'MENU BAR', path: '/supervisor/menu-bar', active: false, icon: 'fa fa-glass' },
        { name: 'MENU KITCHEN', path: '/supervisor/menu-kitchen', active: false, icon: 'fa fa-cutlery' },
        { name: 'INVOICES', path: '/supervisor/invoices', active: false, icon: 'fa fa-money' },
        { name: 'ORDERS', path: '/supervisor/orders', active: false, icon: 'fa fa-sort' },
        { name: 'HOTEL ROOMS', path: '/supervisor/rooms', active: false, icon: 'fa fa-bed' },
        { name: 'SAUNA-MASSAGE', path: '/supervisor/sauna-massage', active: false, icon: 'fa fa-tint' },
        { name: 'INVENTORY', path: '/supervisor/inventory', active: false, icon: 'fa fa-archive' },
        { name: 'REPORTS', path: '/supervisor/reports', active: true, icon: 'fa fa-book' },
        { name: 'INVENTORY LOGS', path: '/supervisor/inventory-logs', active: false, icon: 'fa fa-file-text' },
        { name: 'SYSTEM LOGS', path: '/supervisor/system-logs', active: false, icon: 'fa fa-file-text' }
      ],
      form: {
        CreateCleanerReports: false,
        CreateLaundryReports: false,
        CreateHouseReports: false,
        CreateAccountsReports: false,
        CreateSteamSaunaMassageReports: false,
        CreateReceptionReports: false,
        CreateKitechReports: false,
        CreateServiceBarReports: false,
        CreateSupervisorReports: false,
        CreateFinancialReports: false,
        emails: []
      }

    }
  },

  computed: {
    ...mapGetters({ getToken: 'getToken', stockReportList: 'getStockReportList', getSearch: 'getSearch' })
  },

  watch: {
    getSearch: {
      handler (value) {
        this.fetchStockReportList()
      }
    }
  },

  mounted () {
    this.getSettings()
    this.fetchStockReportList()
  },

  methods: {
    ...mapActions(['fetchStockReportList']),
    loadPaginationPage (url) {
      if (!url) { return }
      this.fetchStockReportList(url)
    },

    async saveSettings () {
      const config = {
        headers: { 'X-CSRF-TOKEN': this.getToken }
      }
      try {
        await this.$axios.$post('setreportsettings', this.form, config)
          .then(({ result }) => {
            if (result) {
              this.$toast.success('Settings Saved')
              this.getSettings()
            }
          })
          .catch((errors) => {
            console.log(errors.response)
            if (errors.response.data.message) {
              this.$toast.error(this.$ObjTemplate.trim(errors.response.data.message))
            } else {
              this.$toast.error(this.$ObjTemplate.trim(errors.response.request.statusText))
            }
          })
      } catch (e) {
        this.$toast.error(e)
        console.log(e)
      }
    },

    async getSettings () {
      await this.$axios.get('reportsettings')
        .then(({ data }) => {
          if (data) {
            this.form.emails = data.reportemails

            const settings = data.reportsettings
            this.form.CreateCleanerReports = parseInt(settings.CreateCleanerReports) == 1
            this.form.CreateLaundryReports = parseInt(settings.CreateLaundryReports) == 1
            this.form.CreateHouseReports = parseInt(settings.CreateHouseReports) == 1
            this.form.CreateAccountsReports = parseInt(settings.CreateAccountsReports) == 1
            this.form.CreateSteamSaunaMassageReports = parseInt(settings.CreateSteamSaunaMassageReports) == 1
            this.form.CreateReceptionReports = parseInt(settings.CreateReceptionReports) == 1
            this.form.CreateKitechReports = parseInt(settings.CreateKitechReports) == 1
            this.form.CreateServiceBarReports = parseInt(settings.CreateServiceBarReports) == 1
            this.form.CreateSupervisorReports = parseInt(settings.CreateSupervisorReports) == 1
            this.form.CreateFinancialReports = parseInt(settings.CreateFinancialReports) == 1
          }
        })
        .catch((errors) => {
          console.log(errors.response)
          if (errors.response.data.message) {
            this.$toast.error(this.$ObjTemplate.trim(errors.response.data.message))
          } else {
            this.$toast.error(this.$ObjTemplate.trim(errors.response.request.statusText))
          }
        })
    }
  }

}
</script>

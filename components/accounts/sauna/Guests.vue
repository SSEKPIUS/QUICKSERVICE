<template>
  <div>
    <div ref="guest" class="flex w-full flex-row ">
      <div class="w-full relative">
        <div class="w-full mx-auto pt-2">
          <div class=" w-full p-2 relatiive">
            <div class="p-1 rounded-l-md h-8 w-min rounded absolute top-8" :class="getloadingGuests ? '' : 'bg-gray-200'">
              <svg
                v-if="!getloadingGuests"
                xmlns="http://www.w3.org/2000/svg"
                class="h-6 w-6 cursor-pointer"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                @click="reset"
              >
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              <Spinner v-else class="" />
            </div>
          </div>

          <!--pagination-->
          <div v-show="allGuests.links" class=" w-full p-2  shadow-2xl rounded mt-2  ">
            <div class=" m-2 flex flex-row flex-nowrap justify-center items-center">
              <span v-for="(link, n) in allGuests.links" :key="n" :class="allGuests.current_page == link.label?' text-red-600':' text-black'" class=" px-2 cursor-pointer" @click="loadPaginationPage(link.url)" v-html="link.label" />
            </div>
          </div>

          <div class="w-full overflow-x-scroll mb-10 min-h-full">
            <div class="table w-full">
              <div class="w-full table-row-group">
                <!-- heading row -->
                <div class="table-row bg-black rounded-sm text-white">
                  <div class="table-cell">
                    <div class="m-3 font-bold">
                      Name
                    </div>
                  </div>
                  <div class="table-cell font-bold">
                    <div class="m-3">
                      Service
                    </div>
                  </div>
                  <div class="table-cell font-bold">
                    <div class="m-3">
                      Fee
                    </div>
                  </div>
                  <div class="table-cell font-bold">
                    <div class="m-3">
                      Status
                    </div>
                  </div>
                  <div class="table-cell font-bold">
                    <div class="m-3">
                      Checked In
                    </div>
                  </div>
                </div>
                <!-- end of heading row -->
                <div v-for="(guest, i) in allGuests.data" :key="i" class="table-row bg-gray-500 text-white">
                  <div class="table-cell">
                    <div class="m-3">
                      {{ guest.fullname }}
                    </div>
                  </div>
                  <div class="table-cell">
                    <div class="m-3 whitespace-nowrap">
                      {{ guest.service }}
                    </div>
                  </div>
                  <div class="table-cell">
                    <div class="m-3">
                      {{ guest.fee }}
                    </div>
                  </div>
                  <div class="table-cell">
                    <div v-if="guest.paid == true" class="m-3">
                      PAID
                    </div>
                    <div v-if="guest.paid == false" class="m-3 text-red-500">
                      UNPAID
                    </div>
                  </div>
                  <div class="table-cell">
                    <div class="m-3">
                      {{ guest.created_at | humanDayDate }}
                    </div>
                  </div>
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
// eslint-disable no-console
import { mapGetters, mapActions, mapMutations } from 'vuex'
import Spinner from '@/components/filters/Spinner2'
export default {
  components: { Spinner },

  computed: {
    ...mapGetters(['getloadingGuests', 'allGuests', 'getSearch'])
  },

  watch: {
    getSearch: {
      handler (value) {
        this.loadSteamSaunaMassagePaginated()
      }
    }
  },

  mounted () {
    this.reset()
  },

  methods: {
    ...mapActions(['loadSteamSaunaMassagePaginated']),
    ...mapMutations(['RESET_SEARCH']),

    reset () {
      this.RESET_SEARCH()
      this.loadSteamSaunaMassagePaginated()
    },

    loadPaginationPage (url) {
      if (this.getloadingGuests) { return }
      if (!url) { return }
      this.loadSteamSaunaMassagePaginated(url)
    }
  }
}
</script>

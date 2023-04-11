<template>
  <div>
    <div ref="guest" class="flex w-full flex-row ">
      <div class="w-full relative">
        <div class="w-4/5 mx-auto">
          <div class="w-full grid grid-cols-2 space-between items-center">
            <h1 class="my-5 text-2xl font-black">
              All Guests
            </h1>

            <div class="text-right flex justify-end">
              <button class="p-3 text-white rounded-md bg-gray-500 whitespace-nowrap flex flex-row font-bold uppercase" @click="$modal.show('add-sauna-guest')">
                Add Guest
              </button>
            </div>
          </div>

          <BaseFilter
            class="border-b-2 mb-2 pb-2"
            section="Section"
            section-text="GUESTS"
            :options="false"
          />

          <div class=" w-full p-2 relative">
            <div class="p-1 rounded-l-md h-8 w-min rounded bg-gray-200 absolute top-8">
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
              <Spinner v-else />
            </div>
          </div>

          <!--pagination-->
          <div v-show="allGuests.links" class=" w-full p-2  shadow-2xl rounded mt-2  ">
            <div class=" m-2 flex flex-row flex-nowrap justify-center items-center">
              <span
                v-for="(link, n) in allGuests.links" :key="n"
                :class="allGuests.current_page == link.label?' text-red-600':' text-black'" class=" px-2 cursor-pointer" @click="loadPaginationPage(link.url)" v-html="link.label"
              />
            </div>
          </div>

          <div class="w-full rounded-xl overflow-x-scroll mb-10 min-h-full bg-white">
            <div class="table w-full">
              <div class="w-full table-row-group">
                <div class="table-row bg-black rounded-sm text-white">
                  <div class="table-cell">
                    <div class="m-3 font-bold">
                      Section
                    </div>
                  </div>
                  <div class="table-cell">
                    <div class="m-3 font-bold">
                      Name
                    </div>
                  </div>
                  <div class="table-cell">
                    <div class="m-3 font-bold">
                      Service
                    </div>
                  </div>
                  <div class="table-cell">
                    <div class="m-3 font-bold">
                      Fee
                    </div>
                  </div>
                  <div class="table-cell">
                    <div class="m-3 font-bold">
                      Status
                    </div>
                  </div>
                  <div class="table-cell">
                    <div class="m-3 font-bold">
                      Checked In
                    </div>
                  </div>
                  <div class="table-cell">
                    <div class="m-3 font-bold">
                      Action
                    </div>
                  </div>
                </div>
                <div v-for="(guest, i) in allGuests.data" :key="i" class="table-row bg-gray-500 text-white">
                  <div class="table-cell">
                    <div class="m-3">
                      {{ guest.section }}
                    </div>
                  </div>
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
                  <div>
                    <div v-if="guest.paid == true" class=" flex flex-row">
                      <button class="p-2 m-3 bg-green-500 rounded-md" @click="Print(guest)">
                        Receipt
                      </button>
                    </div>
                    <div v-if="guest.paid == false" class=" flex flex-row">
                      <button class="p-2 m-3 bg-blue-500 rounded-md" @click="Paid(guest)">
                        Paid
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <modal name="add-sauna-guest" height="auto" width="30%" :draggable="true" :scrollable="false">
      <AddGuest @refresh="refresh" />
    </modal>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex'
import AddGuest from '@/components/steamsaunamassage/AddGuest'
import BaseFilter from '@/components/filters/BaseFilter'
import Spinner from '@/components/filters/Spinner2'
export default {
  components: { AddGuest, BaseFilter, Spinner },

  data () {
    return {
      routeName: 'guests'
    }
  },

  computed: {
    ...mapGetters(['allGuests', 'getToken', 'getloadingGuests', 'getSearch'])
  },

  watch: {
    getSearch: {
      handler (value) {
        this.loadSteamSaunaMassagePaginated()
      }
    }
  },

  methods: {
    ...mapActions(['loadSteamSaunaMassagePaginated']),
    ...mapMutations(['RESET_SEARCH']),

    refresh () { this.$emit('refresh') },

    Print (guest) {
      this.$emit('Print', guest)
    },

    async Paid (guest) {
      const config = {
        headers: { 'X-CSRF-TOKEN': this.getToken }
      }
      const bodyParameters = guest
      try {
        await this.$swal.fire({
          title: 'Are you sure?',
          text: "You won't be able to revert this!",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Yes, Paid!'
        }).then((result) => {
          if (result.isConfirmed) {
            this.$axios.$post('guestSaunaMasagePaid', bodyParameters, config)
              .then(({ result, message }) => {
                // eslint-disable-next-line eqeqeq
                if (result == true) {
                  this.$toast.success(message)
                  this.refresh()
                }
              })
              .catch((errors) => {
                this.$swal.showValidationMessage(`Request failed: ${errors.response}`)
                if (errors.response.data.message) {
                  this.$toast.error(this.$ObjTemplate.trim(errors.response.data.message))
                } else {
                  this.$toast.error(this.$ObjTemplate.trim(errors.response.request.statusText))
                }
              })

            this.$swal.fire(
              'Paid!',
              'The guest Paid.',
              'success'
            )
          }
        })
      } catch (e) {
      // eslint-disable-next-line no-console
        console.log(e)
      }
    },

    reset () {
      this.RESET_SEARCH()
      this.refresh()
    },

    loadPaginationPage (url) {
      if (this.getloadingGuests) { return }
      if (!url) { return }
      this.loadSteamSaunaMassagePaginated(url)
    }

  }
}
</script>

<style scoped>

</style>

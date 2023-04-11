<template>
  <div class="w-full pt-5">
    <modal v-if="getUser && getUser.section == 'RECEPTION'" name="add-guest" :draggable="true" :scrollable="true" height="auto">
      <AddGuest />
    </modal>

    <div class="w-fill px-10 mx-auto">
      <div class="w-full grid grid-cols-2 space-between items-center">
        <h1 class="my-2 text-2xl font-black text-left">
          All Guests
        </h1>
        <div v-if="getUser && getUser.section == 'RECEPTION'" class="text-right flex justify-end">
          <button
            class=" px-3 py-1 text-white rounded-md bg-gray-500 whitespace-nowrap flex justify-center align-middle uppercase"
            @click="$modal.show('add-guest')"
          >
            Add Guest
          </button>
        </div>
      </div>

      <BaseFilter
        class="border-b-2 mb-5 pb-2"
        section="Section"
        section-text="GUESTS"
        :options="false"
      />

      <div v-if="allGuests" class=" mb-5 relative">
        <div class="p-1 rounded-l-md h-8 w-min rounded absolute left-4 top-4" :class="getloadingGuests ? '' : 'bg-gray-200'">
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

        <div v-show="allGuests.links" class=" w-full p-2  shadow-xl rounded mt-2  ">
          <div class=" m-2 flex flex-row flex-nowrap justify-center items-center">
            <!--eslint-disable-next-line vue/no-v-html-->
            <span v-for="(link, n) in allGuests.links" :key="n" :class="allGuests.current_page == link.label?' text-red-600':' text-black'" class=" px-2 cursor-pointer" @click="loadPaginationPage(link.url)" v-html="link.label" />
          </div>
        </div>
      </div>

      <div class=" w-full overflow-x-scroll mb-10 min-h-full bg-white">
        <div class="table w-full">
          <div class="w-full table-row-group overflow-x-scroll">
            <div class="table-row bg-black text-white mb-2">
              <div class="table-cell">
                <div class="m-3 whitespace-nowrap font-bold">
                  Name
                </div>
              </div>
              <div class="table-cell">
                <div class="m-3 whitespace-nowrap font-bold">
                  ID Num
                </div>
              </div>
              <div class="table-cell">
                <div class="m-3 whitespace-nowrap font-bold">
                  Room NO.
                </div>
              </div>
              <div class="table-cell">
                <div class="m-3 whitespace-nowrap font-bold">
                  Status
                </div>
              </div>
              <div class="table-cell">
                <div class="m-3 whitespace-nowrap font-bold">
                  Paid
                </div>
              </div>
              <div class="table-cell">
                <div class="m-3 whitespace-nowrap font-bold">
                  Days
                </div>
              </div>
              <div class="table-cell">
                <div class="m-3 whitespace-nowrap font-bold">
                  Checked In
                </div>
              </div>
              <div class="table-cell">
                <div class="m-3 whitespace-nowrap font-bold">
                  Leave Date
                </div>
              </div>
              <div v-if="getUser && getUser.section == 'RECEPTION'" class="table-cell">
                <div class="m-3 whitespace-nowrap font-bold">
                  Action
                </div>
              </div>
            </div>
            <div v-for="(guest, i) in allGuests.data" :key="i" class="table-row bg-gray-100 text-gray-700">
              <div class="table-cell">
                <div class="m-3 whitespace-nowrap text-left">
                  {{ guest.fullname }}
                </div>
              </div>
              <div class="table-cell">
                <div class="m-3 whitespace-wrap flex flex-col text-left">
                  <span>{{ guest.idType }} ({{ guest.idNum }})</span>
                  <span class=" text-xs text-black">{{ guest.email }}</span>
                </div>
              </div>
              <div class="table-cell">
                <div class="m-3 whitespace-nowrap">
                  {{ guest.roomNo }}
                </div>
              </div>
              <div class="table-cell">
                <div class="m-3 whitespace-nowrap uppercase">
                  {{ guest.status }}
                </div>
              </div>
              <div class="table-cell">
                <div v-if="guest.paid == true" class="m-3 whitespace-nowrap text-green-500">
                  PAID
                </div>
                <div v-if="guest.paid == false" class="m-3 whitespace-nowrap text-red-500">
                  UNPAID
                </div>
              </div>
              <div class="table-cell">
                <div class="m-3 whitespace-nowrap">
                  {{ guest.rdays }}
                </div>
              </div>
              <div class="table-cell">
                <div class="m-3 whitespace-nowrap">
                  {{ guest.checkIn ? guest.checkIn : null | humanDayDate }}
                </div>
              </div>
              <div class="table-cell">
                <div class="m-3 whitespace-nowrap">
                  {{ guest.leaveDate ? guest.leaveDate : null | humanDayDate }}
                </div>
              </div>
              <div v-if="getUser && getUser.section == 'RECEPTION'">
                <div v-if="guest.status == 'active'" class="flex pr-2">
                  <button
                    class="p-2 m-1 bg-green-200 capitalize rounded-sm whitespace-nowrap text-green-800 ml-auto"
                    @click="checkOut(guest)"
                  >
                    check-out
                  </button>
                  <button
                    class="p-2 m-1 whitespace-nowrap capitalize rounded-sm bg-green-200 text-gray-800"
                    @click="Print(guest)"
                  >
                    Receipt
                  </button>
                </div>
                <div v-if="guest.status == 'checked'" class="flex pr-2">
                  <button class="p-2 m-1 whitespace-nowrap capitalize rounded-sm bg-blue-200 text-blue-800 ml-auto" @click="Paid(guest)">
                    Paid
                  </button>
                  <button class="p-2 m-1 whitespace-nowrap capitalize rounded-sm bg-red-200 text-red-800" @click="Close(guest)">
                    Close
                  </button>
                </div>
                <div v-if="guest.status == 'inactive'" class="text-center capitalize rounded-md whitespace-nowrap text-red-800">
                  Closed
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
import { mapActions, mapGetters, mapMutations } from 'vuex'
import AddGuest from '@/components/reception/AddGuest'
import BaseFilter from '@/components/filters/BaseFilter'
import Spinner from '@/components/filters/Spinner2'
export default {
  name: 'Guests',
  components: { AddGuest, BaseFilter, Spinner },

  data () {
    return {
      routeName: 'guests'
    }
  },

  computed: {
    ...mapGetters(['allGuests', 'allGuestsCount', 'getToken', 'getUser', 'getloadingGuests', 'getSearch'])
  },

  watch: {
    getSearch: {
      handler (value) {
        this.loadGuestsPaginated()
      }
    }
  },

  methods: {
    ...mapActions(['loadGuestsPaginated', 'loadguestsrooms']),
    ...mapMutations(['RESET_SEARCH']),

    Print (guest) {
      this.$emit('Print', guest)
    },

    loadPaginationPage (url) {
      if (!url) { return }
      this.loadGuestsPaginated(url)
    },

    reset () {
      this.RESET_SEARCH()
      this.loadGuestsPaginated()
    },

    async checkOut (guest) {
      const config = {
        headers: { 'X-CSRF-TOKEN': this.getToken }
      }
      const bodyParameters = guest
      try {
        await this.$swal.fire({
          title: `ChekOut ${guest.fullname}?`,
          text: "You won't be able to revert this!",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonText: 'Yes, CheckOut!',
          cancelButtonText: 'No, cancel!',
          reverseButtons: true,
          showLoaderOnConfirm: true,
          preConfirm: (event) => {
            this.$axios
              .$post('newGuestcheckOut', bodyParameters, config)
              .then(({ result, message }) => {
                if (result == true) {
                  this.$toast.success(message)
                  this.loadGuestsPaginated()
                  this.loadguestsrooms()
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
          },
          allowOutsideClick: () => !this.$swal.isLoading()
        }).then((result) => {
          if (result.isConfirmed) {
            this.$swal.fire(
              `Checked Out ${guest.fullname}!`,
              'Guest is Checked Out.',
              'success'
            )
          }
        })
      } catch (e) {
        console.log(e)
      }
    },

    async Paid (guest) {
      const config = {
        headers: { 'X-CSRF-TOKEN': this.getToken }
      }
      const bodyParameters = guest
      try {
        await this.$swal.fire({
          title: `${guest.fullname} Paid Cash?`,
          text: "You won't be able to revert this!",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonText: 'Yes, Paid!',
          cancelButtonText: 'No, cancel!',
          reverseButtons: true,
          showLoaderOnConfirm: true,
          preConfirm: (event) => {
            this.$axios
              .$post('newGuestPaid', bodyParameters, config)
              .then(({ result, message }) => {
                if (result == true) {
                  this.$toast.success(message)
                  this.loadGuestsPaginated()
                  this.loadguestsrooms()
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
          },
          allowOutsideClick: () => !this.$swal.isLoading()
        })
      } catch (e) {
        console.log(e)
      }
    },

    async Close (guest) {
      const config = {
        headers: { 'X-CSRF-TOKEN': this.getToken }
      }
      const bodyParameters = guest
      try {
        await this.$swal.fire({
          title: `Close Room Order for ${guest.fullname}?`,
          text: "You won't be able to revert this!",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonText: 'Yes, Close!',
          cancelButtonText: 'No, cancel!',
          reverseButtons: true,
          showLoaderOnConfirm: true,
          preConfirm: (event) => {
            this.$axios
              .$post('newGuestClose', bodyParameters, config)
              .then(({ result, message }) => {
                if (result == true) {
                  this.$toast.success(message)
                  this.loadGuestsPaginated()
                  this.loadguestsrooms()
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
          },
          allowOutsideClick: () => !this.$swal.isLoading()
        })
      } catch (e) {
        console.log(e)
      }
    }
  }
}
</script>

<style scoped>
::-webkit-scrollbar {
  display: none;
}
</style>

<!-- eslint-disable vue/no-v-html -->
<template>
  <div class="w-full">
    <div class="w-full my-4 text-left">
      <h1 class="font-black px-5 uppercase text-gray-500">
        All Rooms <span class=" ml-4 uppercase border-2 px-2 py-1 cursor-pointer text-gray-900" @click="$modal.show('add-room')">add room</span>
      </h1>
    </div>
    <div class="w-full mx-auto min">
      <div class="mb-5 w-full px-5">
        <!--pagination-->
        <div v-show="roomsPaginated.links" class=" w-full p-2 mt-2">
          <div class=" m-2 flex flex-row flex-nowrap justify-center items-center">
            <!--eslint-disable-next-line vue/no-v-html-->
            <span
              v-for="(link, n) in roomsPaginated.links"
              :key="n"
              :class="roomsPaginated.current_page == link.label ?
                ' text-red-600' : ' text-black'" class=" px-2 cursor-pointer"
              @click="loadPaginationPage(link.url)" v-html="link.label"
            />
          </div>
        </div>

        <div class="w-full overflow-x-scroll mb-1 min-h-full bg-white">
          <div class="table w-full">
            <div class="w-full table-row-group">
              <!-- heading row -->
              <div class="table-row bg-black rounded-xl text-white">
                <div class="table-cell">
                  <div class="m-3 font-bold">
                    ID
                  </div>
                </div>
                <div class="table-cell">
                  <div class="m-3 font-bold">
                    TYPE
                  </div>
                </div>
                <div class="table-cell">
                  <div class="m-3 font-bold">
                    Room NO.
                  </div>
                </div>
                <div class="table-cell">
                  <div class="m-3 font-bold">
                    Status
                  </div>
                </div>
                <div class="table-cell">
                  <div class="m-3 font-bold">
                    No. BEDS
                  </div>
                </div>
                <div class="table-cell">
                  <div class="m-3 font-bold">
                    FEES
                  </div>
                </div>
                <div class="table-cell">
                  <div class="m-3 font-bold" />
                </div>
              </div>
              <div v-for="(room, i) in roomsPaginated.data" :key="i" class="table-row bg-gray-100 text-gray-700">
                <div class="table-cell">
                  <div class="m-3">
                    {{ room.id }}
                  </div>
                </div>
                <div class="table-cell">
                  <div class="m-3 whitespace-nowrap">
                    {{ room.type }}
                  </div>
                </div>
                <div class="table-cell">
                  <div class="m-3">
                    {{ room.roomNo }}
                  </div>
                </div>
                <div class="table-cell">
                  <div class="m-3 uppercase">
                    {{ room.occupied == true ? 'OCCUPIED' : 'EMPTY' }}
                  </div>
                </div>
                <div class="table-cell">
                  <div class="m-3 uppercase">
                    {{ room.beds }}
                  </div>
                </div>
                <div class="table-cell">
                  <div class="m-3 uppercase">
                    UGX: {{ room.fee | number_format }}
                  </div>
                </div>
                <div class="table-cell">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="mt-5 h-6 w-6 text-red-500 hover:text-red-700 cursor-pointer"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    stroke-width="2"
                    @click="delRoom(room.id)"
                  >
                    <path stroke-linecap="round" stroke-linejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <modal name="add-room" :draggable="true" :scrollable="true" width="40%" height="auto">
      <div class="p-3">
        <div class=" shadow-lg p-5">
          <h1 class=" uppercase text-gray-500 font-black">
            add room
          </h1>
          <div>
            <form @submit.prevent="newRoom">
              <div class="p-2 text-sm text-left">
                <label class="font-bold text-yellow-800 text-sm" for="RType">Room Type</label>
                <select id="RType" v-model="form.type" name="" class="py-3 px-3 w-full border-b-2 border-gray-200 focus:outline-none hover:border-yellow-300" required>
                  <option value="SINGLE">
                    SINGLE
                  </option>
                  <option value="DOUBLE">
                    DOUBLE
                  </option>
                  <option value="TWIN">
                    TWIN
                  </option>
                  <option value="STANDARD DBL">
                    STANDARD DBL
                  </option>
                </select>
              </div>
              <div class="p-2 text-sm text-left">
                <label class="font-bold text-yellow-800 text-sm" for="IDNumber">Room Number</label>
                <input id="IDNumber" v-model="form.roomNo" type="text" class="py-3 px-3 w-full border-b-2 border-gray-200 focus:outline-none hover:border-yellow-300">
              </div>
              <div class="p-2 text-sm text-left">
                <label class="font-bold text-yellow-800 text-sm" for="NBeds">Number of Beds</label>
                <input
                  id="NBeds"
                  v-model="form.beds"
                  type="number"
                  min="1"
                  max="4"
                  class="py-3 px-3 w-full border-b-2 border-gray-200 focus:outline-none hover:border-yellow-300"
                  required
                >
              </div>
              <div class="p-2 text-sm text-left">
                <label class="font-bold text-yellow-800 text-sm" for="Fees">Fees</label>
                <input
                  id="Fees"
                  v-model="form.fee"
                  type="number"
                  min="10000"
                  class="py-3 px-3 w-full border-b-2 border-gray-200 focus:outline-none hover:border-yellow-300"
                  required
                >
              </div>
              <div class="text-sm p-2" />
              <div class="my-3">
                <input type="button" class="button button-error" style="margin: 0;" value="Cancel" @click.prevent="$modal.hide('add-room')">
                <input type="submit" class="button button-success" style="margin: 0;" value="Submit">
              </div>
            </form>
          </div>
        </div>
      </div>
    </modal>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  data () {
    return {
      routeName: 'rooms',
      form: {
        type: '',
        roomNo: '',
        beds: '',
        fee: 0
      }
    }
  },

  computed: {
    ...mapGetters(['roomsPaginated', 'getToken'])
  },

  methods: {
    ...mapActions(['loadguestsroomsPaginated']),

    resetForm () {
      this.form = { ...this.form, type: '', roomNo: '', beds: '', fee: '' }
    },

    loadPaginationPage (url) {
      if (!url) { return }
      this.loadguestsroomsPaginated(url)
    },

    async newRoom () {
      const config = {
        headers: { 'X-CSRF-TOKEN': this.getToken }
      }
      const bodyParameters = this.form
      try {
        await this.$axios.$post('newRoom', bodyParameters, config)
          .then(({ result, message }) => {
            if (result == true) {
              this.$toast.success(message)
              this.resetForm()
              this.$emit('refresh')
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
        console.log(e)
      }
    },

    async delRoom (id) {
      const config = {
        headers: { 'X-CSRF-TOKEN': this.getToken }
      }
      try {
        await this.$axios.$post('delRoom', { id }, config)
          .then(({ result, message }) => {
            if (result == true) {
              this.$toast.success(message)
              this.$emit('refresh')
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

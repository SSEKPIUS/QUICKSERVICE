<template>
  <div class="w-full">
    <div class=" py-3 flex justify-start items-center">
      <span class=" text-gray-500 uppercase font-extrabold text-xl border-gray-600 border-r-4 pr-2 mr-4">section</span>
      <span class=" uppercase font-bold mr-2 cursor-pointer border-black" :class="{'border-b-2 text-blue-900':tab===0}" @click="tab=0">Massage</span>
      <span class=" uppercase font-bold cursor-pointer border-black" :class="{'border-b-2 text-blue-900':tab===1}" @click="tab=1">Sauna</span>
    </div>

    <div v-show="tab===0" class="mx-auto min">
      <modal name="add-massage" height="auto" width="25%">
        <div class="w-full rounded-sm px-2 py-10 shadow-lg">
          <div>
            <h1 class="uppercase text-gray-500 font-black">
              new massage package
            </h1>
            <div>
              <form @submit.prevent="newMassagePackage">
                <div class="flex flex-col">
                  <div class="p-2 text-sm w-full">
                    <label class="font-bold text-gray-700 text-sm" for="NBeds">massage Package</label>
                    <input
                      id="NBeds" v-model="massage.name" type="text" class=" py-3  px-3  w-full border-b-2 border-gray-200 focus:outline-none
                        hover:border-yellow-300" required
                    >
                  </div>

                  <div class="p-2 text-sm w-full">
                    <label class="font-bold text-gray-700 text-sm" for="Fees">Fees</label>
                    <input
                      id="Fees"
                      v-model="massage.fee"
                      type="number"
                      min="10000"
                      class=" py-3  px-3 w-full border-b-2 border-gray-200 focus:outline-none
                        hover:border-yellow-300"
                      required
                    >
                  </div>

                  <div class="p-2 text-sm w-full">
                    <label class="font-bold text-gray-700 text-sm" for="Fees">Period (Hours)</label>
                    <input
                      id="Fees"
                      v-model="massage.time"
                      type="number"
                      min="1"
                      max="5"
                      class=" py-3  px-3 w-full border-b-2 border-gray-200 focus:outline-none
                        hover:border-yellow-300"
                      required
                    >
                  </div>
                </div>
                <div class="text-sm p-2" />

                <div class="my-3">
                  <input type="button" class="button button-error ml-auto" style=" margin-left: auto;" value="Clear" @click="Clear()">
                  <input type="submit" class="button button-success" value="SAVE">
                </div>
              </form>
            </div>
          </div>
        </div>
      </modal>

      <div class="w-full grid grid-cols-2 space-between items-center">
        <h1 class="my-2 text-xl font-black text-left capitalize">
          massage packages
        </h1>
        <div class="text-right flex justify-end">
          <button
            class=" px-3 py-1 text-white rounded-md bg-gray-500 whitespace-nowrap flex justify-center align-middle uppercase"
            @click="$modal.show('add-massage')"
          >
            add massage packages
          </button>
        </div>
      </div>

      <div class="mb-5 w-full px-2 py-5">
        <div class="w-full overflow-x-scroll mb-1 min-h-full bg-white">
          <div class="table w-full">
            <div class="w-full table-row-group">
              <div class="table-row bg-black rounded-xl text-white">
                <div class="table-cell">
                  <div class="m-3 font-bold">
                    ID
                  </div>
                </div>
                <div class="table-cell">
                  <div class="m-3 font-bold text-left">
                    MASSAGE PACKAGE
                  </div>
                </div>
                <div class="table-cell">
                  <div class="m-3 font-bold">
                    FEE.
                  </div>
                </div>
                <div class="table-cell">
                  <div class="m-3 font-bold">
                    PERIOD
                  </div>
                </div>
                <div class="table-cell">
                  <div class="m-3" />
                </div>
              </div>
              <div v-for="(room, i) in allMassage" :key="i" class="table-row bg-gray-500 text-white">
                <div class="table-cell">
                  <div class="m-3">
                    {{ room.id }}
                  </div>
                </div>
                <div class="table-cell">
                  <div class="m-3 whitespace-nowrap text-left">
                    {{ room.name }}
                  </div>
                </div>
                <div class="table-cell">
                  <div class="m-3">
                    {{ room.fee }}
                  </div>
                </div>
                <div class="table-cell">
                  <div class="m-3">
                    {{ room.time }}
                  </div>
                </div>
                <div class="table-cell">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class=" mt-5 h-6 w-6 text-red-500 hover:text-red-700 cursor-pointer"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    stroke-width="2"
                    @click="delMassage(room.id)"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div v-show="tab===1" class="mx-auto min">
      <modal name="add-sauna" height="auto" width="25%">
        <div class="w-full rounded-sm px-2 py-5 shadow-lg">
          <div>
            <h1 class="uppercase text-gray-500 font-black">
              add steam sauna package
            </h1>
            <div>
              <form @submit.prevent="newSteamSaunaPackage">
                <div class="">
                  <div class="p-2 text-sm w-full">
                    <label class="font-bold text-gray-700 text-sm" for="NBeds">steam sauna Package</label>
                    <input
                      id="NBeds"
                      v-model="sauna.name"
                      type="text"
                      class=" py-3  px-3  w-full border-b-2 border-gray-200 focus:outline-none
                        hover:border-yellow-300" required
                    >
                  </div>

                  <div class="p-2 text-sm w-full">
                    <label class="font-bold text-gray-700 text-sm" for="Fees">Fees</label>
                    <input
                      id="Fees"
                      v-model="sauna.fee"
                      type="number"
                      min="10000"
                      class=" py-3 px-3 w-full border-b-2 border-gray-200 focus:outline-none
                        hover:border-yellow-300"
                      required
                    >
                  </div>
                </div>
                <div class="text-sm p-2" />
                <div class="my-3">
                  <input type="button" class="button button-error ml-auto" style=" margin-left: auto;" value="Clear" @click="Clear()">
                  <input type="submit" class="button button-success" value="SAVE">
                </div>
              </form>
            </div>
          </div>
        </div>
      </modal>

      <div class="w-full grid grid-cols-2 space-between items-center">
        <h1 class="my-2 text-xl font-black text-left capitalize">
          steam sauna packages
        </h1>
        <div class="text-right flex justify-end">
          <button
            class=" px-3 py-1 text-white rounded-md bg-gray-500 whitespace-nowrap flex justify-center align-middle uppercase"
            @click="$modal.show('add-sauna')"
          >
            add steam sauna package
          </button>
        </div>
      </div>

      <div class="mb-5 w-full px-2 py-5">
        <div class="w-full overflow-x-scroll mb-1 min-h-full bg-white">
          <div class="table w-full">
            <div class="w-full table-row-group">
              <div class="table-row bg-black rounded-xl text-white">
                <div class="table-cell">
                  <div class="m-3 font-bold">
                    ID
                  </div>
                </div>
                <div class="table-cell text-left">
                  <div class="m-3 font-bold">
                    STEAM SAUNA PACKAGE
                  </div>
                </div>
                <div class="table-cell">
                  <div class="m-3">
                    FEE.
                  </div>
                </div>
                <div class="table-cell">
                  <div class="m-3" />
                </div>
              </div>
              <div v-for="(packg, i) in allsteamsauna" :key="i" class="table-row bg-gray-500 text-white">
                <div class="table-cell">
                  <div class="m-3">
                    {{ packg.id }}
                  </div>
                </div>
                <div class="table-cell text-left">
                  <div class="m-3 whitespace-nowrap">
                    {{ packg.name }}
                  </div>
                </div>
                <div class="table-cell">
                  <div class="m-3">
                    {{ packg.fee }}
                  </div>
                </div>
                <div class="table-cell">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class=" mt-5  h-6  w-6  text-red-500 hover:text-red-700 cursor-pointer"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    stroke-width="2"
                    @click="delSauna(packg.id)"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                    />
                  </svg>
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
import { mapGetters } from 'vuex'
export default {
  props: {
    token: {
      type: String,
      required: true
    }
  },

  data () {
    return {
      tab: 0,
      routeName: 'rooms',
      massage: {
        name: '',
        fee: 0,
        time: 0
      },
      sauna: {
        name: '',
        fee: 0
      }
    }
  },

  computed: {
    ...mapGetters(['allMassage', 'allsteamsauna'])
  },

  methods: {
    Clear () {
      this.massage = {
        name: '',
        fee: 0,
        time: 0
      }
      this.sauna = {
        name: '',
        fee: 0
      }
    },

    async newMassagePackage () {
      const config = {
        headers: { 'X-CSRF-TOKEN': this.token }
      }
      const bodyParameters = this.massage
      try {
        await this.$axios
          .$post('newMassagePackage', bodyParameters, config)
          .then(({ result, message }) => {
            if (result == true) {
              this.Clear()
              this.$toast.success(message)
              this.$emit('refresh')
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
        console.log(e)
      }
    },

    async newSteamSaunaPackage () {
      const config = {
        headers: { 'X-CSRF-TOKEN': this.token }
      }
      const bodyParameters = this.sauna
      try {
        await this.$axios
          .$post('newSteamSaunaPackage', bodyParameters, config)
          .then(({ result, message }) => {
            if (result == true) {
              this.Clear()
              this.$toast.success(message)
              this.$emit('refresh')
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
        console.log(e)
      }
    },

    async delMassage (id) {
      const config = {
        headers: { 'X-CSRF-TOKEN': this.token }
      }
      try {
        await this.$axios
          .$post('delMassage', { id }, config)
          .then(({ result, message }) => {
            if (result == true) {
              this.$toast.success(message)
              this.$emit('refresh')
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
        console.log(e)
      }
    },

    async delSauna (id) {
      const config = {
        headers: { 'X-CSRF-TOKEN': this.token }
      }
      try {
        await this.$axios
          .$post('delSauna', { id }, config)
          .then(({ result, message }) => {
            if (result == true) {
              this.$toast.success(message)
              this.$emit('refresh')
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
        console.log(e)
      }
    }
  }
}
</script>

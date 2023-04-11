
<template>
  <div class="p-10 shadow-xl shadow-yellow-300 w-full rounded-sm h-auto">
    <div class="m-2">
      <h1 class="font-black text-gray-500">
        New Guest
      </h1>
    </div>

    <div>
      <form @submit.prevent="newGuest">
        <div class=" flex flex-row">
          <div class="p-2 text-sm w-1/2">
            <label class="font-bold text-gray-500 text-sm" for="FullName">FullName</label>
            <input id="FullName" v-model="form.fullname" type="text" class="py-1 pr-3 w-full border-b-2 border-gray-200 focus:outline-none hover:border-yellow-300" required>
          </div>

          <div class="p-2 text-sm w-1/2">
            <label class="font-bold text-gray-500 text-sm" for="Email">Email</label>
            <input id="Email" v-model="form.email" type="email" class="py-1 pr-3 w-full border-b-2 border-gray-200 focus:outline-none hover:border-yellow-300" required>
          </div>
        </div>

        <div class=" flex flex-row">
          <div class="p-2 text-sm w-1/2">
            <label class="font-bold text-gray-500 text-sm" for="IDType">ID Type</label>
            <select id="IDType" v-model="form.idType" name="" class="py-1 pr-3 w-full border-b-2 border-gray-200 focus:outline-none hover:border-yellow-300" required>
              <option value="National ID">
                National ID
              </option>
              <option value="PassPort">
                PassPort
              </option>
              <option value="Drivers Permit">
                Drivers Permit
              </option>
            </select>
          </div>

          <div class="p-2 text-sm w-1/2">
            <label class="font-bold text-gray-500 text-sm" for="IDNumber">NIN/PassPort/Drivers Permit Number</label>
            <input id="IDNumber" v-model="form.idNum" type="text" class="py-1 pr-3 w-full border-b-2 border-gray-200 focus:outline-none hover:border-yellow-300" required>
          </div>
        </div>

        <div class="p-2 flex flex-row">
          <div class="p-2 mb-3 text-sm w-full">
            <label class="font-bold text-gray-500" for="AOB">Any Other Information</label>
            <textarea id="AOB" v-model="form.aob" class="py-1 pr-3 w-full h-full border-b-2 border-gray-200 focus:outline-none hover:border-yellow-300" type="text" required />
          </div>
        </div>

        <div class="p-2 flex flex-row">
          <div class="p-2 mb-3 text-sm w-1/2">
            <label for="rooms" class="text-sm text-gray-500 font-bold">Select Room</label>
            <select id="rooms" v-model="form.Room" name="" class="py-1 pr-3 w-full border-b-2 border-gray-200 focus:outline-none hover:border-yellow-300" required>
              <option v-for="(room, i) in roomlistFiltered" :key="i" :value="room">
                {{ room.roomNo }} {{ room.type }} {{ room.beds }} Beds
              </option>
            </select>
          </div>
          <div class="p-2 text-sm w-1/2">
            <label class="font-bold text-gray-500 text-sm" for="fee">Type</label>
            <div class="py-1 pr-3 w-full border-b-2 border-gray-200 focus:outline-none hover:border-yellow-300">
              {{ form.Room.type || 'N/A' }}
            </div>
          </div>
        </div>

        <div class="p-2 flex flex-row">
          <div class="p-2 text-sm w-1/2">
            <label class="font-bold text-gray-500 text-sm" for="fee">Fee/Day</label>
            <div class="py-1 pr-3 w-full border-b-2 border-gray-200 focus:outline-none hover:border-yellow-300">
              Ugx: {{ form.Room.fee * form.rdays || 0 | number_format }}
            </div>
          </div>
          <div class="p-2 text-sm w-1/2">
            <label class="font-bold text-gray-500 text-sm" for="fee">Days</label>
            <input
              v-model="form.rdays"
              type="Number"
              min="1"
              max="365"
              class="py-1 pr-3 w-full border-b-2 border-gray-200 focus:outline-none hover:border-yellow-300"
              required
            >
          </div>
        </div>
        <div class="text-sm p-2" />
        <div class="my-3 flex">
          <input type="button" class="button button-error ml-auto" style=" margin-left: auto;" value="Clear" @click="clear()">
          <input type="submit" class="button button-success" value="SAVE">
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { filter } from 'lodash'
import { mapActions, mapGetters } from 'vuex'
export default {
  name: 'AddGuest',

  data () {
    return {
      form: {
        fullname: '',
        Room: {},
        idType: '',
        idNum: '',
        aob: '',
        email: '',
        rdays: 1
      }
    }
  },

  computed: {
    ...mapGetters(['rooms', 'getToken']),

    formRoom () { return this.form.Room },

    roomlistFiltered () {
      return filter(this.rooms, (r) => {
        return r.occupied == false
      })
    }
  },

  methods: {
    ...mapActions(['loadGuestsPaginated', 'loadguestsrooms']),

    async newGuest () {
      try {
        await this.$swal.fire({
          title: 'Adding New Guest?',
          text: `${this.form.fullname} for Period of  ${this.form.rdays} days in ${this.form.Room.type} ${this.form.Room.roomNo} .You won't be able to revert this!`,
          icon: 'warning',
          showCancelButton: true,
          confirmButtonText: 'Yes, Add!',
          cancelButtonText: 'No, cancel!',
          reverseButtons: true,
          showLoaderOnConfirm: true,
          preConfirm: (event) => {
            this.$axios.$post('newGuest', this.form, { headers: { 'X-CSRF-TOKEN': this.getToken } })
              .then(({ result, message }) => {
                if (result == true) {
                  this.$toast.success(message)
                  this.loadGuestsPaginated()
                  this.loadguestsrooms()
                  this.clear()
                }
              })
              .catch((errors) => {
                this.$swal.showValidationMessage(`Request failed: ${errors}`)
                if (errors.response.data.message) {
                  this.$toast.error(this.$ObjTemplate.trim(errors.response.data.message))
                } else {
                  this.$toast.error(this.$ObjTemplate.trim(errors.response.request.statusText))
                }
              })
          },
          allowOutsideClick: () => !this.$swal.isLoading()
        }).then((result) => {
          if (result.isConfirmed) {
            this.$swal.fire(
              'Saved!',
              'Guest is added.',
              'success'
            )
          } else if (result.dismiss == this.$swal.DismissReason.cancel) {
            this.$swal.fire(
              'Cancelled',
              'Guest is not added! :)',
              'error'
            )
          }
        })
      } catch (e) {
        console.log(e)
      }
    },

    clear () {
      this.form = {
        fullname: '',
        Room: {},
        idType: '',
        idNum: '',
        aob: '',
        email: '',
        rdays: 1
      }
    }
  }
}
</script>

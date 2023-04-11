
<template>
  <div class="p-5 shadow-xl shadow-yellow-300 rounded-sm">
    <div class="m-2">
      <h1 class="font-black text-gray-800">
        New Guest
      </h1>
    </div>

    <div>
      <form @submit.prevent="newGuest">
        <div class="p-2">
          <div class="p-2 text-sm w-full">
            <label class="font-bold text-gray-800 text-sm" for="FullName">FullName</label>
            <input id="FullName" v-model="form.fullname" type="text" class="py-3 pr-3 w-full border-b-2 border-gray-200 focus:outline-none hover:border-yellow-300" required>
          </div>

          <div class="flex flex-col justify-center items-center my-3 w-full">
            <SwitchContainer :loading-perm="false" :left="left" leftmsg="Steam Sauna" rigthmsg="Massage" @handleToggleActive="handleToggleActive" />
          </div>

          <div v-show="left" class="p-2 mb-3 text-sm w-full">
            <label for="rooms" class="text-sm text-gray-800 font-bold">Select SteamSauna Service</label>
            <select id="rooms" v-model="SteamSauna" name="" class="py-3 pr-3 w-full border-b-2 border-gray-200 focus:outline-none hover:border-yellow-300">
              <option v-for="(val, i) in allsteamsauna" :key="i" :value="val">
                {{ val.name }}
              </option>
            </select>
          </div>

          <div v-show="!left" class="p-2 mb-3 text-sm w-full">
            <label for="rooms" class="text-sm text-gray-800 font-bold">Select Massage Service</label>
            <select id="rooms" v-model="Massage" name="" class="py-3 pr-3 w-full border-b-2 border-gray-200 focus:outline-none hover:border-yellow-300">
              <option v-for="(val, i) in allMassage" :key="i" :value="val">
                {{ val.name }} ({{ val.time }} Mins)
              </option>
            </select>
          </div>

          <div class="p-2 text-sm w-full">
            <label class="font-bold text-gray-800 text-sm" for="fee">Customers</label>
            <input
              v-model="PCount"
              type="number"
              min="1"
              max="10"
              class="py-3 pr-3 w-full border-b-2 border-gray-200 focus:outline-none hover:border-yellow-300"
            >
          </div>

          <div class="p-2 text-sm w-full">
            <label class="font-bold text-gray-800 text-sm" for="fee">Fee</label>
            <div
              class="py-3 pr-3 w-full border-b-2 border-gray-200 focus:outline-none hover:border-yellow-300"
            >
              {{ form.fee }}
            </div>
          </div>

          <div class="p-2 text-sm w-full">
            <label class="font-bold text-gray-800 text-sm" for="fee">Service</label>
            <div
              class="py-3 pr-3 w-full border-b-2 border-gray-200 focus:outline-none hover:border-yellow-300 mb-0"
            >
              {{ form.service }}
            </div>
          </div>
        </div>

        <div class="my-2 flex">
          <input type="button" class="button button-error ml-auto" style=" margin-left: auto;" value="CLEAR" @click="clear()">
          <input type="submit" class="button button-success" value="SAVE">
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import SwitchContainer from '@/components/common/SwitchContainerCustom'
export default {
  name: 'AddGuest',
  components: { SwitchContainer },
  data () {
    return {
      left: true,
      PCount: 1,
      form: {
        section: '',
        fullname: '',
        service: '',
        fee: '0',
        time: '1'
      },
      SteamSauna: [],
      Massage: [],
      loading: false
    }
  },

  computed: {
    ...mapGetters(['allsteamsauna', 'allMassage', 'getToken']),

    formRoom () { return this.form.Room }
  },

  watch: {
    PCount: {
      immediate: true,
      handler (value) {
        if (Object.keys(this.SteamSauna).length > 0) {
          this.form.fee = parseInt(this.SteamSauna.fee) * parseInt(value)
        }
        if (Object.keys(this.Massage).length > 0) {
          this.form.fee = parseInt(this.Massage.fee) * parseInt(value)
        }
      }
    },
    SteamSauna: {
      immediate: true,
      handler (value) {
        this.form.service = value.name
        this.form.fee = parseInt(value.fee) * parseInt(this.PCount)
      }
    },
    Massage: {
      immediate: true,
      handler (value) {
        this.form.service = value.name
        this.form.fee = parseInt(value.fee) * parseInt(this.PCount)
        this.form.time = value.time
      }
    },
    left: {
      immediate: true,
      handler (value) {
        if (value) {
          this.form.section = 'steam-sauna'
        } else {
          this.form.section = 'massage'
        }
        this.form = {
          section: '',
          fullname: '',
          service: '',
          fee: '0',
          time: '1'
        }
        this.PCount = 1
      }
    }
  },

  methods: {

    handleToggleActive () {
      this.left = !this.left
    },

    async newGuest () {
      this.loading = true
      const config = {
        headers: { 'X-CSRF-TOKEN': this.getToken }
      }
      const bodyParameters = this.form
      try {
        await this.$swal.fire({
          title: 'Adding New Guest?',
          text: "You won't be able to revert this!",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonText: 'Yes, Add!',
          cancelButtonText: 'No, cancel!',
          reverseButtons: true,
          showLoaderOnConfirm: true,
          preConfirm: (event) => {
            this.$axios.$post('newGuestSteamSaunMassage', bodyParameters, config)
              .then(({ result, message }) => {
                if (result == true) {
                  this.$toast.success(message)
                  this.$emit('refresh')
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
      // eslint-disable-next-line no-console
        console.log(e)
      }
      this.loading = false
    },

    clear () {
      this.form = {
        section: '',
        fullname: '',
        service: '',
        fee: '0',
        time: '1'
      }
      this.PCount = 1
    }
  }
}
</script>

<style scoped>

</style>

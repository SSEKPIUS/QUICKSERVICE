<template>
  <div class="w-auto p-1">
    <div class="flex flex-col rounded overflow-hidden h-auto border shadow-xl p-3">
      <div class="flex justify-center items-start w-full">
        <img
          class="block rounded-full  w-16 flex-none bg-cover h-16 bg-white cursor-pointer"
          :src="user.image"
          @click="toggleTooltip()"
        >
        <div class="flex flex-row w-full justify-end  align-top">
          <button
            v-if="!loadingDel"
            class=" bg-transparent  hover:bg-red-500  text-red-700 font-semibold  hover:text-white  py-0 px-4 border border-red-500 hover:border-transparent rounded"
            @click="showModal = true; modalRoutine = 'DeleteUser';"
          >
            DELETE
          </button>
          <span v-else>
            <Spinner />
          </span>
        </div>
      </div>
      <!--POPER-->
      <div
        ref="tooltipRef"
        :class="{ hidden: !tooltipShow, block: tooltipShow }"
        class="bg-gray-200  border-0 mx-auto  my-5 p-5 block font-normal leading-normal text-sm  w-full text-left  no-underline break-words rounded-lg"
      >
        <div class="m-0 p-0">
          <div
            class="bg-gray-400  text-white  opacity-75 font-semibold  p-1  mb-0  border-b border-solid border-blueGray-100 capitalize  rounded-t-lg flex flex-row"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5 text-red-600"
              viewBox="0 0 20 20"
              fill="currentColor"
              @click="toggleTooltip()"
            >
              <path
                fill-rule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                clip-rule="evenodd"
              />
            </svg>
            <span class="pl-4 text-gray-900 text-xs">update profile picture ({{ uploadPercentage }}%)</span>
          </div>
          <label class="p-0 text-xs" for="file">
            <input
              id="file"
              ref="fileInput"
              class="m-0 rounded-sm"
              name="file"
              type="file"
              @change="handleSelectedFiles"
            >
          </label>
        </div>
      </div>
      <!---->
      <div class="flex justify-center items-center w-full">
        <div class="text-black font-bold text-xl mb-1 leading-tight w-full">
          {{ user.name }}
        </div>
      </div>

      <div class="flex justify-center items-center w-full">
        <div class="flex flex-row w-full justify-start items-end mt-1">
          <div class="capitalize text-gray-500 font-bold text-left">
            quick access code:
          </div>
          <div class="text-black ml-5 text-left font-bold">
            {{ user.qac }}
          </div>
        </div>
      </div>

      <div class="flex justify-center items-center w-full">
        <div class="flex flex-col w-full justify-start items-start mt-1">
          <div class="text-blue-500 font-medium text-base mb-2 leading-tight">
            {{ user.section }}
          </div>
          <div class="text-grey-darker text-base text-blue-500">
            {{ user.email }}
          </div>
        </div>
      </div>

      <div class="border-t-2 w-full py-4" />
      <div class="flex justify-start align-middle w-full">
        <div class="flex flex-row w-full">
          <div
            class="flex-col justify-start items-start"
            :class="user.email_verified_at ? 'w-1/2' : 'w-full'"
          >
            <div
              v-if="user.email_verified_at"
              class=" flex flex-row  align-middle justify-start text-left text-grey-darker text-sm w-full  text-green-500"
            >
              <span>Verified Account</span>
              <span
                v-show="user.permission == 5"
                class="text-red-600 mx-1"
              >(Frozen)</span>
            </div>
            <div
              v-else
              class="text-grey-darker text-base w-full text-red-500 flex flex-row justify-start align-middle"
            >
              <div
                v-show="!AuthCodeSentToMail"
                class="w-full text-center my-1"
              >
                <div class="flex flex-row">
                  <button
                    v-if="!loadingVerify"
                    class=" w-full  bg-gray-200  hover:bg-blue-500  text-red-700  font-semibold  hover:text-white py-0 px-4 border border-blue-500  hover:border-transparent rounded"
                    @click.prevent="VerifyUser"
                  >
                    Unverified Account
                  </button>
                  <div v-else class="text-green-500 text-sm whitespace-nowrap">
                    <Spinner /> <span>Verifying Email {{ user.email }}</span>
                  </div>
                </div>
              </div>
              <div v-show="AuthCodeSentToMail" class="">
                <form
                  name="code"
                  action=""
                  method="post"
                  @submit.prevent="verifyAuthEmailUser"
                >
                  <label class="text-xs text-black" for="code">
                    Type 6 Digit Code sent to user's email</label>
                  <input
                    id="code"
                    v-model="authCode"
                    class="border-2 rounded-sm pl-1 w-full  text-start"
                    name="code"
                    placeholder="Enter Validated Code here"
                  >
                  <input
                    v-if="!loadingAuthCode"
                    class=" mt-1  w-full  bg-transparent  hover:bg-blue-500  text-blue-700  font-semibold  hover:text-white  py-0 px-4 border border-blue-500  hover:border-transparent rounded"
                    type="submit"
                    value="APPLY"
                  >
                  <span v-else>
                    <Spinner />
                  </span>
                </form>
              </div>
            </div>
          </div>

          <div
            v-show="user.email_verified_at"
            class="w-1/2 flex flex-col justify-center items-end"
          >
            <div class="flex flex-col justify-center items-end w-full">
              <SwitchContainer
                :loading-perm="loadingPerm"
                :state="user.permission > 5 ? true : false"
                @handleToggleActive="handleToggleActive"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
    <Dialog
      v-show="showModal"
      :showmodal.sync="showModal"
      :head="user.name"
      :message="Modalmessage"
      :modal-routine="modalRoutine"
      @click-modal="clickmodal"
    />
  </div>
</template>

<script>
import { createPopper } from '@popperjs/core'
import Spinner from '@/components/filters/Spinner'
import Dialog from '@/components/dialog/Dialog.vue'
import SwitchContainer from '@/components/common/SwitchContainer'
export default {
  components: { Spinner, Dialog, SwitchContainer },
  props: {
    user: {
      type: Object,
      rerequired: true,
      default: () => {}
    },
    token: {
      type: String,
      rerequired: true,
      default: ''
    }
  },

  data () {
    return {
      // start mordal
      showModal: false,
      modalRoutine: null,
      Modalmessage: 'Do you Wish to Delete?',
      // end mordal
      file: '',
      uploadPercentage: 0,
      attachment: null,
      uploading: false,
      tooltipShow: false,
      proflink: '/',
      loadingDel: false,
      loadingVerify: false,
      loadingAuthCode: false,
      loadingPerm: false,
      AuthCodeSentToMail: false,
      authCode: null,
      authToken: null
    }
  },

  mounted () {
    this.proflink = this.user.id ? 'userProfiles/' + this.user.id : '/'
  },

  methods: {
    handleSelectedFiles (e) {
      if (!e.target.files.length) {
        return null
      }
      try {
        this.attachment = e.target.files[0]
        const reader = new FileReader()
        reader.readAsDataURL(this.attachment)
        reader.onload = (e) => {
          this.file = e.target.result
        }
        this.upload()
      } catch (error) {
        this.$toast.error('Failed to Attach File!')
      }
    },

    clickmodal (bol, mode, message = null) {
      this.showModal = false
      if (bol == true) {
        switch (mode) {
          case 'DeleteUser':
            this.DeleteUser()
            break
          default:
        }
      }
    },

    resetInput () {
      // eslint-disable-next-line dot-notation
      this.$refs['fileInput'].value = ''
    },

    async upload () {
      if (!this.attachment) {
        this.$toast.error('Atleast Choose a picture File!')
        return null
      }
      this.uploading = true
      const formData = new FormData()
      formData.append('file', this.attachment)
      formData.append('id', this.user.id)

      await this.$axios
        .post('updateProfPic', formData, {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            Accept: 'application/json',
            'X-CSRF-TOKEN': this.token
          },
          onUploadProgress: function (progressEvent) {
            this.uploadPercentage = parseInt(
              Math.round((progressEvent.loaded / progressEvent.total) * 100)
            )
          }.bind(this)
        })
        .then(() => {
          this.$toast.success('Uploaded successfully')
          this.attachment = null
          this.$emit('fileUploaded')
          this.toggleTooltip()
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
      this.file = null
      this.attachment = null
      this.uploading = false
      this.uploadPercentage = 0
      this.resetInput()
    },

    toggleTooltip () {
      if (this.tooltipShow) {
        this.tooltipShow = false
      } else {
        this.tooltipShow = true
        createPopper(this.$refs.btnRef, this.$refs.tooltipRef, {
          placement: 'right'
        })
      }
    },

    async verifyAuthEmailUser () {
      const config = {
        headers: { 'X-CSRF-TOKEN': this.token }
      }
      const bodyParameters = {
        id: this.user.id,
        code: this.authCode,
        token: this.authToken
      }
      this.loadingAuthCode = true
      try {
        await this.$axios
          .$post('verifyAuthEmailUser', bodyParameters, config)
          .then((resp) => {
            if (resp.result.exception == null) {
              this.$emit('refresh-users')
              this.$toast.success(this.user.name + "'s Email is verified")
              this.AuthCodeSentToMail = false
            } else {
              this.$toast.error('Failed')
            }
          })
          .catch((errors) => {
            if (errors.response.data.message) {
              this.$toast.error(
                this.$ObjTemplate.trim(
                  JSON.parse(errors.response.data.message).message
                )
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
      this.loadingAuthCode = false
    },

    async VerifyUser () {
      const config = {
        headers: { 'X-CSRF-TOKEN': this.token }
      }
      const bodyParameters = {
        id: this.user.id
      }
      this.loadingVerify = true
      this.hover = false
      try {
        await this.$axios
          .$post('verifyUser', bodyParameters, config)
          .then((resp) => {
            if (resp.result.original !== null) {
              this.authToken = resp.result.original
              this.AuthCodeSentToMail = true
              this.$toast.success(
                this.user.name +
                  "'s Email , check for Verification Code in Spamfolder as well"
              )
            } else {
              this.$toast.error('Failed')
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
      this.loadingVerify = false
    },

    async handleToggleActive () {
      const config = {
        headers: { 'X-CSRF-TOKEN': this.token }
      }
      const bodyParameters = {
        id: this.user.id
      }
      this.loadingPerm = true
      try {
        await this.$axios
          .$post('permission', bodyParameters, config)
          .then((resp) => {
            if (resp.result) {
              this.$emit('refresh-users')
              this.$toast.success(this.user.name + "'s Security Level Changed")
            } else {
              this.$toast.error('Failed')
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
      this.loadingPerm = false
    },

    async DeleteUser () {
      const config = {
        headers: { 'X-CSRF-TOKEN': this.token }
      }
      const bodyParameters = {
        id: this.user.id
      }
      this.loadingDel = true
      try {
        await this.$axios
          .$post('del-User', bodyParameters, config)
          .then((resp) => {
            if (resp.result) {
              this.$emit('refresh-users')
              this.$toast.success(this.user.name + "'s is Deleted")
            } else {
              this.$toast.error('Failed')
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
      this.loadingDel = false
    }
  }
}
</script>

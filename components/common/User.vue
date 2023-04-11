<template>
  <div>
    <div
      v-if="user"
      class="shadow-lg relative flex flex-row items-center justify-start m-1 pt-2 pr-2 cursor-pointer"
      @click="$modal.show(`PassKey${user.id}`)"
    >
      <img class="h-10 w-10 m-1 rounded-sm" :src="user.image" alt="user photo">
      <div class=" flex flex-col m-1">
        <span :class="{'text-black' : value.id == user.id, 'text-gray-400' : value.id !== user.id}" class="text-sm font-bold uppercase hover:text-black">{{ user.name }}</span>
      </div>
      <div class=" absolute max-w-min -top-1">
        <span v-show=" parseInt(orderCount) > 0" class=" bg-red-500 text-white text-center px-2 py-1 rounded-full" style=" font-size: 10px;">
          {{ orderCount }}
        </span>
      </div>
    </div>

    <modal
      :name="`PassKey${user.id}`"
      :adaptive="true"
      :draggable="true"
      :scrollable="true"
      width="20%"
      height="auto"
    >
      <div class="rounded-md shadow-2xl p-2">
        <div class=" flex flex-row mt-2">
          <h6 class=" text-center w-full text-xl font-bold text-gray-700">
            {{ user.name }}
          </h6>
        </div>
        <div class=" text-center w-full px-2 text-gray-600">
          <p>Provide Quick Access Code for this Account</p>
        </div>
        <div class="px-2 mt-4 border flex flex-wrap w-full items-center rounded relative">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 absolute left-0 z-50" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M18 8a6 6 0 01-7.743 5.743L10 14l-1 1-1 1H6v2H2v-4l4.257-4.257A6 6 0 1118 8zm-6-4a1 1 0 100 2 2 2 0 012 2 1 1 0 102 0 4 4 0 00-4-4z" clip-rule="evenodd" />
          </svg>
          <input v-model="qac" type="password" placeholder="*****" class="flex-shrink flex-grow flex-auto leading-normal w-px border-0 h-8 border-grey-light rounded rounded-l-none px-3 self-center relative  font-roboto text-lg outline-none text-center">
        </div>
        <div class="mt-5 flex">
          <input type="button" class="button button-error" value="cancel" @click="$modal.hide(`PassKey${user.id}`)">
          <input type="button" class="button button-success" value="enter" style=" margin-left: auto;" @click="checkQac()">
        </div>
      </div>
    </modal>
  </div>
</template>

<script>
import filter from 'lodash/filter'
export default {
  name: 'User',
  props: {
    user: {
      type: [Array, Object],
      required: true
    },
    value: {
      type: Object,
      default: () => ({
        id: null,
        section: null,
        name: null
      })
    },
    invoices: {
      type: [Array, Object],
      default: () => [{}]
    }
  },

  data () {
    return {
      qac: null
    }
  },

  computed: {
    orderCount () {
      const id = this.user.id
      return Object.keys(filter(this.invoices, function (o) {
        return (o.uID == id)
      })
      ).length
    }
  },

  methods: {
    checkQac () {
      if (!this.qac) {
        this.$toast.error('Provide Quick Access Code for ' + this.user.name)
        return
      }
      if (this.user.qac == this.qac) {
        this.$modal.hide(`PassKey${this.user.id}`)
        this.$emit('input', this.user)
        this.qac = null
      } else {
        this.$toast.error('Wrong Quick Access Code for ' + this.user.name)
      }
    }
  }
}
</script>

<template>
  <div class="modal-overlay">
    <div class="modal w-80">
      <div id="printable" class=" flex flex-row">
        <div class=" w-full flex flex-col">
          <h1 class=" text-center uppercase font-bold text-xl">
            room service
          </h1>
          <!--span class=" text-xs">Kabuusu,Masaka Road</span>
          <span class=" text-xs">P.O. Box 73369, Kampala, +256 Uganda</span>
          <span class=" text-xs">Phone/Fax:  +256-414272675 / +256-776650268 </span>
          <span class=" text-xs">Email:  info@macsedoresorthotel.com</span-->
          <div class=" w-full grid grid-cols-2 gap-0 px-2 mt-5">
            <div class=" text-left flex flex-col">
              <span class=" text-sm">Guest ID: {{ invoice.id }}</span>
              <span class=" text-sm">Guest: {{ invoice.fullname }}</span>
            </div>
            <div class=" text-right">
              <span class=" text-sm whitespace-nowrap">Date: <span class=" text-xs">{{ invoice.updated_at | humanDayDate }}</span> </span>
              <span class=" text-sm" />
            </div>
          </div>
          <div class=" w-full mt-5 px-2">
            <table class=" w-full">
              <thead class=" border-t-2 border-b-2 border-dotted">
                <tr>
                  <th class=" text-left text-sm font-bold">
                    Item
                  </th>
                  <th class=" text-left text-sm font-bold">
                    Item Details
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td class=" text-left text-xs font-semibold">
                    Email:
                  </td>
                  <td class=" text-left text-xs">
                    {{ invoice.email }}
                  </td>
                </tr>
                <tr>
                  <td class=" text-left text-xs font-semibold">
                    ID:
                  </td>
                  <td class=" text-left text-xs">
                    {{ invoice.idType }}:{{ invoice.idNum }}
                  </td>
                </tr>
                <tr>
                  <td class=" text-left text-xs font-semibold">
                    ROOM:
                  </td>
                  <td class=" text-left text-xs">
                    {{ invoice.roomNo }} {{ room.roomType }} @ UGX:{{ room.roomFee | number_format }}
                  </td>
                </tr>
                <tr>
                  <td class=" text-left text-xs font-semibold">
                    PAID:
                  </td>
                  <td class=" text-left text-xs">
                    {{ invoice.paid == true ? 'YES' : 'NO' }} for {{ invoice.rdays }} Days
                  </td>
                </tr>
                <tr>
                  <td class=" text-left text-xs font-semibold">
                    FEE:
                  </td>
                  <td class=" text-left text-xl">
                    Shs:{{ room.roomFee * invoice.rdays | number_format }}
                  </td>
                </tr>

                <!--aob:null
                checkIn:"2022-03-17 08:12:26"
                created_at:"2022-03-17T08:09:40.000000Z"
                ---email:"ssekweyamapius@gmail.com"
                ---fullname:"seeee"
                ---id:20
                ---idNum:"12345567888"
                ---idType:"Drivers Permit"
                leaveDate:null
                ---paid:"1"
                ---roomNo:"1782"
                status:"active"
                updated_at:"2022-03-17T08:12:26.000000Z"
                -->
              </tbody>
            </table>
          </div>
          <div class=" w-full mt-5 px-2 flex align-middle justify-center">
            <VueBarcode
              class=" w-28"
              :value="getRandomIntInclusive(100000000000,999999999999)"
              format="CODE128"
              :height="25"
              :width="1"
              :font-size="10"
              font-options="bold italic"
            />
          </div>
          <div class=" w-full">
            <span class=" text-center capitalize">thank you!</span>
          </div>
        </div>
      </div>
      <button class=" hover:bg-green-500 bg-gray-300 uppercase" @click="print()">
        Print
      </button>
    </div>
    <!--close modal-->
    <div class="close" @click="$emit('update:showmodal', false )">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 close-img text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
// eslint-disable-next-line no-unused-vars
import _ from 'lodash'
import VueBarcode from 'vue-barcode'

export default {
  components: { VueBarcode },
  // eslint-disable-next-line vue/require-prop-types
  props: ['invoice'],

  data () {
    return {
      success: true,
      fail: false,
      room: {
        roomType: null,
        roomFee: null
      }

    }
  },

  computed: {
    ...mapGetters(['rooms'])
  },

  watch: {
    invoice: {
      handler (value) {
        this.sortSlection(value)
      }
    }
  },

  methods: {
    sortSlection (invoice) {
      const roomNo = invoice.roomNo
      // eslint-disable-next-line no-unused-vars
      const room = _.filter(this.rooms, function (o) {
        // eslint-disable-next-line eqeqeq
        return (o.roomNo == roomNo)
      })
      this.room.roomType = room[0] ? room[0].type : 'UNKOWN ROOM'
      this.room.roomFee = room[0] ? room[0].fee : '00.0'
    },

    getRandomIntInclusive (min, max) {
      min = Math.ceil(min)
      max = Math.floor(max)
      return Math.floor(Math.random() * (max - min + 1) + min) // The maximum is inclusive and the minimum is inclusive
    },

    print () {
      // eslint-disable-next-line no-undef
      window.document.body.innerHTML = document.getElementById('printable').innerHTML
      window.print()
      this.$router.go({ path: this.$router.currentRoute.path, force: true })
    }
  }
}
</script>
<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  bottom: 0;
  z-index: 100;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  background-color: #000000da;
}

.modal {
  text-align: center;
  background-color: white;
  height: max-content;
  margin-top: 10%;
  border-radius: 5px;
}

.close {
  margin: 10% 0 0 16px;
  cursor: pointer;
}

.close-img {
  width: 25px;
}

.check {
  width: 150px;
}

h6 {
  font-weight: 500;
  font-size: 28px;
  margin: 10px 0;
}

p {
  font-size: 16px;
  margin: 10px 0;
}

button {
  width: 100%;
  height: 40px;
  color: black;
  font-size: 14px;
  padding-left: 20px;
  padding-right: 20px;
  margin-top: 20px;
}
</style>

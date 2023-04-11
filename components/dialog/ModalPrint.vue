<template>
  <div class=" flex flex-col py-5 px-2">
    <div id="printable" class=" flex flex-row">
      <div class=" w-full flex flex-col">
        <h1 class=" text-center uppercase font-bold text-xl">
          meals and drinks
        </h1>
        <!--span class=" text-xs">Kabuusu,Masaka Road</span>
            <span class=" text-xs">P.O. Box 73369, Kampala, +256 Uganda</span>
            <span class=" text-xs">Phone/Fax:  +256-414272675 / +256-776650268 </span>
            <span class=" text-xs">Email:  info@macsedoresorthotel.com</span-->
        <div class=" w-full grid grid-cols-2 gap-0 px-2 mt-5">
          <div class=" text-left flex flex-col">
            <span class=" text-sm">Order No: {{ invoice.receipts_id }}</span>
            <span class=" text-sm">C/o: {{ invoice.name }}</span>
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
                  Qty
                </th>
                <th class=" text-left text-sm font-bold">
                  Item
                </th>
                <th class=" text-left text-sm font-bold">
                  Dest'n
                </th>
                <th class=" text-left text-sm font-bold">
                  Price
                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(order, n) in invoice.orders" :key="n" :class="parseInt(order.status) == 25 ? 'line-through': ''">
                <td class=" text-left text-xs">
                  {{ order.qty }}
                </td>
                <td class=" text-left text-xs">
                  ({{ order.Category }}) {{ order.dish }}
                </td>
                <td class=" text-left text-xs">
                  <div class=" flex flex-col">
                    <span v-show="order.destRmn">{{ order.destRmn }}</span>
                    <span v-show=" order.destTbl">{{ order.destTbl }}</span>
                  </div>
                </td>
                <td class=" text-left text-xs">
                  {{ order.cost }}
                </td>
              </tr>
              <tr class=" border-t-2 border-dotted">
                <td class=" text-left text-sm font-bold">
                  Total
                </td>
                <td class=" text-right text-sm font-bold whitespace-nowrap" colspan="3">
                  Shs: {{ invoice.TTotal | number_format }}
                </td>
              </tr>
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
    <input type="button" class="button button-success uppercase" value="Print" style=" margin-left: auto;" @click="print()">
  </div>
</template>

<script>
// import Vue from 'vue'
import VueBarcode from 'vue-barcode'
// Vue.component('Barcode', VueBarcode)

export default {
  components: { VueBarcode },
  // eslint-disable-next-line vue/require-prop-types
  props: ['invoice'],

  data () {
    return {
      success: true,
      fail: false
    }
  },

  methods: {
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

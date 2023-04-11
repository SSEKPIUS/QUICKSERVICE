<template>
  <div class=" w-full">
    <div v-show="ActualBalance > 0 || ExpectedBalance > 0" class=" bg-gray-800 w-auto rounded-md m-3">
      <div class=" flex flex-row text-gray-400 w-full p-2">
        <div class=" w-1/4 border-r-2 border-white">
          <div>Cash:</div>
          <div class=" text-white mt-2 text-2xl font-extrabold">
            <span>Shs:</span> <span>{{ ActualBalanceWhole | number_format }}</span> <span class=" text-xl text-gray-400">.{{ ActualBalanceDeci }}</span>
          </div>
        </div>
        <div class=" flex flex-col  w-3/4 pl-5">
          <div class=" flex flex-row w-full">
            <div class=" w-3/4">
              <div>Cash Equivalent:</div>
              <div class=" text-gray-100 mt-2 text-xl font-bold">
                <span>Shs:</span> <span>{{ ActualBalanceHeldWhole | number_format }}</span> <span class=" text-xl text-gray-400">.{{ ActualBalanceHeldDeci }}</span>
              </div>
            </div>
            <div class=" w-3/4">
              <div>Cash Projection:</div>
              <div class=" text-gray-100 mt-2 text-xl font-bold">
                <span>Shs:</span> <span>{{ ExpectedBalanceWhole | number_format }}</span> <span class=" text-xl text-gray-400">.{{ ExpectedBalanceDeci }}</span>
              </div>
            </div>
            <div class=" w-1/4 flex align-middle justify-center">
              <button class="flex py-2 px-5  h-14 bg-transparent border-2 border-yellow-500 text-yellow-500 text-lg rounded-lg hover:bg-yellow-500 hover:text-gray-100 focus:border-4 focus:border-yellow-300" @click="download">
                Download
                <Spinner v-show="loading" class="h-10 w-10 text-red-500 cursor-pointer" />
              </button>
            </div>
          </div>
          <div class=" flex flex-row w-full py-5">
            <span>Cash Position Between <span class=" text-green-700">{{ search ? search.DRange.from : '' }}</span> and  <span class=" text-green-700">{{ search ? search.DRange.to : '' }}</span></span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Spinner from '@/components/filters/Spinner2'
export default {
  components: {
    Spinner
  },

  // eslint-disable-next-line vue/require-prop-types
  props: {
    loading: {
      type: Boolean,
      required: false,
      default: false
    },
    search: {
      type: Object,
      required: false,
      default: () => {}
    },
    // eslint-disable-next-line vue/prop-name-casing
    ActualBalance: {
      type: Number,
      required: false,
      default: 0
    },
    // eslint-disable-next-line vue/prop-name-casing
    actualbalanceHeld: {
      type: Number,
      required: false,
      default: 0
    },
    // eslint-disable-next-line vue/prop-name-casing
    ExpectedBalance: {
      type: Number,
      required: false,
      default: 0
    }
  },

  computed: {
    ActualBalanceWhole () {
      return Math.floor(this.ActualBalance)
    },
    ActualBalanceDeci () {
      return parseFloat((this.ActualBalance - Math.floor(this.ActualBalance)).toPrecision(2).split('.')[1])
    },
    ActualBalanceHeldWhole () {
      return Math.floor(this.actualbalanceHeld)
    },
    ActualBalanceHeldDeci () {
      return parseFloat((this.actualbalanceHeld - Math.floor(this.actualbalanceHeld)).toPrecision(2).split('.')[1])
    },
    ExpectedBalanceWhole () {
      return Math.floor(this.ExpectedBalance)
    },
    ExpectedBalanceDeci () {
      return parseFloat((this.ExpectedBalance - Math.floor(this.ExpectedBalance)).toPrecision(2).split('.')[1])
    }
  },

  methods: {
    download () {
      this.$emit('download')
    }
  }

}
</script>

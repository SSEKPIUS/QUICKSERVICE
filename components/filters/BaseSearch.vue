<template>
  <div>
    <div class="flex items-center justify-center p-1">
      <div class="flex items-center p-1">
        <input v-model="input" type="text" class="bg-gray-200  px-4 py-2 min-w-min h-8 focus:outline-none border-0 rounded-md" placeholder="Search...">
        <div class="p-1 bg-gray-200 rounded-r-md h-8 cursor-pointer" @click="input = null">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5 "
            viewBox="0 0 20 20"
            fill="currentColor"
            @click="input=null"
          >
            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
          </svg>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import debounce from 'lodash/debounce'
import { mapGetters, mapMutations } from 'vuex'
export default {
  data () {
    return {
      input: null,
      delay: debounce((value) => {
        this.SET_SEARCH({ search: value })
      }, 1500)
    }
  },
  computed: {
    ...mapGetters(['getSearch'])
  },
  watch: {
    input: {
      handler (value) {
        this.delay(value)
      }
    }
  },
  mounted () {
    this.input = this.getSearch.search
  },
  methods: {
    ...mapMutations(['SET_SEARCH'])
  }
}
</script>

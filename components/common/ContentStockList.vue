<template>
  <div class=" w-full flex hover:bg-gray-300">
    <div class=" ml-0 uppercase font-bold flex justify-start">
      <span class=" mt-2 text-left text-sm whitespace-nowrap">{{ data }}</span>
    </div>
    <div class="ml-auto mr-0 float-right">
      <div class=" ml-auto my-1">
        <Spinner v-if="downloading" />
        <button
          v-else
          class=" text-sm hover:bg-green-500 bg-green-300 text-white font-bold py-2 px-4 border-b-4 border-green-700 rounded w-full uppercase"
          @click="downloadReport(data)"
        >
          DOWNLOAD
        </button>
      </div>
    </div>
  </div>
</template>

<script>

import { mapGetters } from 'vuex'
import Spinner from '@/components/filters/Spinner'
export default {
  name: 'ContentStockList',

  components: { Spinner },

  // eslint-disable-next-line vue/require-prop-types
  props: ['data'],

  data () {
    return {
      downloading: false
    }
  },

  computed: {
    ...mapGetters(['getToken'])
  },

  methods: {
    async downloadReport (data) {
      this.downloading = true
      const bodyParameters = {
        params: { file: data },
        method: 'GET',
        responseType: 'blob' // important
      }
      await this.$axios.get('stockreportlist_download', bodyParameters)
        .then((response) => {
          const url = window.URL.createObjectURL(new Blob([response.data]))
          const link = document.createElement('a')
          link.href = url
          link.setAttribute('download', data) // or any other extension
          document.body.appendChild(link)
          link.click()
        })
        .catch((errors) => {
          // eslint-disable-next-line no-console
          console.log('Error:', errors.response)
          if (errors.response.data.message) {
            this.$toast.error(this.$ObjTemplate.trim(errors.response.data.message))
          } else {
            this.$toast.error(this.$ObjTemplate.trim(errors.response.request.statusText))
          }
        })
      this.downloading = false
    }
  }
}
</script>

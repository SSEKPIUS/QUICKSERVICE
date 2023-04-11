<template>
  <div>
    <div class="w-full p-2 h-full">
      <div class=" w-full p-2 relative">
        <div class="p-1 rounded-l-md h-8 w-min rounded shadow-2xl absolute top-8 left-4">
          <svg
            v-if="!getloadinglogs"
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6 cursor-pointer bg-gray-200"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            @click="reset"
          >
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          <Spinner v-else />
        </div>
      </div>

      <!--pagination-->
      <div v-show="getsystemlogsPaginated.links" class=" w-full p-2 border  shadow-2xl rounded mt-2  ">
        <div class=" m-2 flex flex-row flex-nowrap justify-center items-center">
          <!--eslint-disable-next-line vue/no-v-html-->
          <!--eslint-disable-next-line vue/max-attributes-per-line-->
          <span v-for="(link, n) in getsystemlogsPaginated.links" :key="n" :class="getsystemlogsPaginated.current_page == link.label?' text-red-600':' text-black'" class=" px-2 cursor-pointer" @click="loadPaginationPage(link.url)" v-html="link.label" />
        </div>
      </div>

      <div class=" w-full p-5 border  shadow-2xl rounded mt-5 bg-black text-white">
        <table class="text-left w-full border-collapse">
          <!--Border collapse doesn't work on this site yet but it's available in newer tailwind versions -->
          <thead class="text-left">
            <tr>
              <th class="py-1  px-1 bg-grey-lightest font-medium uppercase  text-sm  border-r border-b border-grey-light whitespace-nowrap">
                Log
              </th>
            </tr>
          </thead>
          <tbody>
            <SystemLogsTableRow
              v-for="(log,n) in getsystemlogsPaginated.data "
              :key="n"
              class=" bg-black text-white"
              :log="log"
            />
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import SystemLogsTableRow from '@/components/common/SystemLogsTableRow'
import Spinner from '@/components/filters/Spinner'
export default {
  components: { SystemLogsTableRow, Spinner },

  computed: {
    ...mapGetters(['getsystemlogsPaginated', 'getloadinglogs'])
  },

  mounted () {
    this.loadSystemlogsPaginated()
  },

  methods: {
    ...mapActions(['loadSystemlogsPaginated']),

    loadPaginationPage (url) {
      if (this.getloadinglogs) { return }
      if (!url) { return }
      this.loadSystemlogsPaginated(url)
    },

    reset () {
      this.loadSystemlogsPaginated()
    }
  }
}
</script>

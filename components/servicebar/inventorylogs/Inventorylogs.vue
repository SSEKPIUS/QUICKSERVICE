<template>
  <div class=" border  w-full p-10 h-full">
    <div class=" w-full p-5 border  shadow-2xl">
      <BaseFilter
        section="Inventory logs"
        section-text="view logs"
        :search="false"
        :options="false"
        :dates="true"
        @DTRange="DTRange"
      />

      <ContentInventoryLogs :trigger="trigger" :search="search" :reload="false" />
    </div>
  </div>
</template>

<script>
/* eslint-disable eqeqeq */
/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
/* eslint-disable vue/require-prop-types */
import BaseFilter from '@/components/filters/BaseFilter'
import ContentInventoryLogs from '@/components/common/ContentInventoryLogs'
export default {
  components: {
    ContentInventoryLogs, BaseFilter
  },

  data () {
    return {
      search: {
        mode: 'selection',
        selection: 'SERVICE-BAR',
        search: null,
        DRange: {
          from: null,
          to: null
        }
      },
      trigger: null
    }
  },

  mounted () {
    this.trigger = Math.random()
  },

  methods: {
    fnselection (val) {
      this.search.selection = val
      this.search.mode = 'selection'
      this.trigger = Math.random()
    },

    DTRange (Dfrom, Dto) {
      this.search.DRange = { from: Dfrom, to: Dto }
      this.search.mode = 'DTRange'
      this.trigger = Math.random()
    }
  }
}
</script>

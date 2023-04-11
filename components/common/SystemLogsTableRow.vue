<template>
  <tr class="hover:bg-grey-lighter text-left">
    <td class="py-2  px-1  text-xs" :class="setColor(log)">
      {{ log }}
    </td>
  </tr>
</template>

<script>
/* eslint-disable vue/require-prop-types */
export default {
  props: ['log'],

  computed: {
    getSortedUserName () {
      return this.sortUser()
    }
  },

  methods: {
    setColor (text) {
      if (text.includes('ERROR')) {
        return 'text-red-500'
      } else if (text.includes('CRITICAL')) {
        return 'text-red-300'
      } else {
        return 'text-gray-500'
      }
    }
  }
}
</script>

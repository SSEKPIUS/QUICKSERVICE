<template>
  <tr class="hover:bg-grey-lighter text-left">
    <td class="py-2  px-1  text-xs whitespace-nowrap">
      {{ log.section }}
    </td>
    <td class="py-2  px-1  text-xs whitespace-nowrap text-blue-500">
      {{ getSortedUserName }}
    </td>
    <td class="py-2  px-1  text-xs" :class="setColor(log.event)">
      {{ log.event }}
    </td>
    <td class="py-2  px-1  text-xs whitespace-nowrap text-blue-500">
      {{ log.onrequestof }}
    </td>
    <td class="py-2  px-1  text-xs whitespace-nowrap">
      {{ log.created_at | humanDayDate }}
    </td>
  </tr>
</template>

<script>
/* eslint-disable vue/require-prop-types */
/* eslint-disable eqeqeq */
import _ from 'lodash'
export default {
  props: ['log', 'users'],

  computed: {
    getSortedUserName () {
      return this.sortUser()
    }
  },

  methods: {
    setColor (text) {
      if (text.toLowerCase().startsWith('deleted') ||
      text.toLowerCase().startsWith('expired') ||
      text.toLowerCase().startsWith('damaged') ||
      text.toLowerCase().startsWith('lost')) {
        return 'text-red-500'
      } else if (text.toLowerCase().startsWith('added')) {
        return 'text-blue-500'
      } else if (text.toLowerCase().startsWith('trasfered')) {
        return 'text-green-500'
      } else if (text.toLowerCase().startsWith('recieved')) {
        return 'text-yellow-500'
      }
    },

    sortUser () {
      const srt = this.log.user
      const usr = _.filter(this.users, function (o) {
        return (o.id == srt)
      })
      return usr[0] ? usr[0].name : ''
    }
  }
}
</script>

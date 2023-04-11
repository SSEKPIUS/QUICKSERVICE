<template>
  <div class="bg-gray-200">
    <input v-model="dateVal" type="date" :min="formatDate(min)" :max="formatDate(max)" class="text-center bg-gray-200">
  </div>
</template>

<script>
// @collapse
import moment from 'moment'
import debounce from 'lodash/debounce'
moment().format()
export default {
  props: {
    sdate: {
      type: String,
      default: moment()
    },
    min: {
      type: String,
      default: 'Mar 27, 2023, 1:00 AM'
    },
    max: {
      type: String,
      default: 'Mar 27, 2023, 1:00 AM'
    }
  },

  data () {
    return {
      dateVal: moment(this.sdate).format('YYYY-MM-DD'),
      delay: debounce(val => this.$emit('DTChange', val), 1500)
    }
  },
  watch: {
    dateVal: {
      imediate: true,
      handler (newvalue, oldvalue) {
        if (newvalue && newvalue !== oldvalue) {
          this.delay(moment(newvalue).format('MMM D, yyyy, h:mm a'))
        }
      }
    }
  },
  methods: {
    formatDate (date) {
      return moment(date).format('YYYY-MM-DD')
    }
  }
}
</script>

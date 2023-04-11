<template>
  <div>
    <div class="flex items-center justify-center p-1">
      <div class="flex items-center p-1 bg-gray-200 rounded-md">
        <div class="p-1 h-8">
          <DateTimeRange
            :sdate="getSearch.DRange.from"
            min="Jan 1, 1900, 1:00 AM"
            :max="getSearch.DRange.to"
            @DTChange="DTRangeFrom"
          />
        </div>
        <div class="p-1 h-8">
          <DateTimeRange
            :sdate="getSearch.DRange.to"
            :min="getSearch.DRange.from"
            max="Jan 1, 9999, 1:00 AM"
            @DTChange="DTRangeTo"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// Mar 27, 2023, 3:00 AM
import { debounce } from 'lodash'
import moment from 'moment-timezone'
import { mapGetters, mapMutations } from 'vuex'
import DateTimeRange from '@/components/filters/DateTimeRange'

moment.tz.setDefault('Africa/Kampala')

export default {
  components: {
    DateTimeRange
  },
  data () {
    return {
      retry: 0,
      delay: debounce((ftn) => { ftn() }, 1500)
    }
  },
  computed: {
    ...mapGetters(['getSearch'])
  },
  methods: {
    ...mapMutations(['SET_SEARCH']),
    DTRangeFrom (value) {
      const from = moment(value).startOf('day').format('MMM D, yyyy, h:mm a')
      this.delay(this.SET_SEARCH({ DRange: { ...this.getSearch.DRange, from } }))
    },
    DTRangeTo (value) {
      const to = moment(value).endOf('day').format('MMM D, yyyy, h:mm a')
      this.delay(this.SET_SEARCH({ DRange: { ...this.getSearch.DRange, to } }))
    }
  }
}
</script>

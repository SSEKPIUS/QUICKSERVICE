<template>
  <div class="shadow bg-white rounded-lg overflow-hidden group handle">
    <div class="p-4 title flex items-center">
      <div class="text-gray-600 text-base text-80 font-bold w-3/6">
        <span class="handle cursor-move text-lg hidden">
          <span class="fe fe-more-vertical -mr-4" />
          <span class="fe fe-more-vertical" />
        </span>
        <span>{{ metric.title }}</span>
      </div>
      <BaseDateRangeFilter
        v-if="customDate"
        v-model="dateRange"
        :config="{}"
        class="w-64 ml-auto mt-0 mr-20"
      />
      <BaseDropDownMenu :class="{ 'ml-auto': !customDate}" trigger="click">
        <template #menu-button>
          <div class="text-blue border px-2 p-1 w-auto rounded-lg bg-gray-100 flex items-center">
            <span v-if="!customDate" class="mr-1 w-auto block">{{ filterLabel }}</span>
            <span class="fe fe-chevron-down ml-auto" />
          </div>
        </template>
        <div class="p-4">
          <button class="hover:text-blue block py-1" @click="setDaysAgo(0, 'Today')">
            Today
          </button>
          <button class="hover:text-blue block py-1" @click="setDaysAgo(7, 'Last 7 days')">
            Last 7 days
          </button>
          <button class="hover:text-blue block py-1" @click="setDaysAgo(28, 'Last 28 days')">
            Last 28 days
          </button>
          <button class="hover:text-blue block py-1" @click="setDaysAgo(90, 'Last 90 days')">
            Last 90 days
          </button>
          <button class="hover:text-blue block py-1" @click="setDaysAgo(180, 'Last 180 days')">
            Last 180 days
          </button>
          <button class="hover:text-blue mt-2 text-left block py-1 border-t border-gray-500 w-full">
            Custom Date
          </button>
        </div>
      </BaseDropDownMenu>
      <div class="w-6 ml-2">
        <button class="px-2 p-1 bg-gray-100 hover:bg-gray-200 hidden group-hover:block rounded-full" @click="removeMetric">
          <span class="fe fe-x text-red-300" />
        </button>
      </div>
    </div>
    <div class="px-4 text-gray-700 text-4xl">
      {{ metric.value }}
    </div>
    <div class="text-lg text-gray-600 font-semibold">
      <LineChart :height="50" :chartdata="metric.trendData ? metric.trendData : null" :options="options" />
    </div>
  </div>
</template>

<script>
import moment from 'moment'
import BaseDropDownMenu from '@/components/common/BaseDropDownMenu'
import BaseDateRangeFilter from '@/components/common/BaseDateRangeFilter'
export default {
  name: 'TrendMetric',
  components: { BaseDateRangeFilter, BaseDropDownMenu },
  props: {
    metric: {
      type: Object,
      required: true
    }
  },

  data () {
    return {
      filterLabel: 'Today',
      customDate: false,
      dateRange: {
        start_date: null,
        end_date: null
      },
      query: {
        startDate: moment().subtract(7, 'days').format('YYYY-MM-DD'),
        endDate: null
      },
      options: {
        legend: {
          display: false
        },
        scales: {
          yAxes: [{
            display: false
          }],
          xAxes: [{
            display: false
          }]
        }
      }
    }
  },

  methods: {
    setCustomDate () {
      this.customDate = true
    },
    setDaysAgo (days, label = 'Today') {
      this.query.startDate = moment().subtract(days, 'days').format('YYYY-MM-DD')
      this.query.endDate = null
      this.customDate = false
      this.filterLabel = label
    },
    getRandomInt () {
      return Math.floor(Math.random() * (50 - 5 + 1)) + 5
    },

    removeMetric () {
      this.$swal.fire({
        text: 'Are you sure you want to remove this metric?',
        buttons: true,
        dangerMode: true,
        preConfirm: () => this.$axios.$delete(`dashboard/metric/${this.metric.id}/remove`)
          .then((res) => {
            this.$toast.success('Metric removed!')
            window.location.reload()
          }).catch((err) => {
            this.$toast.error(err.response.data.errors)
          })
      })
    }
  }
}
</script>

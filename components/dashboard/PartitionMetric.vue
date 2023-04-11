<template>
  <div class="shadow bg-white rounded-lg overflow-hidden group handle">
    <div class="p-4 title flex items-center">
      <div class="text-gray-600 text-base text-80 font-bold w-3/6 py-1">
        <span class="handle cursor-move text-lg hidden">
          <span class="fe fe-more-vertical -mr-4" />
          <span class="fe fe-more-vertical" />
        </span>
        <span>{{ metric.title }}</span>
      </div>
      <div class="text-gray-500 ml-auto">
        ({{ metric.total }} total)
      </div>
      <div class="w-6 ml-2">
        <button class="px-2 p-1 bg-gray-100 hover:bg-gray-200 rounded-full hidden group-hover:block" @click="removeMetric">
          <span class="fe fe-x text-red-300" />
        </button>
      </div>
    </div>
    <div class="px-4 pb-4 text-lg text-gray-600 font-semibold">
      <ChartDoughnut :height="100" :chartdata="metric.partitionData ? metric.partitionData : null" :options="options" />
    </div>
  </div>
</template>

<script>
import moment from 'moment'
export default {
  name: 'PartitionMetric',
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
      datacollection: null,
      options: {
        maintainAspectRatio: false,
        plugins: {
          colorschemes: {
            scheme: 'office.Studio6'
          }
        },
        cutoutPercentage: 70,
        legend: {
          position: 'left',
          labels: {
            boxWidth: 9,
            usePointStyle: true
          }
        }
      }
    }
  },

  mounted () {
    this.fillData()
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
    fillData () {
      this.datacollection = {
        labels: ['Silver', 'Gold', 'Platinum'],
        datasets: [
          {
            data: [4, 23, 10]
          }
        ]
      }
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

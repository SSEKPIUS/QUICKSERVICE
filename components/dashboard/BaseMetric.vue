<template>
  <div>
    <TrendMetric
      v-if="metric.type == 'trend'"
      :key="metric.id"
      :metric="metric"
    />
    <ValueMetric
      v-if="metric.type == 'value'"
      :key="metric.id"
      :metric="metric"
    />
    <PartitionMetric
      v-if="metric.type == 'partition'"
      :key="metric.id"
      :metric="metric"
    />
  </div>
</template>

<script>
import include from 'lodash/includes'
import PartitionMetric from '@/components/dashboard/PartitionMetric'
import TrendMetric from '@/components/dashboard/TrendMetric'
import ValueMetric from '@/components/dashboard/ValueMetric'
export default {
  name: 'BaseMetric',
  components: { ValueMetric, TrendMetric, PartitionMetric },
  props: {
    metric: {
      type: Object,
      required: true
    }
  },

  data () {
    return {
      allMetrics: []
    }
  },

  methods: {
    showMetric (metric) {
      return include(this.allMetrics, metric)
    }
  }
}
</script>

<style>
.handle {
  @apply cursor-move;
}
</style>

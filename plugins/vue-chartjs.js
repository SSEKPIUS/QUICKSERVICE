/* eslint-disable vue/one-component-per-file */
import Vue from 'vue'
import { Doughnut, HorizontalBar, Line } from 'vue-chartjs'
import 'chartjs-plugin-colorschemes'

const props = {
  chartdata: {
    type: Object,
    required: true
  },
  options: {
    type: Object,
    default: null
  }
}

Vue.component('ChartHorizontalBar', {
  extends: HorizontalBar,
  props,
  mounted () {
    this.renderChart(this.chartdata, this.options)
  }
})

Vue.component('ChartDoughnut', {
  extends: Doughnut,
  props,
  mounted () {
    this.renderChart(this.chartdata, this.options)
  }
})

Vue.component('LineChart', {
  extends: Line,
  props,
  mounted () {
    this.renderChart(this.chartdata, this.options)
  }
})

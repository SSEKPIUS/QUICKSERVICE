<template>
  <div class="content pt-0 mr-4">
    <div class="sticky top-0 z-10">
      <div :class="{ 'border-b-2 border-blue-300': tab === 'customize', 'scrolled': scrolled }" class="border-b-2 border-gray-400 pb-3 mb-6 flex pr-5 border-l-0 border-r-0">
        <button v-if="tab === 'customize'" class="link ml-auto rounded-lg px-4 py-1 mt-5 hover:bg-gray-200 uppercase text-gray-500 hover:text-gray-900" @click="() => {tab = ''}">
          <span class="fe fe-check" /> Done
        </button>
        <button v-else class="link ml-auto rounded-lg px-4 py-1 mt-5 hover:bg-gray-200 uppercase text-gray-500 hover:text-gray-900" @click="{tab = 'customize'}">
          <span class="fe fe-edit" /> Customize dashboard
        </button>
      </div>
    </div>

    <div v-if="tab === 'customize'">
      <div class="grid grid-cols-2 gap-3 px-1 mt-3 bg-gray-200 py-4">
        <div v-for="metric in allMetrics" :key="metric.id" class="font-semibold rounded flex items-center py-2 px-4 shadow-sm">
          <span type="text" class="text-lg text-gray-600">{{ metric.priority }}</span>
          <span type="text" class="text-lg text-gray-600">{{ metric.title }}</span>
          <BaseToggleButton :key="metric.id" v-model="metric.visible" label="" class="ml-auto" />
        </div>
      </div>
    </div>

    <!--Accounts-->
    <section v-else class="flex mt-8 slideIn px-10">
      <div class="rounded-lg md:block md:w-2/5 shadow bg-white px-6 py-4 mr-8">
        <h2 class="text-gray-600 text-2xl font-semibold mb-5">
          Overall Revenue Performance
        </h2>
        <div class="p-5">
          <ChartDoughnut v-if="showLine" :height="200" :chartdata="OverallRevenuePerformance.data" :options="OverallRevenuePerformance.options" />
        </div>
      </div>
      <div class="rounded-lg w-full lg:w-3/5 shadow bg-white px-6 py-4">
        <div class="p-5">
          <!-- <ChartHorizontalBar
            v-if="showLine"
            :height="120"
            :chartdata="TodaysRevenueCollection.data"
            :options="TodaysRevenueCollection.options"
          /> -->
        </div>
      </div>
    </section>

    <Draggable
      v-model="allMetrics"
      v-bind="dragOptions"
      class="grid grid-cols-2 gap-3 mt-4 px-1"
      handle=".handle"
      @start="onClone($event)"
    >
      <BaseMetric
        v-for="metric in allMetrics"
        :key="metric.id"
        :metric="metric"
      />
    </Draggable>
  </div>
</template>

<script>
import Draggable from 'vuedraggable'
import { mapGetters } from 'vuex'
import BaseMetric from '@/components/dashboard/BaseMetric'
import BaseToggleButton from '@/components/common/BaseToggleButton'

export default {
  components: {
    BaseToggleButton,
    // eslint-disable-next-line vue/no-unused-components
    BaseMetric,
    Draggable
  },

  layout: 'accounts',

  middleware: 'authenticated',

  data () {
    return {
      showLine: false,
      scrolled: false,
      tab: '',
      dragOptions: {
        animation: 500,
        group: 'description',
        disabled: false,
        ghostClass: 'ghost',
        forceFallback: true
      },
      dragging: false
    }
  },

  computed: {
    ...mapGetters({
      OverallRevenuePerformance: 'metrics/getOverallRevenuePerformance',
      TodaysRevenueCollection: 'metrics/getTodaysRevenueCollection',
      allMetrics: 'metrics/getAllMetrics'
    })
  },

  beforeMount () {
    window.addEventListener('scroll', this.handleScroll)
  },

  mounted () {
    this.showLine = true
  },

  methods: {
    handleScroll () {
      this.scrolled = window.pageYOffset > 0
    },
    onClone (event) {
      const itemCanvas = event.item.getElementsByTagName('canvas')[0]
      const cloneCanvas = document
        .getElementsByClassName('sortable-drag')[0]
        .getElementsByTagName('canvas')[0]

      if (cloneCanvas) {
        const cloneCanvasContext = cloneCanvas.getContext('2d')
        cloneCanvasContext.drawImage(itemCanvas, 0, 0)
      }
    }
  }

}
</script>

<style>
.scrolled {
  @apply pt-3 shadow-lg bg-white px-4 rounded-b;
}
</style>

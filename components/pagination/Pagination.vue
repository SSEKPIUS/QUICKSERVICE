<template>
  <div class="flex justify-between items-center w-full py-1">
    <div class="text-sm uppercase">
      {{ pagination.to }}/{{ pagination.total }} {{ resource }}
    </div>
    <ul v-show="pagination.last_page > 1" class="text-gray-700 flex items-center">
      <BaseButton :disabled="isPreviousButtonDisabled" @click.native="previousPage">
        ←
      </BaseButton>
      <li
        v-for="(paginationTrigger, key) in paginationTriggers"
        :key="key"
        :class="{'font-bold text-red-700': paginationTrigger == currentPage}"
        class="p-2 cursor-pointer hover:text-red-600"
        @click="onLoadPage(paginationTrigger)"
      >
        {{ paginationTrigger | truncate }}
      </li>
      <BaseButton :disabled="isNextButtonDisabled" @click.native="nextPage">
        →
      </BaseButton>
    </ul>
  </div>
</template>

<script>
/* eslint-disable eqeqeq */
import BaseButton from './BaseButton.vue'

export default {
  components: {
    BaseButton
  },
  props: {
    perPage: {
      type: Number,
      default: 6
    },
    resource: {
      type: String,
      required: false,
      default: ''
    },
    itemlist: {
      type: Array,
      required: true
    },
    // eslint-disable-next-line vue/prop-name-casing
    expectcurrentpage: {
      type: Number,
      required: false,
      default: 1
    }
  },
  data () {
    return {
      currentPage: 1
    }
  },
  computed: {
    pagination () {
      return {
        to: this.setPaginateTo,
        total: this.itemlist.length,
        last_page: this.setLastPage
      }
    },
    setPaginateTo () {
      const lastItemIndex = this.currentPage * this.perPage
      return lastItemIndex > this.itemlist.length ? this.itemlist.length : lastItemIndex
    },
    setLastPage () {
      return this.itemlist.length > 0 ? Math.ceil(this.itemlist.length / this.perPage) : 1
    },
    pageCount () {
      return this.pagination.last_page
    },

    isPreviousButtonDisabled () {
      return this.currentPage == 1
    },

    isNextButtonDisabled () {
      return this.currentPage == this.pageCount
    },

    visiblePagesCount () {
      if (this.pageCount < 5) {
        return this.pageCount
      }
      return 5
    },

    paginationTriggers () {
      const currentPage = this.currentPage
      const pageCount = this.pageCount
      const visiblePagesCount = this.visiblePagesCount
      const visiblePagesThreshold = (visiblePagesCount - 1) / 2
      const paginationTriggersArray = Array(this.visiblePagesCount - 1).fill(0)

      if (currentPage <= visiblePagesThreshold + 1) {
        paginationTriggersArray[0] = 1
        const paginationTriggers = paginationTriggersArray.map(
          (paginationTrigger, index) => paginationTriggersArray[0] + index
        )

        paginationTriggers.push(pageCount)

        return paginationTriggers
      }

      if (currentPage >= pageCount - visiblePagesThreshold + 1) {
        const paginationTriggers = paginationTriggersArray.map(
          (paginationTrigger, index) => pageCount - index
        )

        paginationTriggers.reverse().unshift(1)

        return paginationTriggers
      }

      paginationTriggersArray[0] = currentPage - visiblePagesThreshold + 1
      const pagintationTriggers = paginationTriggersArray.map(
        (paginationTrigger, index) => paginationTriggersArray[0] + index
      )

      pagintationTriggers.unshift(1)
      pagintationTriggers[pagintationTriggers.length - 1] = pageCount

      return pagintationTriggers
    }
  },

  watch: {
    itemlist () {
      this.currentPage = this.expectcurrentpage > this.pageCount ? this.pageCount : this.expectcurrentpage
      this.filterDisplayData(this.currentPage)
    }
  },

  created () {
    this.filterDisplayData(this.currentPage)
  },

  methods: {
    filterDisplayData (currentPage) {
      const startIndex = (currentPage - 1) * this.perPage
      const endIndex = currentPage * this.perPage
      // eslint-disable-next-line array-callback-return
      const displayData = this.itemlist.filter((item, index) => {
        if (index >= startIndex && index < endIndex) { return item }
      })
      this.$emit('display-data', displayData)
    },

    nextPage () {
      this.currentPage += 1
      this.filterDisplayData(this.currentPage)
    },

    onLoadPage (selectedPage = 1) {
      this.currentPage = selectedPage
      this.filterDisplayData(this.currentPage)
      this.$emit('selectedPage', selectedPage)
    },

    previousPage () {
      this.currentPage -= 1
      this.filterDisplayData(this.currentPage)
    }

  }
}
</script>

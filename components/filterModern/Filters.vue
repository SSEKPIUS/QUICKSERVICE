<template>
  <div>
    <div class="flex w-full border-b border-gray-400 justify-between items-center p-2 px-6">
      <div class="relative w-3/4">
        <label v-if="hasSearch" for="search">
          <span class="fe fe-search text-gray-600" />
        </label>
        <input
          v-if="hasSearch"
          id="search"
          v-model="filters.search"
          type="text"
          class="py-1 outline-none w-3/4"
          autocomplete="false"
          placeholder="Search"
        >
      </div>

      <div v-if="hasFilters" class="ml-auto flex items-center justify-end">
        <button
          class="tracking-wide uppercase text-blue text-sm font-semibold mr-8"
          @click.prevent="toggleFilterMenu"
        >
          <span class="fe fe-filter mr-1" /> Show Filters
        </button>
        <button
          v-show="false"
          class="button-primary button button-sm"
          @click="clearFilters"
        >
          Clear Filters
        </button>
      </div>
    </div>
    <div v-show="open" class="card-filters">
      <slot />
    </div>
  </div>
</template>

<script>
import debounce from 'lodash/debounce'

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Filters',

  props: {
    options: {
      type: Object,
      default: () => {}
    },
    hasFilters: {
      type: Boolean,
      default: true
    },
    alwaysOpen: {
      type: Boolean,
      default: false
    },
    hasSearch: {
      type: Boolean,
      default: true
    }
  },

  data () {
    return {
      open: this.alwaysOpen,
      filters: {
        search: null
      }
    }
  },

  watch: {
    options: {
      deep: true,
      handler () {
        this.setFilters(this.options)
        this.$emit('filterChanged')
      }
    },

    'filters.search' () {
      this.debouncedSearch({ search: this.filters.search })
      this.$emit('debouncedSearch', this.filters.search)
    }
  },

  created () {
    this.debouncedSearch = debounce(this.search, 500)
  },

  methods: {
    toggleFilterMenu () {
      this.open = !this.open
    },
    search (value) {
      this.$store.commit('filters/clear')
      this.$store.commit('pagination/setPage', 1)
      this.setFilter(value)
    },
    setFilters (filters) {
      this.$store.commit('filters/addMany', filters)
      this.$store.commit('pagination/setPage', 1)
      this.$emit('filterChanged')
    },
    setFilter (value) {
      this.$store.commit('filters/addOne', value)
      this.$emit('filterChanged')
    },
    clearFilters () {
      this.$store.commit('filters/clear')
      this.toggleFilterMenu()
      this.$emit('filterChanged')
    }
  }
}
</script>

<template>
  <div :class="{'mt-4':showCheckBox}" class="flex items-center">
    <input v-show="showCheckBox" v-model="checkBox" type="checkbox">
    <div class="rounded border-2 flex items-center px-1 h-10 bg-white ml-2">
      <div class="ml-1 uppercase text-xs text-gray-500 font-bold mr-2">
        {{ label }}
      </div>
      <FlatPickr
        v-model="form.start_date"
        :config="extendDate ? {} : config"
        class="w-24 ml-2"
        placeholder="Start date"
      />
      <div class="font-bold mr-2 text-gray-700">
        -
      </div>
      <FlatPickr
        v-model="form.end_date"
        :config="extendDate ? { minDate: form.start_date } : config"
        class="w-24"
        placeholder="End date"
      />
      <button class="ml-2" @click="clearDates">
        <span class="fe fe-x text-gray-600 font-bold text-lg" />
      </button>
    </div>
  </div>
</template>

<script>
import 'flatpickr/dist/flatpickr.css'
import moment from 'moment'
import FlatPickr from 'vue-flatpickr-component'

export default {
  name: 'BaseDateRangeFilter',
  components: {
    FlatPickr
  },

  props: {
    value: {
      type: Object,
      default: null
    },
    showCheckBox: {
      type: Boolean,
      default: false
    },
    config: {
      type: Object,
      required: false,
      default: () => {
        return {}
      }
    },
    extendDate: {
      type: Boolean,
      default: true
    },
    label: {
      type: String,
      default: 'Date Range'
    }
  },
  data () {
    return {
      form: {
        start_date: null,
        end_date: null
      },
      checkBox: false
    }
  },

  computed: {
    endDateConfig () {
      /* eslint-disable vue/no-mutating-props */
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      this.config.minDate = this.form.start_date
      return this.config
    }
  },

  watch: {
    value: {
      handler (value) {
        if (value.start_date !== null) {
          this.checkBox = true
          this.form.start_date = value.start_date
        }
        if (value.start_date == null && value.end_date == null) {
          this.checkBox = false
        }
        this.form.start_date = value.start_date
        this.form.end_date = value.end_date
      },
      immediate: true,
      deep: true
    },
    form: {
      handler () {
        this.$emit('input', {
          start_date: this.form.start_date == '' ? null : this.form.start_date,
          end_date: this.form.end_date == '' ? null : this.form.end_date
        })
      },
      deep: true
    },
    checkBox (value) {
      if (value) {
        this.form.start_date = value.start_date !== null ? value.start_date : moment().format('YYYY-MM-DD')
        this.form.end_date = moment().format('YYYY-MM-DD')
      } else {
        this.form.start_date = null
        this.form.end_date = null
      }
    }
  },

  methods: {
    clearDates () {
      this.checkBox = false
      this.form.start_date = null
      this.form.end_date = null
    }
  }
}
</script>

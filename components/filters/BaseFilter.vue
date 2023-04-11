<template>
  <div class=" flex flex-row items-center w-full">
    <div class=" flex flex-row items-center justify-start w-full">
      <span class=" uppercase text-gray-500 font-black">{{ section }}</span>
      <a class=" ml-4 uppercase whitespace-nowrap cursor-default" :class="{'cursor-pointer text-blue-500':redirect}" :href="redirect ? baseUrl : '#'" :target="redirect ? '_blank' : ''">
        ({{ sectionText }})
      </a>
    </div>
    <div class=" flex flex-row items-center justify-end w-full">
      <div>
        <BaseSearch v-show="search" />
      </div>

      <div>
        <BaseDropdown v-show="options" />
      </div>

      <div>
        <BaseDateTimeRange v-show="dates" />
      </div>
    </div>
  </div>
</template>

<script>
// -@collapse
import BaseDropdown from '@/components/filters/BaseDropdown'
import BaseSearch from '@/components/filters/BaseSearch'
import BaseDateTimeRange from '@/components/filters/BaseDateTimeRange'
export default {
  components: {
    BaseDropdown,
    BaseSearch,
    BaseDateTimeRange
  },

  props: {
    redirect: {
      type: Boolean,
      required: false,
      default: false
    },
    dates: {
      type: Boolean,
      required: false,
      default: true
    },
    options: {
      type: Boolean,
      required: false,
      default: true
    },
    search: {
      type: Boolean,
      required: false,
      default: true
    },
    section: {
      type: String,
      required: false,
      default: 'section'
    },
    sectionText: {
      type: String,
      required: false,
      default: 'section text'
    }
  },

  data () {
    return {
      baseUrl: process.env.API_URL_SERVER
    }
  }
}
</script>

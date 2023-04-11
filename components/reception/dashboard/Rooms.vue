<!--eslint-disable vue/multi-word-component-names -->
<!-- eslint-disable vue/no-v-html -->
<template>
  <div>
    <div class="w-full">
      <div class="w-full h-10 m-2">
        <h1 class="font-black">
          All Rooms
        </h1>
      </div>
      <div class="mb-5 w-full px-5 py-2">
        <!--pagination-->
        <div v-show="roomsPaginated.links" class=" w-full p-2  shadow-2xl rounded mt-2  ">
          <div class=" m-2 flex flex-row flex-nowrap justify-center items-center">
            <span v-for="(link, n) in roomsPaginated.links" :key="n" :class="roomsPaginated.current_page == link.label ? ' text-red-600' : ' text-black'" class=" px-2 cursor-pointer" @click="loadPaginationPage(link.url)" v-html="link.label" />
          </div>
        </div>

        <div class="w-full rounded-sm overflow-x-scroll mb-1 min-h-full bg-white">
          <div class="table w-full">
            <div class="w-full table-row-group">
              <div class="table-row bg-black rounded-xl text-white">
                <div class="table-cell">
                  <div class="m-3 font-bold">
                    ID
                  </div>
                </div>
                <div class="table-cell">
                  <div class="m-3 font-bold">
                    TYPE
                  </div>
                </div>
                <div class="table-cell">
                  <div class="m-3 font-bold">
                    Room NO.
                  </div>
                </div>
                <div class="table-cell">
                  <div class="m-3 font-bold">
                    Status
                  </div>
                </div>
                <div class="table-cell">
                  <div class="m-3 font-bold">
                    No. BEDS
                  </div>
                </div>
                <div class="table-cell">
                  <div class="m-3 font-bold">
                    FEES
                  </div>
                </div>
              </div>
              <div v-for="(room, i) in roomsPaginated.data" :key="i" class="table-row bg-gray-500 text-white">
                <div class="table-cell">
                  <div class="m-3">
                    {{ room.id }}
                  </div>
                </div>
                <div class="table-cell">
                  <div class="m-3 whitespace-nowrap">
                    {{ room.type }}
                  </div>
                </div>
                <div class="table-cell">
                  <div class="m-3">
                    {{ room.roomNo }}
                  </div>
                </div>
                <div class="table-cell">
                  <div class="m-3 uppercase">
                    {{ room.occupied == true ? 'OCCUPIED' : 'EMPTY' }}
                  </div>
                </div>
                <div class="table-cell">
                  <div class="m-3 uppercase">
                    {{ room.beds }}
                  </div>
                </div>
                <div class="table-cell">
                  <div class="m-3 uppercase">
                    UGX: {{ room.fee | number_format }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  data () {
    return {
      routeName: 'rooms',
      form: {
        type: '',
        roomNo: '',
        beds: '',
        fee: 0
      }
    }
  },

  computed: {
    ...mapGetters(['roomsPaginated'])
  },

  methods: {
    ...mapActions(['loadguestsroomsPaginated']),

    loadPaginationPage (url) {
      if (!url) { return }
      this.loadguestsroomsPaginated(url)
    }
  }
}
</script>

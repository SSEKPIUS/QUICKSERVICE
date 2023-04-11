<template>
  <div class=" flex">
    <div class=" w-4/5">
      <div class="border-gray-400 flex flex-row mb-2">
        <div class="bg-gray-200 select-none rounded-md flex flex-col flex-1 items-center p-4  transition duration-500 ease-in-out transform hover:-translate-y-1 hover:shadow-lg">
          <div class="text-gray-600 text-lg font-black text-left w-full">
            {{ order.price | number_format }} UGX
          </div>
        </div>
      </div>
      <div>
        <section>
          <div class=" border flex flex-wrap w-full mb-4 relative h-15 bg-white items-center rounded pr-10">
            <div class="flex -mr-px justify-center w-15">
              <span
                class="flex items-center leading-normal bg-white px-3 border-0 rounded rounded-r-none text-2xl text-gray-600"
              >
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.871 4A17.926 17.926 0 003 12c0 2.874.673 5.59 1.871 8m14.13 0a17.926 17.926 0 001.87-8c0-2.874-.673-5.59-1.87-8M9 9h1.246a1 1 0 01.961.725l1.586 5.55a1 1 0 00.961.725H15m1-7h-.08a2 2 0 00-1.519.698L9.6 15.302A2 2 0 018.08 16H8" />
                </svg>
                <span class=" text-xs text-gray-400">Qty</span>
              </span>
            </div>
            <input
              v-model="order.qty"
              min="1"
              type="number"
              class="flex-shrink flex-grow flex-auto leading-normal w-px border-0 h-8 border-grey-light rounded rounded-l-none px-3 self-center relative  font-roboto text-sm outline-none"
              placeholder="Quantity"
            >
          </div>

          <div class=" border flex flex-wrap w-full mb-4 relative h-15 bg-white items-center rounded pr-10">
            <div class="flex -mr-px justify-center w-15">
              <span
                class="flex items-center leading-normal bg-white px-3 border-0 rounded rounded-r-none text-2xl text-gray-600"
              >
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M5 4a3 3 0 00-3 3v6a3 3 0 003 3h10a3 3 0 003-3V7a3 3 0 00-3-3H5zm-1 9v-1h5v2H5a1 1 0 01-1-1zm7 1h4a1 1 0 001-1v-1h-5v2zm0-4h5V8h-5v2zM9 8H4v2h5V8z" clip-rule="evenodd" />
                </svg>
              </span>
            </div>
            <input
              v-model="order.destTbl"
              type="text"
              class="flex-shrink flex-grow flex-auto leading-normal w-px border-0 h-8 border-grey-light rounded rounded-l-none px-3 self-center relative  font-roboto text-sm outline-none"
              placeholder="Table Number"
            >
          </div>

          <div class=" border flex flex-wrap w-full mb-4 relative h-15 bg-white items-center rounded pr-10">
            <div class="flex -mr-px justify-center w-15">
              <span
                class="flex items-center leading-normal bg-white px-3 border-0 rounded rounded-r-none text-2xl text-gray-600"
              >
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                </svg>
              </span>
            </div>
            <input
              v-model="order.destRmn"
              type="text"
              class="flex-shrink flex-grow flex-auto leading-normal w-px border-0 h-8 border-grey-light rounded rounded-l-none px-3 self-center relative  font-roboto text-sm outline-none"
              placeholder="Room Number"
            >
          </div>
        </section>
      </div>
    </div>
    <div class=" w-1/5">
      <div class="flex flex-col gap-3 w-2/4 ml-auto">
        <input type="button" class="button button-error" style="margin: 0;" value="<<" @click="$emit('clear')">
        <input type="button" class="button button-error" style="margin: 0;" value="<" @click="$emit('cancel')">
        <input type="button" class="button button-success" style="margin: 0;" value="ADD" @click="$emit('add', order)">
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MinorOrder',
  props: {
    menu: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      order: {
        section: '',
        stock1s_id: 0,
        category: '',
        stocks: '',
        description: '',
        price: 0,
        created_at: '',
        updated_at: '',
        //
        dish: '',
        qty: 1,
        sentfrom: null,
        status: 10, // 5 pending, 10 new  15 served 20 cancelling 25 cancelled
        uID: null,
        names: null,
        destTbl: '',
        destRmn: ''
      }
    }
  },
  watch: {
    'order.qty': {
      imediate: true,
      handler (val) {
        if (val) {
          this.order.price = parseFloat(this.menu.price) * parseFloat(val)
        } else {
          this.order.price = this.menu.price
          this.order.qty = 1
        }
      }
    }
  },
  mounted () {
    this.order = { ...this.order, ...this.menu, dish: this.menu.stocks }
  }
}
</script>

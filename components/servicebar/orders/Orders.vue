<template>
  <div>
    <div class=" w-full p-2 h-full">
      <div class=" w-full p-2 mt-5">
        <Order
          v-for="(order,n) in orders "
          :key="n"
          :order="order"
          :users="users"
          @changeorderState="changeorderState"
        />
      </div>
    </div>
  </div>
</template>

<script>
import Order from '@/components/common/orderFiltered/Order'
export default {
  components: { Order },
  props: {
    users: {
      type: [Object, Array],
      required: true
    },
    orders: {
      type: [Object, Array],
      required: true
    },
    token: {
      type: String,
      rerequired: true,
      default: ''
    }
  },
  methods: {
    async changeorderState (Orderid = 0, stateMode = null, message = null) {
      const config = {
        headers: { 'X-CSRF-TOKEN': this.token }
      }
      const bodyParameters = {
        id: Orderid,
        state: stateMode,
        message
      }
      try {
        await this.$axios.$post('changeorderState', bodyParameters, config)
          .then(({ result, category }) => {
            if (result && category) {
              this.$emit('loadOrders')
            }
          })
          .catch((errors) => {
            if (errors.response.data.message) {
              this.$toast.error(this.$ObjTemplate.trim(errors.response.data.message))
            } else {
              this.$toast.error(this.$ObjTemplate.trim(errors.response.request.statusText))
            }
          })
      } catch (e) {
        this.$toast.error(e)
      }
    }
  }
}
</script>

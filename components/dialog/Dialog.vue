<template>
  <div class="modal-overlay">
    <div class="modal">
      <div class=" flex flex-row">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-16 w-16 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
        </svg>
        <h6 class=" text-center w-full">
          {{ head }}
        </h6>
      </div>
      <div>
        <p>{{ message }}</p>
      </div>
      <div v-show="requireMessage">
        <div class=" border rounded-sm w-full mb-4 relative bg-white items-center">
          <textarea v-model="feedmessage" type="text" placeholder="Reason For Cancelling" class=" w-full font-roboto text-sm outline-none p-2" />
        </div>
      </div>
      <div>
        <input type="button" class="button button-error" value="cancel" @click="$emit('click-modal', fail, modalRoutine )">
        <input type="button" class="button button-success" value="proceed" style=" margin-left: auto;" @click="$emit('click-modal', success, modalRoutine ,feedmessage); feedmessage=null">
      </div>
    </div>

    <div class="close" @click="$emit('update:showmodal', false ); feedmessage=null">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 close-img text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    head: { type: String, required: false, default: 'Header' },
    message: { type: String, required: false, default: 'message' },
    modalRoutine: { type: String, required: false, default: '' },
    requireMessage: { type: Boolean, required: false, default: false }
  },

  data () {
    return {
      success: true,
      fail: false,
      feedmessage: null
    }
  }
}
</script>
<style scoped>

.modal-overlay {
  position: fixed;
  top: 0;
  bottom: 0;
  z-index: 100;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  background-color: #000000da;
}

.modal {
  text-align: center;
  background-color: white;
  height: max-content;
  width: max-content;
  margin-top: 10%;
  padding: 20px;
  border-radius: 5px;
}

.close {
  margin: 10% 0 0 16px;
  cursor: pointer;
}

.close-img {
  width: 25px;
}

.check {
  width: 150px;
}

h6 {
  font-weight: 500;
  font-size: 28px;
  margin: 10px 0;
}

p {
  font-size: 16px;
  margin: 10px 0;
}

button {
  width: 150px;
  height: 40px;
  color: white;
  font-size: 14px;
  border-radius: 16px;
  margin-top: 20px;
}
</style>

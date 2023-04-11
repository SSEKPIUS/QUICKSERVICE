<template>
  <div>
    <div class="w-full p-5 mt-5">
      <div class="w-full grid grid-cols-3 gap-3">
        <StockTile
          v-for="(stock, n) in stockPaginated"
          :key="n"
          :stock="stock"
          :usersection="usersection"
          :stock-operation-use="true"
          :selection-users="getUsers"
          @inboundTile="inboundStock"
          @outboundTile="outboundStock"
          @fixinboundStock="fixinboundStock"
          @fixoutboundStock="fixoutboundStock"
          @consumeTile="consumeTile"
          @deleteStock="deleteStock"
        />
      </div>
    </div>
    <Pagination
      :per-page="parseInt(9)"
      :itemlist="getStockAll"
      resource="Stock"
      :expectcurrentpage="getPage"
      @display-data="setDisplayDataStock"
      @selectedPage="(page) => setPage(page)"
    />
  </div>
</template>

<script>
//  --@collapse
import { mapGetters, mapActions, mapMutations } from 'vuex'
import StockTile from '@/components/common/StockTile'
export default {
  name: 'InventoryList',
  components: { StockTile },
  data () {
    return {
      stockPaginated: []
    }
  },
  computed: {
    ...mapGetters(['getToken', 'getStockAll', 'getPage', 'getUser', 'getUsers', 'getSearch']),
    usersection () { return this.getUser ? this.getUser.section : null }
  },
  watch: {
    getSearch: {
      imediate: true,
      handler () {
        this.fetchStock()
      }
    }
  },
  created () {
    this.setPage(1)
    this.fetchStock()
  },
  methods: {
    ...mapActions(['fetchStock']),
    ...mapMutations(['setPage']),
    setDisplayDataStock (data) {
      this.stockPaginated = data
    },
    async inboundStock (stock, inboundData) {
      try {
        await this.$swal.fire({
          title: 'Note!',
          html: `<div>
          <span style="color:red; font-size: x-large;">ADD</span><br> ${inboundData} ${stock.unit} of <span style="color:black; text-transform: uppercase;">${stock.stocks}</span> to <br><span style="color:red; font-size: x-large;">STORE</store>
          </div>`,
          text: "You won't be able to revert this!",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonText: 'Yes, ADD!',
          cancelButtonText: 'No, cancel!',
          reverseButtons: true,
          showLoaderOnConfirm: true,
          preConfirm: () => {
            const config = {
              headers: { 'X-CSRF-TOKEN': this.getToken }
            }
            const bodyParameters = {
              id: stock.asset_id,
              inbound: inboundData
            }
            return this.$axios.$post('inboundStock', bodyParameters, config)
              .then(({ result }) => {
                if (result) {
                  this.$toast.success(`Added ${inboundData} ${stock.unit} of ${stock.stocks} to STORE`)
                  this.fetchStock()
                } else {
                  this.$toast.error(`Adding ${inboundData} ${stock.unit} of ${stock.stocks} to STORE might have failed!`)
                  return this.$swal.showValidationMessage('Addition might have failed!')
                }
              })
              .catch((errors) => {
                if (errors.response.data.message) {
                  this.$toast.error(this.$ObjTemplate.trim(errors.response.data.message))
                  return this.$swal.showValidationMessage(this.$ObjTemplate.trim(errors.response.data.message))
                } else {
                  this.$toast.error(this.$ObjTemplate.trim(errors.response.request.statusText))
                  return this.$swal.showValidationMessage(this.$ObjTemplate.trim(errors.response.request.statusText))
                }
              })
          },
          allowOutsideClick: () => !this.$swal.isLoading()
        }).then((result) => {
          if (result.isConfirmed) {
            this.$swal.fire(
              'Added Stock!',
              `<span style="color: black; text-transform: uppercase;">${stock.stocks}</span> has been Added to STORE.`,
              'success'
            )
          } else if (
            result.dismiss == this.$swal.DismissReason.cancel
          ) {
            this.$swal.fire(
              'Cancelled',
              `<span style="color: black; text-transform: uppercase;">${stock.stocks}</span> is safe :)`,
              'error'
            )
          }
        })
      } catch (e) {
        this.$toast.error(e)
      }
    },
    async outboundStock (stock, selectedDepartment, selectedUser, outboundData) {
      try {
        await this.$swal.fire({
          title: 'Note!',
          html: `<div>
          <span style="color:red; font-size: x-large;">TRANSFER</span><br>
          ${outboundData} ${stock.unit} of <span style="color:black; text-transform: uppercase;">${stock.stocks}</span> to ${selectedUser}
          <br><span style="color:red; font-size: x-large;">${selectedDepartment}</store>
          </div>`,
          text: "You won't be able to revert this!",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonText: 'Yes, TRANSFER!',
          cancelButtonText: 'No, cancel!',
          reverseButtons: true,
          showLoaderOnConfirm: true,
          preConfirm: () => {
            const config = {
              headers: { 'X-CSRF-TOKEN': this.getToken }
            }
            const bodyParameters = {
              id: stock.asset_id,
              section: selectedDepartment,
              onrequestof: selectedUser,
              outbound: outboundData
            }
            return this.$axios.$post('outboundStock', bodyParameters, config)
              .then(({ result }) => {
                if (result) {
                  this.$toast.success(`Transfered ${outboundData} ${stock.unit} of ${stock.stocks} to ${selectedDepartment}`)
                  this.fetchStock()
                } else {
                  this.$toast.error(`Transfering ${outboundData} ${stock.unit} of ${stock.stocks} to ${selectedDepartment} might have failed!`)
                  return this.$swal.showValidationMessage('Transfering might have failed!')
                }
              })
              .catch((errors) => {
                if (errors.response.data.message) {
                  this.$toast.error(this.$ObjTemplate.trim(errors.response.data.message))
                  return this.$swal.showValidationMessage(this.$ObjTemplate.trim(errors.response.data.message))
                } else {
                  this.$toast.error(this.$ObjTemplate.trim(errors.response.request.statusText))
                  return this.$swal.showValidationMessage(this.$ObjTemplate.trim(errors.response.request.statusText))
                }
              })
          },
          allowOutsideClick: () => !this.$swal.isLoading()
        }).then((result) => {
          if (result.isConfirmed) {
            this.$swal.fire(
              'Transfered Stock!',
              `<span style="color: black; text-transform: uppercase;">${stock.stocks}</span> has been Transfered to <span style="text-transform: uppercase;">${selectedDepartment}</span>.`,
              'success'
            )
          } else if (
            result.dismiss == this.$swal.DismissReason.cancel
          ) {
            this.$swal.fire(
              'Cancelled',
              `<span style="color: black; text-transform: uppercase;">${stock.stocks}</span> is safe :)`,
              'error'
            )
          }
        })
      } catch (e) {
        this.$toast.error(e)
      }
    },
    async fixinboundStock (stock, inboundData) {
      try {
        await this.$swal.fire({
          title: `Authentication needed to Add ${inboundData} Units to ${stock.stocks} Stock`,
          html: `<form class="w-full">
            <div class="flex items-center mb-6">
              <div class="w-full">
                <input class="bg-gray-200 appearance-none border-2 border-gray-2s00 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-green-500" id="email" type="text" placeholder="Supervisor Account">
              </div>
            </div>
            <div class="flex items-center mb-6">
              <div class="w-full">
                <input class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-green-500" id="password" type="password" placeholder="Password">
              </div>
            </div>
          </form>`,
          text: "You won't be able to revert this!",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonText: 'Yes, ADD!',
          cancelButtonText: 'No, cancel!',
          reverseButtons: true,
          showLoaderOnConfirm: true,
          preConfirm: () => {
            const email = document.getElementById('email').value
            const password = document.getElementById('password').value
            if (!email) { return this.$swal.showValidationMessage('Email Required!') }
            if (!password) { return this.$swal.showValidationMessage('password Required!') }
            const config = {
              headers: { 'X-CSRF-TOKEN': this.getToken }
            }
            const bodyParameters = {
              id: stock.asset_id,
              inbound: inboundData,
              email,
              password
            }
            return this.$axios.$post('inboundStock/fix', bodyParameters, config)
              .then(({ result }) => {
                if (result) {
                  this.$toast.success('Correction Applied ')
                  this.fetchStock()
                } else {
                  this.$toast.error('Correcting might have failed!')
                  return this.$swal.showValidationMessage('Corrrecting might have failed!')
                }
              })
              .catch((errors) => {
                if (errors.response.data.message) {
                  this.$toast.error(this.$ObjTemplate.trim(errors.response.data.message))
                  return this.$swal.showValidationMessage(this.$ObjTemplate.trim(errors.response.data.message))
                } else {
                  this.$toast.error(this.$ObjTemplate.trim(errors.response.request.statusText))
                  return this.$swal.showValidationMessage(this.$ObjTemplate.trim(errors.response.request.statusText))
                }
              })
          },
          allowOutsideClick: () => !this.$swal.isLoading()
        }).then((result) => {
          if (result.isConfirmed) {
            this.$swal.fire(
              'Correction Applied!',
              `${stock.stocks} has been corrected.`,
              'success'
            )
          } else if (
            result.dismiss == this.$swal.DismissReason.cancel
          ) {
            this.$swal.fire(
              'Cancelled',
              `${stock.stocks} is safe :)`,
              'error'
            )
          }
        })
      } catch (e) {
        this.$toast.error(e)
      }
    },
    async fixoutboundStock (stock, outboundData) {
      try {
        await this.$swal.fire({
          title: `Authentication needed to Remove ${outboundData} Units from ${stock.stocks} Stock`,
          html: `<form class="w-full">
            <div class="flex items-center mb-6">
              <div class="w-full">
                <input class="bg-gray-200 appearance-none border-2 border-gray-2s00 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-green-500" id="email" type="text" placeholder="Supervisor Account">
              </div>
            </div>
            <div class="flex items-center mb-6">
              <div class="w-full">
                <input class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-green-500" id="password" type="password" placeholder="Password">
              </div>
            </div>
          </form>`,
          text: "You won't be able to revert this!",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonText: 'Yes, REMOVE!',
          cancelButtonText: 'No, cancel!',
          reverseButtons: true,
          showLoaderOnConfirm: true,
          preConfirm: () => {
            const email = document.getElementById('email').value
            const password = document.getElementById('password').value
            if (!email) { return this.$swal.showValidationMessage('Email Required!') }
            if (!password) { return this.$swal.showValidationMessage('password Required!') }
            const config = {
              headers: { 'X-CSRF-TOKEN': this.getToken }
            }
            const bodyParameters = {
              id: stock.asset_id,
              outbound: outboundData,
              email,
              password
            }
            return this.$axios.$post('outboundStock/fix', bodyParameters, config)
              .then(({ result }) => {
                if (result) {
                  this.$toast.success('Correction Applied ')
                  this.fetchStock()
                } else {
                  this.$toast.error('Correcting  might have failed!')
                  return this.$swal.showValidationMessage('Corrrecting might have failed!')
                }
              })
              .catch((errors) => {
                if (errors.response.data.message) {
                  this.$toast.error(this.$ObjTemplate.trim(errors.response.data.message))
                  return this.$swal.showValidationMessage(this.$ObjTemplate.trim(errors.response.data.message))
                } else {
                  this.$toast.error(this.$ObjTemplate.trim(errors.response.request.statusText))
                  return this.$swal.showValidationMessage(this.$ObjTemplate.trim(errors.response.request.statusText))
                }
              })
          },
          allowOutsideClick: () => !this.$swal.isLoading()
        }).then((result) => {
          if (result.isConfirmed) {
            this.$swal.fire(
              'Correction Applied!',
              `${stock.stocks} has been corrected.`,
              'success'
            )
          } else if (
            result.dismiss == this.$swal.DismissReason.cancel
          ) {
            this.$swal.fire(
              'Cancelled',
              `${stock.stocks} is safe :)`,
              'error'
            )
          }
        })
      } catch (e) {
        this.$toast.error(e)
      }
    },
    async consumeTile (stock, selectedUseOperation, stockOperationsData) {
      try {
        const config = {
          headers: { 'X-CSRF-TOKEN': this.getToken }
        }
        const bodyParameters = {
          id: stock.asset_id,
          selectedUseOperation,
          stockOperationsData
        }
        if (selectedUseOperation.toLowerCase() == 'used') {
          await this.$swal.fire({
            title: 'Note!',
            html: `<div>
          <span style="color:red; font-size: x-large; text-transform: uppercase;">${selectedUseOperation}</span><br>
          ${stockOperationsData} ${stock.unit} of <span style="color:black; text-transform: uppercase;">${stock.stocks}</span>
          </div>`,
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: `Yes, <span style="text-transform: uppercase;">${selectedUseOperation}</span>!`,
            cancelButtonText: 'No, cancel!',
            reverseButtons: true,
            showLoaderOnConfirm: true,
            preConfirm: () => {
              return this.$axios.$post('consumeStock', bodyParameters, config)
                .then(({ result }) => {
                  if (result) {
                    this.$toast.success(`${selectedUseOperation} ${stockOperationsData} ${stock.unit} of ${stock.stocks}`)
                    this.fetchStock()
                  } else {
                    this.$toast.error(`${selectedUseOperation} ${stockOperationsData} ${stock.unit} of ${stock.stocks} might have failed!`)
                    return this.$swal.showValidationMessage(`${selectedUseOperation} might have failed!`)
                  }
                })
                .catch((errors) => {
                  if (errors.response.data.message) {
                    this.$toast.error(this.$ObjTemplate.trim(errors.response.data.message))
                    return this.$swal.showValidationMessage(this.$ObjTemplate.trim(errors.response.data.message))
                  } else {
                    this.$toast.error(this.$ObjTemplate.trim(errors.response.request.statusText))
                    return this.$swal.showValidationMessage(this.$ObjTemplate.trim(errors.response.request.statusText))
                  }
                })
            },
            allowOutsideClick: () => !this.$swal.isLoading()
          }).then((result) => {
            if (result.isConfirmed) {
              this.$swal.fire(
              `${selectedUseOperation} Stock!`,
              `<span style="color: black; text-transform: uppercase;">${stock.stocks}</span> is ${selectedUseOperation}.`,
              'success'
              )
            } else if (
              result.dismiss == this.$swal.DismissReason.cancel
            ) {
              this.$swal.fire(
                'Cancelled',
              `<span style="color: black; text-transform: uppercase;">${stock.stocks}</span> is safe :)`,
              'error'
              )
            }
          })
        } else {
          await this.$swal.fire({
            title: 'Supervisor QAC needed to Transact',
            html: `<form class="w-full">
            <div class="flex items-center mb-6">
              <div class="w-full">
                <input class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-green-500" id="qac" type="password" placeholder="Supervisor's QAC">
              </div>
            </div>
          </form>`,
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, Proceed!',
            cancelButtonText: 'No, cancel!',
            reverseButtons: true,
            showLoaderOnConfirm: true,
            preConfirm: () => {
              const qac = document.getElementById('qac').value
              if (!qac) { return this.$swal.showValidationMessage('QAC Required!') }
              bodyParameters.qac = qac
              return this.$axios.$post('consumeStock', bodyParameters, config)
                .then(({ result, message }) => {
                  if (result) {
                    this.$toast.success(message)
                    this.fetchStock()
                  } else {
                    this.$toast.error(message)
                    return this.$swal.showValidationMessage(message)
                  }
                })
                .catch((errors) => {
                  if (errors.response.data.message) {
                    this.$toast.error(this.$ObjTemplate.trim(errors.response.data.message))
                    return this.$swal.showValidationMessage(this.$ObjTemplate.trim(errors.response.data.message))
                  } else {
                    this.$toast.error(this.$ObjTemplate.trim(errors.response.request.statusText))
                    return this.$swal.showValidationMessage(this.$ObjTemplate.trim(errors.response.request.statusText))
                  }
                })
            },
            allowOutsideClick: () => !this.$swal.isLoading()
          }).then((result) => {
            if (result.isConfirmed) {
              this.$swal.fire(
                'Success!',
                'Operation Complete!',
                'success'
              )
            }
          })
        }
      } catch (e) {
        this.$toast.error(e)
      }
    },
    async deleteStock (Stock) { // this.stock.asset_id, this.stock.section
      try {
        await this.$swal.fire({
          title: `Supervisor Authentication needed to Delete ${Stock.stocks}`,
          html: `<form class="w-full">
            <div class="flex items-center mb-6">
              <div class="w-full">
                <input class="bg-gray-200 appearance-none border-2 border-gray-2s00 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-green-500" id="email" type="text" placeholder="Supervisor Account">
              </div>
            </div>
            <div class="flex items-center mb-6">
              <div class="w-full">
                <input class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-green-500" id="password" type="password" placeholder="Password">
              </div>
            </div>
            <p style="color: red;">You won't be able to revert this!</p>
          </form>`,
          text: "You won't be able to revert this!",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonText: 'Yes, delete it!',
          cancelButtonText: 'No, cancel!',
          reverseButtons: true,
          showLoaderOnConfirm: true,
          preConfirm: () => {
            const email = document.getElementById('email').value
            const password = document.getElementById('password').value
            if (!email) { return this.$swal.showValidationMessage('Email Required!') }
            if (!password) { return this.$swal.showValidationMessage('password Required!') }
            const config = {
              headers: { 'X-CSRF-TOKEN': this.getToken }
            }
            const bodyParameters = {
              id: Stock.asset_id,
              type: Stock.section,
              email,
              password
            }
            return this.$axios.$post('delStock', bodyParameters, config)
              .then(({ result, category }) => {
                if (result) {
                  this.$toast.success('Deleted ' + category)
                  this.fetchStock()
                } else {
                  this.$toast.error(`Deleting  ${category} might have failed!`)
                  return this.$swal.showValidationMessage(`Deleting  ${category} might have failed!`)
                }
              })
              .catch((errors) => {
                if (errors.response.data.message) {
                  this.$toast.error(this.$ObjTemplate.trim(errors.response.data.message))
                  return this.$swal.showValidationMessage(this.$ObjTemplate.trim(errors.response.data.message))
                } else {
                  this.$toast.error(this.$ObjTemplate.trim(errors.response.request.statusText))
                  return this.$swal.showValidationMessage(this.$ObjTemplate.trim(errors.response.request.statusText))
                }
              })
          },
          allowOutsideClick: () => !this.$swal.isLoading()
        }).then((result) => {
          if (result.isConfirmed) {
            this.$swal.fire(
              'Deleted!',
              `${Stock.stocks} has been deleted.`,
              'success'
            )
          } else if (
            result.dismiss == this.$swal.DismissReason.cancel
          ) {
            this.$swal.fire(
              'Cancelled',
              `${Stock.stocks} is safe :)`,
              'error'
            )
          }
        })
      } catch (e) {
        this.$toast.error(e)
      }
    }
  }
}
</script>

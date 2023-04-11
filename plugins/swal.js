import Swal from 'sweetalert2'

export default ({ app }, inject) => {
  inject('swal', Swal.mixin({
    customClass: {
      confirmButton: 'btn btn-success',
      cancelButton: 'btn btn-danger'
    },
    buttonsStyling: false
  }))
}

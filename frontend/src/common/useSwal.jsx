import Swal from "sweetalert2";

export const successAlert = (title = "Success", message, showConfirmButton = false) => {
    Swal.fire({
        icon: 'success',
        text: message,
        title: title,
        showConfirmButton: showConfirmButton,
    })
}

export const errorAlert = (title = "Error", message, footer = null, showConfirmButton = false) => {
    Swal.fire({
        icon: 'error',
        title: title,
        showConfirmButton: showConfirmButton,
        text: message,
        footer: footer,
    })
}

export const confirmAlert = async () => {
    let isConfirmed;
    await Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
    }).then(result => {
        isConfirmed = result.isConfirmed;
    })
    return isConfirmed
}
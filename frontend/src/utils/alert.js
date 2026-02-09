import Swal from "sweetalert2";

export const confirmDelete = () =>
  Swal.fire({
    title: "Are you sure?",
    text: "This action cannot be undone!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#d33",
    confirmButtonText: "Delete",
  });

export const successAlert = (message) =>
  Swal.fire({
    icon: "success",
    title: "Success",
    text: message,
    timer: 1500,
    showConfirmButton: false,
  });

export const errorAlert = (message) =>
  Swal.fire({
    icon: "error",
    title: "Error",
    text: message,
  });

export const confirmAction = ({
  title = "Are you sure?",
  text = "Please confirm to continue.",
  confirmText = "Yes, continue",
  icon = "question",
}) => {
  return Swal.fire({
    title,
    text,
    icon,
    showCancelButton: true,
    confirmButtonColor: "#16a34a", // green
    cancelButtonColor: "#6b7280",
    confirmButtonText: confirmText,
    cancelButtonText: "Cancel",
  });
};



export const confirmStatusChange = (checked) =>
  Swal.fire({
    title: "Confirm",
    text: checked
      ? "Mark this as unpaid?"
      : "Mark this as paid?",
    icon: "question",
    showCancelButton: true,
  });
export const confirmUpdate = () =>
  Swal.fire({
    title: "Confirm Update",
    text: "Are you sure you want to update this record?",
    icon: "question",
    showCancelButton: true,
    confirmButtonText: "Yes, update",
  });
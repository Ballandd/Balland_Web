export default function useModal(dialog) {
  const openModal = () => {
    dialog.showModal()
    dialog.style.display = "flex"
  }

  const closeModal = () => {
    dialog.close()
    dialog.style.display = "none"
  }

  return { openModal, closeModal }
}

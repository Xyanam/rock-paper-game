import { ModalType, toggleModal } from "@/redux/slices/modal-slice"
import { useAppDispatch } from "@/redux/store"

const useToggleModal = () => {
  const dispatch = useAppDispatch()

  const toggleModalAction = (modalData: ModalType) => {
    dispatch(toggleModal(modalData))
  }

  return toggleModalAction
}

export default useToggleModal

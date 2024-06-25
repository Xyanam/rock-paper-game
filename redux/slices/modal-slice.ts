import { createSlice } from "@reduxjs/toolkit"

import { ModalComponentType } from "@/lib/modal-components"

import { RootState } from "../store"

export interface ModalType {
  isOpen?: boolean
  view?: "sheet" | "dialog"
  title?: string
  subTitle?: string
  type: ModalComponentType
  props?: any
  size?: "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "4xl" | "5xl" | "full"
}

interface initialStateType {
  modals: ModalType[]
}

const initialState: initialStateType = {
  modals: [],
}

const modalsSlice = createSlice({
  name: "modals",
  initialState,
  reducers: {
    toggleModal(state, action) {
      const {
        isOpen = true,
        view = "sheet",
        subTitle,
        title,
        type,
        props,
        size = "md",
      } = action.payload

      const modalIndex = state.modals.findIndex((modal) => modal.type === type)

      if (modalIndex !== -1) {
        state.modals[modalIndex].isOpen = false
      } else {
        state.modals.push({
          isOpen,
          view,
          title,
          subTitle,
          type,
          props,
          size,
        })
      }
    },
    updateModalProps(state, action) {
      const { type, props } = action.payload
      const modal = state.modals.find((modal) => modal.type === type)
      if (modal) {
        modal.props = { ...modal.props, ...props }
      }
    },
    closeAllModals() {
      return initialState
    },
    closeModal(state, action) {
      const { type } = action.payload
      const modalIndex = state.modals.findIndex((modal) => modal.type === type)
      state.modals.splice(modalIndex, 1)
    },
  },
})

export const selectModals = (state: RootState) => state.modal.modals

export const { toggleModal, closeModal, updateModalProps, closeAllModals } =
  modalsSlice.actions
export default modalsSlice.reducer

"use client"

import { useCallback, useEffect } from "react"

import { usePathname } from "next/navigation"

import useToggleModal from "@/lib/hooks/useToggleModal"
import { modalComponentsMapper } from "@/lib/modal-components"
import { ModalType, closeAllModals, closeModal, selectModals } from "@/redux/slices/modal-slice"
import { useAppDispatch, useAppSelector } from "@/redux/store"

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "./dialog"

const Modal = () => {
  const modals = useAppSelector(selectModals)
  const pathname = usePathname()
  const dispatch = useAppDispatch()
  const toggleModal = useToggleModal()

  useEffect(() => {
    /* Close all modals when the URL changes */
    dispatch(closeAllModals())
  }, [dispatch, pathname])

  const handleCloseModal = useCallback(
    (modal: ModalType) => {
      dispatch(closeModal({ type: modal.type }))
    },
    [dispatch]
  )

  // Wait for close animation and only then remove modal
  useEffect(() => {
    const timeoutIds: NodeJS.Timeout[] = []

    modals.forEach((modal) => {
      if (modal && !modal.isOpen) {
        const timeoutId = setTimeout(() => {
          handleCloseModal(modal)
        }, 300)

        timeoutIds.push(timeoutId)
      }
    })

    return () => {
      timeoutIds.forEach((timeoutId) => clearTimeout(timeoutId))
    }
  }, [handleCloseModal, modals])

  return (
    <div>
      {modals.map((modal, index) => {
        const { component, title, subTitle } = modalComponentsMapper[modal.type]
        const ComponentToRender = component || (() => null)
        const props = modal.props || {}

        return (
          <Dialog
            key={index}
            open={modal.isOpen}
            onOpenChange={(isOpen) => toggleModal({ ...modal, isOpen })}>
            <DialogContent
              className={`flex flex-col sm:max-w-${modal.size} border-none bg-custom-gradient p-4`}>
              <DialogHeader>
                <DialogTitle className="text-white">{title}</DialogTitle>
                <DialogDescription className="text-gray-300">{subTitle}</DialogDescription>
              </DialogHeader>
              <div className="max-h-[90vh] flex-grow overflow-y-auto md:max-h-full">
                <ComponentToRender {...props} />
              </div>
            </DialogContent>
          </Dialog>
        )
      })}
    </div>
  )
}

export default Modal

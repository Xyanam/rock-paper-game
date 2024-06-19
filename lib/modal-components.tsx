
type ModalComponent = {
  title?: string
  subTitle?: string
  component: React.ComponentType<any>
}

const modalComponent = {}

export type ModalComponentType = keyof typeof modalComponent

export const modalComponentsMapper: Record<ModalComponentType, ModalComponent> =
  modalComponent

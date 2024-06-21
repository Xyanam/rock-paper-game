import CreateRoom from "@/components/ui/forms/create-room"

type ModalComponent = {
  title?: string
  subTitle?: string
  component: React.ComponentType<any>
}

const modalComponent = {
  createRoom: {
    title: "Game Settings",
    subTitle: "Customize the game to your liking",
    component: CreateRoom,
  },
}

export type ModalComponentType = keyof typeof modalComponent

export const modalComponentsMapper: Record<ModalComponentType, ModalComponent> = modalComponent

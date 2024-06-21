"use client"

import React from "react"

import { Lock, PlusIcon, UserIcon } from "lucide-react"
import { useRouter } from "next/navigation"
import toast from "react-hot-toast"
import useLocalStorageState from "use-local-storage-state"

import RoomService from "@/lib/services/RoomService"
import { cn } from "@/lib/utils"
import { IRoom, IRoomSettings } from "@/types/IRoom"

import { Button } from "./ui/button"
import { H1 } from "./ui/typography"
import useToggleModal from "@/lib/hooks/useToggleModal"

const Rooms = ({ allRooms }: { allRooms: IRoom[] | null }) => {
  const router = useRouter()
  const [username] = useLocalStorageState<string>("username")
  const toggleModal = useToggleModal()

  const handleJoinRoom = (roomId: string) => {
    if (username) {
      RoomService.joinRoom(roomId, username)
        .then(() => router.push(`game/${roomId}`))
        .catch(() => toast.error("Error when join into room"))
    }
  }

  const handleCreateRoom = async (settings: IRoomSettings) => {
    await RoomService.createRoom(router, settings)

    toggleModal({ type: "createRoom", isOpen: false })
  }

  return (
    <div className="w-full max-w-4xl rounded-md border border-white px-4 py-10">
      <div className="flex justify-between">
        <H1 className="text-start">All rooms</H1>
        <Button
          onClick={() => toggleModal({ type: "createRoom", props: { handleCreateRoom } })}
          className="flex items-center gap-2">
          Create room <PlusIcon className="h-5 w-5" />
        </Button>
      </div>
      <div className="mt-10 flex flex-col gap-4">
        {allRooms?.map((room) => {
          const playersCount = room.players ? Object.keys(room.players).length : 0

          return (
            <div
              className="flex w-full cursor-pointer justify-between rounded-md border border-white px-6 py-3 text-white hover:bg-muted/20"
              key={room.room_id}
              onClick={() =>
                playersCount < +room.maxPlayers
                  ? handleJoinRoom(room.room_id)
                  : toast.error("Room is full")
              }>
              <p className="flex items-center gap-2">{room.roomName}</p>
              <div className="flex items-center gap-4">
                {room.isPrivate && <Lock className="h-4 w-4" />}
                <div>BO{room.bestOf}</div>
                <p>|</p>
                <p
                  className={cn(
                    "flex items-center gap-2",
                    playersCount === +room.maxPlayers && "text-red-500"
                  )}>
                  {playersCount}/{room.maxPlayers} <UserIcon className="h-4 w-4" />
                </p>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Rooms

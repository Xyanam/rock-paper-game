import { onDisconnect, onValue, ref, remove, set, update } from "firebase/database"
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime"
import toast from "react-hot-toast"
import { v4 as uuidv4 } from "uuid"

import { IRoom, IRoomSettings } from "@/types/IRoom"

import { RTDB, database } from "../configs/firebase-config"

interface CreateRoomArgs {
  router: AppRouterInstance
  settings: IRoomSettings
}

export default class RoomService {
  static async createRoom(router: CreateRoomArgs["router"], settings: CreateRoomArgs["settings"]) {
    const roomId = uuidv4()

    try {
      const roomRef = ref(RTDB, `rooms/${roomId}`)

      await set(roomRef, {
        room_id: roomId,
        game: {
          status: "waiting",
          playerChoices: {},
          result: null,
        },
        ...settings,
      })

      router.push(`/game/${roomId}`)
    } catch (error) {
      toast.error(`Error creating room: ${error}`)

      return null
    }
  }

  static getRoomData(roomId: string, callback: (data: IRoom) => void): Promise<void> {
    return new Promise((resolve, reject) => {
      try {
        const roomRef = ref(RTDB, `rooms/${roomId}`)

        onValue(
          roomRef,
          (snapshot) => {
            const roomData = snapshot.val() as IRoom

            if (roomData) {
              callback(roomData)
              resolve()
            } else {
              reject(new Error("Room not found"))
            }
          },
          (error) => {
            reject(error)
          }
        )
      } catch (error) {
        reject(error)
      }
    })
  }

  static async joinRoom(roomId: string, username: string) {
    const roomRef = ref(RTDB, `rooms/${roomId}/players/${username}`)
    const userData = {
      name: username,
      online: true,
    }

    try {
      await update(roomRef, userData)

      onDisconnect(roomRef).remove()

      return true
    } catch (error) {
      console.error(`Error joining room: ${error}`)

      return false
    }
  }

  static async leaveRoom(roomId: string, username: string) {
    const roomRef = ref(RTDB, `rooms/${roomId}/players/${username}`)
    try {
      await remove(roomRef)

      return true
    } catch (error) {
      console.error(`Error leaving room: ${error}`)
      return false
    }
  }
}

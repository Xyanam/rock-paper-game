import { doc, getDoc, setDoc } from "firebase/firestore"
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime"
import toast from "react-hot-toast"
import { v4 as uuidv4 } from "uuid"

import { IRoom } from "@/types/IRoom"

import { database } from "../configs/firebase-config"

export default class RoomService {
  static async createRoom(router: AppRouterInstance) {
    const roomId = uuidv4()

    const docRef = doc(database, `rooms/${roomId}`)

    try {
      await setDoc(docRef, {
        room_id: roomId,
        maxPlayers: 2,
        players: ["", ""],
      })

      router.push(`/game/${roomId}`)
    } catch (error) {
      toast.error(`Error creating room: ${error}`)
    }

    router.push(`/game/${roomId}`)
  }

  static async getRoomData(roomId: string, router: AppRouterInstance): Promise<IRoom | undefined> {
    const docRef = doc(database, `rooms/${roomId}`)
    const docSnap = await getDoc(docRef)

    if (docSnap.exists()) {
      return docSnap.data() as IRoom
    } else {
      toast.error("Room not found!")
      router.push("/")

      return undefined
    }
  }

  static async joinRoom() {}
}

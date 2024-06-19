import { doc, getDoc, setDoc } from "firebase/firestore"
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime"
import { v4 as uuidv4 } from "uuid"

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
      console.error("Error creating room:", error)
    }

    router.push(`/game/${roomId}`)
  }

  static async getRoomData(roomId: string, router: AppRouterInstance) {
    const docRef = doc(database, `rooms/${roomId}`)
    const docSnap = await getDoc(docRef)

    if (docSnap.exists()) {
      return docSnap.data()
    } else {
      console.log("Room not found!")
      router.push("/")
    }
  }

  static async joinRoom() {}
}

import { get, onValue, ref, remove } from "firebase/database"

import { IRoom } from "@/types/IRoom"

import { RTDB } from "../configs/firebase-config"

export default class RoomsService {
  static async getAllRooms(callback: (rooms: IRoom[]) => void) {
    try {
      const roomRef = ref(RTDB, "rooms")

      onValue(roomRef, (snapshot) => {
        const roomData = snapshot.val() as Record<string, IRoom> | null

        if (roomData) {
          const roomsArray = Object.keys(roomData).map((key) => roomData[key])

          callback(roomsArray)
        } else {
          callback([])
        }
      })
    } catch (error) {
      console.error(`Error getting room data: ${error}`)
    }
  }

  static async removeEmptyRooms() {
    const roomRef = ref(RTDB, "rooms")

    const snapshot = await get(roomRef)
    const roomData = snapshot.val() as Record<string, IRoom> | null

    if (roomData) {
      Object.keys(roomData).forEach(async (roomId) => {
        const room: IRoom = roomData[roomId]
        if (!room.players || Object.keys(room.players).length === 0) {
          await remove(ref(RTDB, `rooms/${roomId}`))
        }
      })
    }
  }
}

import { onValue, ref } from "firebase/database"

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
}

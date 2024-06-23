import { onValue, ref, set, update } from "firebase/database"
import { RTDB } from "../configs/firebase-config"

export default class GameService {
  static async makeChoice(roomId: string, username: string, choice: string | null) {
    const choiceRef = ref(RTDB, `rooms/${roomId}/game/playerChoices/${username}`)

    try {
      await set(choiceRef, choice)
    } catch (error) {
      console.log(`Error making choice ${error}`)
    }
  }

  static onGameUpdate(roomId: string, callback: (data: any) => void) {
    const gameRef = ref(RTDB, `rooms/${roomId}/game`)

    onValue(gameRef, (snapshot) => {
      const gameData = snapshot.val()
      callback(gameData)
    })
  }

  static async saveResult(roomId: string, result: string) {
    const resultRef = ref(RTDB, `rooms/${roomId}/game/result`)

    await set(resultRef, result)
  }

  static async startGame(roomId: string) {
    const roomRef = ref(RTDB, `rooms/${roomId}/game`)

    try {
      await update(roomRef, {
        status: "in_progress",
      })
    } catch (error) {
      console.error(`Error starting game: ${error}`)
    }
  }
}

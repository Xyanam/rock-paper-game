import { IRoom } from "@/types/IRoom"
import GameService from "../services/GameService"
import toast from "react-hot-toast"

export const handleStartGame = async (roomId: string) => {
  if (roomId) {
    try {
      await GameService.startGame(roomId)
    } catch (error) {
      toast.error(`Error starting game: ${error}`)
    }
  }
}

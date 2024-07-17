import { OptionType, GameResult } from "@/types/TGameOptions"

export const determineWinner = (
  playerOnePick: OptionType | null,
  playerTwoPick: OptionType | null
): GameResult => {
  if (playerOnePick === playerTwoPick) {
    return "draw"
  }

  if (
    (playerOnePick === "rock" && playerTwoPick === "scissors") ||
    (playerOnePick === "scissors" && playerTwoPick === "paper") ||
    (playerOnePick === "paper" && playerTwoPick === "rock")
  ) {
    return "win"
  }

  return "lose"
}

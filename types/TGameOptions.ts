import { PAPER_OPTION, ROCK_OPTION, SCISSORS_OPTION } from "@/constants/constants"

export const OptionsTypes = [ROCK_OPTION, PAPER_OPTION, SCISSORS_OPTION] as const

export type OptionType = (typeof OptionsTypes)[number] | "no-access"

export type GameResult = "win" | "lose" | "draw"

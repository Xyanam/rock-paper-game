import React from "react"
import Image from "next/image"
import Paper from "../public/images/paper.png"
import Question from "../public/images/question.png"
import Rock from "../public/images/rock.png"
import Scissors from "../public/images/scissors.png"
import { OptionType } from "@/types/TGameOptions"

interface GameOptionProps {
  type: OptionType | "no-access" | null
  onClick?: () => void
}

const images = {
  rock: Rock,
  paper: Paper,
  scissors: Scissors,
  "no-access": Question,
}

const GameOption = ({ type, onClick }: GameOptionProps) => {
  if (!type) return

  const src = images[type]

  return (
    <div
      className={`flex h-48 w-48 cursor-pointer items-center justify-center rounded-full bg-white p-4 shadow-md shadow-black transition-all hover:bg-white/90`}
      onClick={onClick}>
      {src ? (
        <Image src={src} alt={type} />
      ) : (
        <h1 className="text-4xl font-bold text-white">Waiting for opponent...</h1>
      )}
    </div>
  )
}

export default GameOption

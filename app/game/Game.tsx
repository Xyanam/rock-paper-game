"use client"

import React, { useEffect, useState } from "react"

import { Bot, User } from "lucide-react"
import { useRouter } from "next/navigation"
import useLocalStorageState from "use-local-storage-state"

import GameOption from "@/components/game-option"
import { Button } from "@/components/ui/button"
import { H1 } from "@/components/ui/typography"
import { determineWinner } from "@/lib/helpers/determineWinner"
import { getRandomNumber } from "@/lib/utils"
import { GameResult, OptionType, OptionsTypes } from "@/types/TGameOptions"

const Game = () => {
  const [computerPick, setComputerPick] = useState<OptionType>(
    OptionsTypes[getRandomNumber(3)]
  )
  const [userPick, setUserPick] = useState<OptionType | null>(null)
  const [result, setResult] = useState<GameResult | null>(null)
  const router = useRouter()
  const [username] = useLocalStorageState<string>("username")

  useEffect(() => {
    if (userPick && computerPick) {
      const result = determineWinner(userPick, computerPick)

      setResult(result)
    }
  }, [userPick, computerPick])

  const handleReset = () => {
    setUserPick(null)
    setComputerPick(OptionsTypes[getRandomNumber(3)])
    setResult(null)
  }

  return (
    <div className="mt-6 flex flex-col items-center justify-center pb-6">
      <div className="rounded-md border border-white px-10 py-4">
        <div className="flex flex-col items-center gap-6 sm:flex-row sm:items-start">
          <H1 className="flex">
            <User className="mr-2 h-10 w-10" />
            You
          </H1>
          <h1 className="flex items-center text-center text-4xl font-bold text-white">
            VS
          </h1>
          <H1 className="flex">
            <Bot className="mr-2 h-10 w-10" />
            Computer
          </H1>
        </div>
      </div>

      <div className="mt-14 flex flex-col gap-20 sm:flex-row">
        {userPick === null ? (
          <div className="flex max-w-xl flex-col items-center justify-center">
            <H1>Take your pick</H1>
            <div className="mt-14 flex max-w-xl flex-wrap justify-center gap-10">
              {OptionsTypes.map((option) => (
                <GameOption
                  key={option}
                  type={option}
                  onClick={() => setUserPick(option)}
                />
              ))}
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-24">
            <div className="flex h-full w-full max-w-xl flex-col justify-between">
              <H1 className="text-center text-4xl font-bold text-white">
                Your pick
              </H1>
              <div className="mt-14 flex flex-wrap justify-center gap-10">
                <GameOption type={userPick} />
              </div>
            </div>

            {result && (
              <div className="mt-4 flex w-full max-w-lg flex-col">
                <H1
                  className={`text-center text-4xl font-bold ${result === "win" ? "text-green-500" : result === "lose" ? "text-red-500" : "text-orange-500"}`}>
                  {result === "win"
                    ? "You Win!"
                    : result === "lose"
                      ? "You Lose!"
                      : "It's a Draw!"}
                </H1>
                <Button className="mt-6 text-lg" onClick={handleReset}>
                  Play again
                </Button>
              </div>
            )}

            <div className="flex h-full w-full max-w-xl flex-col justify-between">
              <H1 className="text-center text-4xl font-bold text-white">
                Computer picked
              </H1>
              <div className="mt-14 flex flex-wrap justify-center gap-10">
                <GameOption type={computerPick} />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Game

"use client"

import React, { useEffect, useState } from "react"
import { Bot, User } from "lucide-react"
import { useParams } from "next/navigation"
import useLocalStorageState from "use-local-storage-state"

import GameOption from "@/components/game-option"
import { Button } from "@/components/ui/button"
import { H1 } from "@/components/ui/typography"
import Loader from "@/components/loader"
import { determineWinner } from "@/lib/helpers/determineWinner"
import { getRandomNumber } from "@/lib/utils"
import { GameResult, OptionType, OptionsTypes } from "@/types/TGameOptions"
import { RESULT_GAME, RESULT_LOSE, RESULT_WIN } from "@/lib/constants/constants"
import GameService from "@/lib/services/GameService"
import { IRoom } from "@/types/IRoom"

interface GameProps {
  type: "single" | "multi"
  roomData?: IRoom
}

const Game = ({ type, roomData }: GameProps) => {
  const params = useParams<{ roomId: string }>()
  const [username] = useLocalStorageState<string>("username")

  const [isLoading, setIsLoading] = useState(type === "multi")
  const [computerPick, setComputerPick] = useState<OptionType | null>(
    OptionsTypes[getRandomNumber(3)]
  )
  const [userPick, setUserPick] = useState<OptionType | null>(null)
  const [opponentPick, setOpponentPick] = useState<OptionType | null>(null)
  const [result, setResult] = useState<GameResult | null>(null)

  useEffect(() => {
    if (type === "multi") {
      const handleRoomData = (data: any) => {
        setIsLoading(false)

        if (username && data.playerChoices) {
          setUserPick(data.playerChoices[username] || null)
          const opponent = Object.keys(data.playerChoices).find((player) => player !== username)
          setOpponentPick(opponent ? data.playerChoices[opponent] : null)
        } else {
          setUserPick(null)
          setOpponentPick(null)
        }
      }

      GameService.onGameUpdate(params.roomId, handleRoomData)
    } else {
      setOpponentPick(OptionsTypes[getRandomNumber(3)])
    }
  }, [params.roomId, username, type])

  useEffect(() => {
    if (userPick && (computerPick || opponentPick)) {
      const result = determineWinner(userPick, type === "single" ? computerPick : opponentPick)
      setResult(result)
    }
  }, [userPick, computerPick, opponentPick, type])

  useEffect(() => {
    if (
      roomData?.game.playerChoices &&
      Object.keys(roomData?.game.playerChoices).length &&
      username
    ) {
      setUserPick((roomData?.game.playerChoices[username] as OptionType) || null)
    }
  }, [roomData])

  const handlePick = async (pick: OptionType) => {
    setUserPick(pick)
    if (type === "multi" && username) {
      await GameService.makeChoice(params.roomId, username, pick)
    }
  }

  const handleReset = async () => {
    setUserPick(null)
    setOpponentPick(type === "multi" ? null : OptionsTypes[getRandomNumber(3)])
    setComputerPick(OptionsTypes[getRandomNumber(3)])
    setResult(null)

    if (type === "multi" && roomData) {
      const roomPlayers = Object.keys(roomData.players)
      const promises = roomPlayers.map((player) =>
        GameService.makeChoice(params.roomId, player, null)
      )
      await Promise.all(promises)
    }
  }

  if (isLoading) return <Loader />

  return (
    <div className="mt-6 flex flex-col items-center justify-center pb-6">
      <div className="rounded-md border border-white px-10 py-4">
        <div className="flex flex-col items-center gap-6 sm:flex-row sm:items-start">
          <H1 className="flex">
            <User className="mr-2 h-10 w-10" />
            You
          </H1>
          <h1 className="flex items-center text-center text-4xl font-bold text-white">VS</h1>
          <H1 className="flex">
            {type === "single" ? <Bot className="mr-2 h-10 w-10" /> : "Opponent"}
          </H1>
        </div>
      </div>

      <div className="mt-14 flex flex-col gap-20 sm:flex-row">
        {userPick === null ? (
          <div className="flex max-w-xl flex-col items-center justify-center">
            <H1>Take your pick</H1>
            <div className="mt-14 flex max-w-xl flex-wrap justify-center gap-10">
              {OptionsTypes.map((option) => (
                <GameOption key={option} type={option} onClick={() => handlePick(option)} />
              ))}
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-24">
            <div className="flex h-full w-full max-w-xl flex-col justify-between">
              <H1 className="text-center text-4xl font-bold text-white">Your pick</H1>
              <div className="mt-14 flex flex-wrap justify-center gap-10">
                <GameOption type={userPick} />
              </div>
            </div>

            {result && (
              <div className="mt-4 flex w-full max-w-lg flex-col">
                <H1
                  className={`text-center text-4xl font-bold ${result === RESULT_WIN ? "text-green-500" : result === RESULT_LOSE ? "text-red-500" : "text-orange-500"}`}>
                  {opponentPick ? RESULT_GAME[result] : "Waiting opponent"}
                </H1>
                {opponentPick && (
                  <Button className="mt-6 text-lg" onClick={handleReset}>
                    Play again
                  </Button>
                )}
              </div>
            )}

            <div className="flex h-full w-full max-w-xl flex-col justify-between">
              <H1 className="text-center text-4xl font-bold text-white">
                {type === "single" ? "Computer picked" : "Opponent picked"}
              </H1>
              <div className="mt-14 flex flex-wrap justify-center gap-10">
                <GameOption type={type === "single" ? computerPick : opponentPick ?? "no-access"} />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Game

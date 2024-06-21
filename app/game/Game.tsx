'use client'

import React, { useEffect, useState } from 'react'

import { Bot, User } from 'lucide-react';
import { useRouter } from 'next/navigation';
import useLocalStorageState from 'use-local-storage-state';

import GameOption from '@/components/game-option';
import { Button } from '@/components/ui/button';
import { H1 } from '@/components/ui/typography';
import { determineWinner } from '@/lib/helpers/determineWinner';
import RoomService from '@/lib/services/RoomService';
import { getRandomNumber } from '@/lib/utils';
import { GameResult, OptionType, OptionsTypes } from '@/types/TGameOptions';

const Game = () => {
  const [computerPick, setComputerPick] = useState<OptionType>(OptionsTypes[getRandomNumber(3)]);
  const [userPick, setUserPick] = useState<OptionType | null>(null);
  const [result, setResult] = useState<GameResult | null>(null)
  const router = useRouter()
  const [username] = useLocalStorageState<string>("username");

  useEffect(() => {
    if (userPick && computerPick) {
      const result = determineWinner(userPick, computerPick)

      setResult(result)
    }
  }, [userPick, computerPick])

  const handleReset = () => {
    setUserPick(null);
    setComputerPick(OptionsTypes[getRandomNumber(3)])
    setResult(null)
  }

  return (
    <div className="flex justify-center items-center flex-col mt-6 pb-6">
      <div className="border-white border px-10 py-4 rounded-md">
        <div className='flex gap-6 flex-col items-center sm:items-start sm:flex-row'>
          <Button onClick={() => RoomService.createRoom(router, username)}>Create room</Button>
          <H1 className='flex'>
            <User className="w-10 h-10 mr-2" />
            You
          </H1>
          <h1 className="text-white text-4xl font-bold text-center flex items-center">
            VS
          </h1>
          <H1 className='flex'>
            <Bot className="w-10 h-10 mr-2" />
            Computer
          </H1>
        </div>
      </div>

      <div className="mt-14 flex flex-col sm:flex-row gap-20">
        {userPick === null ? (
          <div className="flex flex-col justify-center items-center max-w-xl">
            <H1>Take your pick</H1>
            <div className="flex mt-14 flex-wrap max-w-xl justify-center gap-10">
              {OptionsTypes.map((option) => (
                <GameOption key={option} type={option} onClick={() => setUserPick(option)} />
              ))}
            </div>
          </div>
        ) : (
          <div className='flex gap-24 items-center'>
            <div className='max-w-xl w-full flex flex-col justify-between h-full'>
              <H1 className="text-white text-4xl font-bold text-center">Your pick</H1>
              <div className="flex mt-14 flex-wrap justify-center gap-10">
                <GameOption type={userPick} />
              </div>
            </div>

            {result && (
              <div className="flex flex-col mt-4 max-w-lg w-full">
                <H1 className={`text-4xl font-bold text-center ${result === 'win' ? 'text-green-500' : result === 'lose' ? 'text-red-500' : 'text-orange-500'}`}>
                  {result === 'win' ? 'You Win!' : result === 'lose' ? 'You Lose!' : "It's a Draw!"}
                </H1>
                <Button className="mt-6 text-lg" onClick={handleReset}>
                  Play again
                </Button>
              </div>
            )}

            <div className='max-w-xl w-full flex flex-col justify-between h-full'>
              <H1 className="text-white text-4xl font-bold text-center">Computer picked</H1>
              <div className="flex mt-14 flex-wrap justify-center gap-10">
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
'use client'

import React, { useEffect, useState } from 'react'

import { Bot, User } from 'lucide-react';

import GameOption from '@/components/GameOption';
import { Button } from '@/components/ui/button';
import { determineWinner } from '@/lib/helpers/determineWinner';
import { getRandomNumber } from '@/lib/utils';
import { GameResult, OptionType, OptionsTypes } from '@/types/TGameOptions';

const Game = () => {
  const [computerPick, setComputerPick] = useState<OptionType>(OptionsTypes[getRandomNumber(3)]);
  const [userPick, setUserPick] = useState<OptionType | null>(null);
  const [result, setResult] = useState<GameResult | null>(null)

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
          <h1 className="text-white text-4xl font-bold text-center flex items-center">
            <User className="w-10 h-10 mr-2" />
            You
          </h1>
          <h1 className="text-white text-4xl font-bold text-center flex items-center">
            VS
          </h1>
          <h1 className="text-white text-4xl font-bold text-center flex items-center">
            <Bot className="w-10 h-10 mr-2" />
            Computer
          </h1>
        </div>
      </div>

      <div className="mt-14 flex flex-col sm:flex-row gap-20">
        {userPick === null ? (
          <div className="flex flex-col justify-center items-center max-w-xl">
            <h1 className="text-white text-4xl font-bold">Take your pick</h1>
            <div className="flex mt-14 flex-wrap max-w-xl justify-center gap-10">
              {OptionsTypes.map((option) => (
                <GameOption key={option} type={option} onClick={() => setUserPick(option)} />
              ))}
            </div>
          </div>
        ) : (
          <div className='flex gap-24 items-center'>
            <div className='max-w-xl w-full flex flex-col justify-between h-full'>
              <h1 className="text-white text-4xl font-bold text-center">Your pick</h1>
              <div className="flex mt-14 flex-wrap justify-center gap-10">
                <GameOption type={userPick} />
              </div>
            </div>

            {result && (
              <div className="flex flex-col mt-4 max-w-lg w-full">
                <h1 className={`text-4xl font-bold text-center ${result === 'win' ? 'text-green-500' : result === 'lose' ? 'text-red-500' : 'text-orange-500'}`}>
                  {result === 'win' ? 'You Win!' : result === 'lose' ? 'You Lose!' : "It's a Draw!"}
                </h1>
                <Button className="mt-6 text-lg" onClick={handleReset}>
                  Play again
                </Button>
              </div>
            )}

            <div className='max-w-xl w-full flex flex-col justify-between h-full'>
              <h1 className="text-white text-4xl font-bold text-center">Computer picked</h1>
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
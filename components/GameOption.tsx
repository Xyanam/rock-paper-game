import React from 'react'

import Image from 'next/image'

import { OptionType } from '@/types/TGameOptions'

import Paper from '../public/images/paper.png'
import Question from '../public/images/question.png'
import Rock from '../public/images/rock.png'
import Scissors from '../public/images/scissors.png'

interface GameOptionProps {
  type: OptionType
  onClick?: () => void
}

const images = {
  rock: {
    img: Rock,
    color: 'blue'
  },
  paper: {
    img: Paper,
    color: 'orange'
  },
  scissors: {
    img: Scissors,
    color: 'red'
  },
  'no-access': {
    img: Question,
    color: 'white'
  }
}

const GameOption = ({ type, onClick }: GameOptionProps) => {
  const src = images[type]

  if (!src) return;

  return (
    <div className={`w-48 h-48 bg-white rounded-full flex justify-center items-center cursor-pointer border-8 border-${src.color}-500 p-4 hover:bg-white/90 transition-all`} onClick={onClick}>
      <Image src={src.img} alt={type} />
    </div>
  )
}

export default GameOption
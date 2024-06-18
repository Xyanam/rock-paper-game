
import React, { Suspense } from 'react'

import { Metadata } from 'next';

import Game from './Game'

export const metadata: Metadata = {
  title: "Rock, Paper, Scissors VS Computer",
  description:
    "Play the classic game of Rock, Paper, Scissors online! Challenge the computer or invite friends for a duel. Enjoy a seamless and fun gaming experience with our interactive platform.",
}

const GamePage = () => {

  return (
    <Suspense fallback={<h1>Loading...</h1>}>
      <Game />
    </Suspense>
  );
}

export default GamePage;

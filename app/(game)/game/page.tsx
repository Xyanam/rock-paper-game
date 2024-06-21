import React, { Suspense } from "react"

import Game from "../../../components/game"

const GamePage = () => {
  return (
    <Suspense fallback={<h1>Loading...</h1>}>
      <Game />
    </Suspense>
  )
}

export default GamePage
import React, { Suspense } from "react"

import Game from "../../../components/game"
import Loader from "@/components/loader"
import { GAME_TYPE_SINGLE } from "@/lib/constants/constants"

const GamePage = () => {
  return (
    <Suspense fallback={<Loader />}>
      <Game type={GAME_TYPE_SINGLE} />
    </Suspense>
  )
}

export default GamePage

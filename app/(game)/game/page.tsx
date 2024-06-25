import React, { Suspense } from "react"

import Game from "../../../components/game"
import Loader from "@/components/loader"

const GamePage = () => {
  return (
    <Suspense fallback={<Loader />}>
      <Game type="single" />
    </Suspense>
  )
}

export default GamePage

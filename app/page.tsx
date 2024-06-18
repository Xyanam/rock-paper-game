import Image from "next/image"
import Link from "next/link"

import { Button } from "@/components/ui/button"

import rockPaperImage from "../public/images/rock-background.png"

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen-without-header px-10 pb-5">
      <div className="flex max-w-6xl flex-wrap items-center justify-center md:flex-nowrap lg:flex-row flex-col lg:gap-0 gap-5 mt-10 lg:mt-0">
        <div className="flex flex-col gap-4">
          <h1 className="max-w-2xl md:text-7xl text-4xl font-bold text-white">
            Rock, Paper, Scissors Game
          </h1>
          <p className="max-w-xl text-xl text-gray-300">
            Play against the computer or challenge your friends to a duel!
          </p>
          <div className="mt-4 flex gap-4">
            <Button
              variant="outline"
              className="px-7 py-6 text-base font-semibold">
              Rules
            </Button>
            <Link href='/game'>
              <Button className="px-7 py-6 text-base font-semibold">
                Start for free
              </Button>
            </Link>
          </div>
        </div>
        <div>
          <Image src={rockPaperImage} alt="rock-paper" />
        </div>
      </div>
    </main>
  )
}

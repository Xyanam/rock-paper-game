import { ArrowRight } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

import { Button } from "@/components/ui/button"

import rockPaperImage from "../public/images/rock-background.png"

export default function Home() {
  return (
    <main className="flex min-h-screen-without-header flex-col items-center justify-center px-10 pb-5">
      <div className="mt-10 flex max-w-6xl flex-col flex-wrap items-center justify-center gap-5 md:flex-nowrap lg:mt-0 lg:flex-row lg:gap-0">
        <div className="flex flex-col gap-4">
          <h1 className="max-w-2xl text-4xl font-bold text-white md:text-7xl">
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
            <Link href="/game">
              <Button className="flex gap-2 px-7 py-6 text-base font-semibold">
                Start now <ArrowRight className="h-4 w-4" />
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

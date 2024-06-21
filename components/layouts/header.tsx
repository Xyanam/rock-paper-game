import React from "react"

import Link from "next/link"

import { Button } from "../ui/button"

const Header = () => {
  return (
    <header className="w-full px-10 py-4">
      <nav className="flex flex-col items-center justify-between gap-4 sm:flex-row sm:gap-0">
        <Link href="/">
          <h1 className="text-3xl font-bold text-white">Rock, Paper, Scissors</h1>
        </Link>
        <ul className="flex flex-col gap-4 text-white sm:flex-row">
          <li>
            <Link href="/game">
              <Button>Play with Computer</Button>
            </Link>
          </li>
          <li>
            <Link href="/rooms">
              <Button>Play with Friends</Button>
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  )
}

export default Header

import React from "react"

import Link from "next/link"

import { Button } from "../ui/button"

const Header = () => {
  return (
    <header className="w-full px-10 py-4">
      <nav className="flex items-center justify-between">
        <Link href="/">
          <h1 className="text-3xl font-bold text-white">
            Rock, Paper, Scissors
          </h1>
        </Link>
        <ul className="flex gap-4 text-white">
          <li>
            <Link href='/game'>
              <Button>Play with Computer</Button>
            </Link>
          </li>
          <li>
            <Button>Play with Friends</Button>
          </li>
        </ul>
      </nav>
    </header>
  )
}

export default Header

"use client"

import { useState } from "react"

import toast from "react-hot-toast"
import useLocalStorageState from "use-local-storage-state"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function GameLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const [username, setUsername] = useLocalStorageState<string>("username")
  const [name, setName] = useState("")

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (name.length) return setUsername(name)

    return toast.error("Enter your name")
  }

  if (!username) {
    return (
      <div className="mx-auto mt-20 flex max-w-xl flex-col gap-4 rounded-md border border-white p-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Enter your name</h1>
          <p className="text-sm text-gray-200">
            Enter a name that will be saved for all future games
          </p>
        </div>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <Input
            placeholder="John"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Button type="submit">Submit</Button>
        </form>
      </div>
    )
  }

  return <div>{children}</div>
}

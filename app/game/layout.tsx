"use client"

import { useState } from "react";

import useLocalStorageState from "use-local-storage-state";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function GameLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const [username, setUsername] = useLocalStorageState<string>("username");
  const [name, setName] = useState('')

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setUsername(name)
  }

  if (!username) {
    return (
      <div className="max-w-xl border border-white rounded-md p-4 mx-auto flex flex-col gap-4 mt-20">
        <div>
          <h1 className="text-2xl text-white font-bold">Enter your name</h1>
          <p className="text-sm text-gray-200">Enter a name that will be saved for all future games</p>
        </div>
        <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
          <Input placeholder='John' value={name} onChange={(e) => setName(e.target.value)} />
          <Button type="submit">Submit</Button>
        </form>
      </div>
    )
  }

  return (
    <div>
      {children}
    </div>
  )
}

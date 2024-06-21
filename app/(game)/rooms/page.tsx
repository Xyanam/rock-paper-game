"use client"

import React, { Suspense, useEffect, useState } from "react"

import Rooms from "@/components/rooms"
import { H1 } from "@/components/ui/typography"
import RoomsService from "@/lib/services/RoomsService"
import { IRoom } from "@/types/IRoom"

const RoomPage = () => {
  const [allRooms, setAllRooms] = useState<IRoom[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const handleRoomsUpdate = (rooms: IRoom[]) => {
      setAllRooms(rooms)
      setIsLoading(false)
    }

    RoomsService.getAllRooms(handleRoomsUpdate)

    const interval: NodeJS.Timeout = setInterval(() => {
      RoomsService.removeEmptyRooms()
    }, 40000)

    return () => clearInterval(interval)
  }, [])

  if (isLoading) return <H1>Loading...</H1>

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <Suspense fallback={<h1>Loading..</h1>}>
        <Rooms allRooms={allRooms} />
      </Suspense>
    </div>
  )
}

export default RoomPage

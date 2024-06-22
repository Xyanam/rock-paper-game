"use client"

import React, { Suspense, useEffect, useState } from "react"

import Rooms from "@/components/rooms"
import RoomsService from "@/lib/services/RoomsService"
import { IRoom } from "@/types/IRoom"
import Loader from "@/components/loader"

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

  if (isLoading) return <Loader />

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <Suspense fallback={<Loader />}>
        <Rooms allRooms={allRooms} />
      </Suspense>
    </div>
  )
}

export default RoomPage

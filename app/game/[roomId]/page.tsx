'use client'

import React, { useEffect, useState } from 'react'

import { XIcon } from 'lucide-react'
import { useParams, useRouter } from 'next/navigation'

import { Button } from '@/components/ui/button'
import { H1 } from '@/components/ui/typography'
import RoomService from '@/lib/services/RoomService'
import { IRoom } from '@/types/IRoom'

const Room = () => {
  const router = useRouter()
  const params = useParams<{ roomId: string }>()
  const [isLoading, setIsLoading] = useState(true)
  const [roomData, setRoomData] = useState<IRoom | null>(null)

  useEffect(() => {
    RoomService.getRoomData(params.roomId, router).then(resp => {
      setIsLoading(false)
      if (resp) setRoomData(resp)
    })
  }, [params.roomId, router])

  if (isLoading) return <H1>Loading...</H1>

  return (
    <div className='flex justify-center items-center flex-col'>
      <H1>Room #{roomData?.room_id.slice(0, 7)} </H1>
      <div className='border-white border p-4 rounded-md flex flex-col gap-6 max-w-md w-full mt-6'>
        <div className='text-white flex justify-between items-center'>
          <p className='text-xl'>Player 1</p>
          <Button size='icon' variant='destructive'><XIcon className='text-white cursor-pointer' /></Button>
        </div>
        <div className='text-white flex justify-between items-center'>
          <p className='text-xl'>Player 2</p>
          <Button size='icon' variant='destructive' ><XIcon className='text-white cursor-pointer' /></Button>
        </div>
        <Button>Start game</Button>
      </div>
    </div>
  )
}

export default Room
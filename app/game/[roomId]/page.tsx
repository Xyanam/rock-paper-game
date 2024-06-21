'use client'

import React, { useEffect, useState } from 'react'

import { XIcon } from 'lucide-react'
import { useParams, useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
import useLocalStorageState from 'use-local-storage-state'

import { Button } from '@/components/ui/button'
import { H1 } from '@/components/ui/typography'
import RoomService from '@/lib/services/RoomService'
import { IRoom } from '@/types/IRoom'

const Room = () => {
  const params = useParams<{ roomId: string }>()
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)
  const [roomData, setRoomData] = useState<IRoom | null>(null)
  const [username] = useLocalStorageState<string>("username");

  useEffect(() => {
    const handleRoomData = (data: IRoom) => {
      setRoomData(data);
      setIsLoading(false);

      if (username) {
        const isPlayerInRoom = data.players && data.players[username];
        const isRoomFull = data.players && Object.keys(data.players).length >= data.maxPlayers;

        if (isPlayerInRoom) return
        else if (!isRoomFull) RoomService.joinRoom(data.room_id, username);
        else {
          toast.error("Room is full!");
          router.push("/");
        }
      }
    };

    RoomService.getRoomData(params.roomId, handleRoomData);

  }, [params.roomId, username]);

  if (isLoading) return <H1>Loading...</H1>

  return (
    <div className='flex justify-center items-center flex-col'>
      <H1>Room #{roomData?.room_id.slice(0, 7)} </H1>
      <div className='border-white border p-4 rounded-md flex flex-col gap-6 max-w-md w-full mt-6'>
        {roomData && Object.keys(roomData.players).map(player => (
          <div className='text-white flex justify-between items-center' key={player}>
            <p className='text-xl'>{player}</p>
            <Button size='icon' variant='destructive' onClick={() => RoomService.leaveRoom(roomData.room_id, player)}><XIcon className='text-white cursor-pointer' /></Button>
          </div>
        ))}
        <Button>Start game</Button>
      </div>
    </div>
  )
}

export default Room
import React from 'react'

import { XIcon } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { H1 } from '@/components/ui/typography'

const Room = ({ params }: { params: { roomId: string } }) => {

  return (
    <div className='flex justify-center items-center flex-col'>
      <H1>Room #{params.roomId.slice(0, 7)}</H1>
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
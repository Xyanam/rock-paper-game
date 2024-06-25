"use client"

import React, { FormEvent, useState } from "react"
import { Label } from "../label"
import { Input } from "../input"
import { ToggleGroup, ToggleGroupItem } from "../toggle-group"
import { Switch } from "../switch"
import { Button } from "../button"
import useToggleModal from "@/lib/hooks/useToggleModal"
import { IRoomSettings } from "@/types/IRoom"
import toast from "react-hot-toast"

interface CreateRoomProps {
  handleCreateRoom: (settings: IRoomSettings) => Promise<void>
}

const CreateRoom = ({ handleCreateRoom }: CreateRoomProps) => {
  const toggleModal = useToggleModal()

  const [roomName, setRoomName] = useState("")
  const [bestOf, setBestOf] = useState("3")
  const [maxPlayers, setMaxPlayers] = useState("2")
  const [isPrivate, setIsPrivate] = useState(false)
  const [roomPassword, setRoomPassword] = useState("")

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const settings = {
      roomName,
      bestOf,
      maxPlayers,
      isPrivate,
      roomPassword,
    }

    if (!roomName.length) return toast.error("Enter Room Name")
    if (!bestOf.length) return toast.error("Select Best Of Matches")
    if (!maxPlayers.length) return toast.error("Select Max Players")
    if (isPrivate && !roomPassword.length) return toast.error("Enter Room Password")

    handleCreateRoom(settings)
  }

  return (
    <form className="flex flex-col gap-7 px-px py-4 text-white" onSubmit={onSubmit}>
      <Label className="flex flex-col gap-3">
        Room Name*
        <Input
          placeholder="Room Johny"
          value={roomName}
          onChange={(e) => setRoomName(e.target.value)}
        />
      </Label>
      <div className="flex flex-col gap-3">
        <Label>Best of matches</Label>
        <ToggleGroup
          type="single"
          className="justify-start gap-4"
          defaultValue="3"
          value={bestOf}
          onValueChange={setBestOf}>
          <ToggleGroupItem value="1">BO1</ToggleGroupItem>
          <ToggleGroupItem value="2">BO2</ToggleGroupItem>
          <ToggleGroupItem value="3">BO3</ToggleGroupItem>
          <ToggleGroupItem value="5">BO5</ToggleGroupItem>
        </ToggleGroup>
      </div>
      <div className="flex flex-col gap-3">
        <Label>Max Players</Label>
        <ToggleGroup
          type="single"
          className="justify-start gap-4"
          defaultValue="2"
          value={maxPlayers}
          onValueChange={setMaxPlayers}>
          <ToggleGroupItem value="2">2</ToggleGroupItem>
          <ToggleGroupItem value="4" disabled>
            4
          </ToggleGroupItem>
          <ToggleGroupItem value="6" disabled>
            6
          </ToggleGroupItem>
        </ToggleGroup>
      </div>
      <div className="flex items-center space-x-2">
        <Label className="flex flex-col items-center gap-2">
          Private
          <Switch checked={isPrivate} onCheckedChange={setIsPrivate} />
        </Label>
      </div>
      {isPrivate && (
        <div className="flex items-center space-x-2">
          <Label className="flex flex-col gap-3">
            Room Password
            <Input
              placeholder="xxx-xxx"
              type="password"
              value={roomPassword}
              onChange={(e) => setRoomPassword(e.target.value)}
            />
          </Label>
        </div>
      )}
      <div className="flex gap-4">
        <Button type="submit">Create</Button>
        <Button
          variant="outline"
          type="button"
          onClick={() => toggleModal({ type: "createRoom", isOpen: false })}>
          Cancel
        </Button>
      </div>
    </form>
  )
}

export default CreateRoom

export interface IPlayer {
  name: string
  online: boolean
}

export interface IRoom {
  bestOf: string
  isPrivate: boolean
  maxPlayers: string
  players: { [key: string]: IPlayer }
  roomName: string
  roomPassword?: string
  room_id: string
}

export interface IRoomSettings {
  roomName: string
  bestOf: string
  maxPlayers: string
  isPrivate: boolean
  roomPassword?: string
}

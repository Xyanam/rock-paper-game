export interface IPlayer {
  name: string
  online: boolean
}

export interface IRoom {
  bestOf: string
  isPrivate: boolean
  maxPlayers: string
  players: { [key: string]: IPlayer }
  game: {
    status: "waiting"
    playerChoices?: {
      [key: string]: string
    }
    result?: string
  }
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

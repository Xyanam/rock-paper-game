export interface IPlayer {
  name: string
  online: boolean
}

export interface IRoom {
  maxPlayers: number
  players: { [key: string]: IPlayer }
  room_id: string
}

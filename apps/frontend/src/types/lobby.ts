export interface Player {
  id: string;
  role?: string;
}

export interface Lobby {
  id: string;
  players: Player[];
} 
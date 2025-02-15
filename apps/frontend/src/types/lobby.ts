export interface Player {
  userId: number;
  username: string;
  isHost: boolean;
}

export interface Lobby {
  id: string;
  players: Player[];
  status: 'waiting' | 'playing' | 'finished';
  createdAt: string;
  updatedAt: string;
} 
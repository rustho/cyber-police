export interface Player {
  id: string;
  role?: string;
}

export interface Lobby {
  id: string;
  players: Player[];
  gameStarted: boolean;
}

export interface GameState {
  phase: 'lobby' | 'day' | 'night';
  players: Player[];
  round: number;
} 
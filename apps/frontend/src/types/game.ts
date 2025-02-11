export interface Player {
  id: string;
  name: string;
  role?: string;
  isReady?: boolean;
  isHost?: boolean;
}

export interface Lobby {
  id: string;
  players: Player[];
  gameStarted: boolean;
  createdAt: string;
  maxPlayers: number;
  minPlayers: number;
  hostId?: string;
}

export interface GameState {
  phase: GamePhase;
  round: number;
  timeLeft?: number;
  winners?: string[];
}

export type GamePhase = 'lobby' | 'day' | 'night' | 'voting' | 'results'; 
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
  maxPlayers: number;
  gameStarted: boolean;
  createdAt: string;
  minPlayers: number;
  hostId?: string;
}

export interface GameState {
  phase: GamePhase;
  round: number;
  timeLeft?: number;
  winners?: string[];
}

export type GamePhase = "lobby" | "day" | "night" | "voting" | "results";

export interface Message {
  id: string;
  content: string;
  username: string;
  timestamp: string;
}

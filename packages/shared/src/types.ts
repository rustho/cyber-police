export interface Player {
  id: string;
  name: string;
  role?: 'civilian' | 'mafia' | 'detective';
  isAlive: boolean;
}

export interface GameState {
  phase: 'lobby' | 'day' | 'voting' | 'night';
  players: Player[];
  round: number;
  messages: GameMessage[];
}

export interface GameMessage {
  id: string;
  type: 'system' | 'chat';
  content: string;
  timestamp: number;
  playerId?: string;
}

export type GameAction = 
  | { type: 'JOIN_GAME'; payload: { name: string } }
  | { type: 'VOTE'; payload: { targetId: string } }
  | { type: 'NIGHT_ACTION'; payload: { targetId: string } }
  | { type: 'SEND_MESSAGE'; payload: { content: string } }; 
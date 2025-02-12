import { create } from 'zustand';
import { GameState, Player, GameMessage } from '@cyber-police/shared';

interface GameStore extends GameState {
  connect: () => void;
  disconnect: () => void;
  joinGame: (name: string) => void;
  vote: (targetId: string) => void;
  sendMessage: (content: string) => void;
}

const initialState: GameState = {
  phase: 'lobby',
  players: [],
  round: 0,
  messages: []
};

export const useGameStore = create<GameStore>((set, get) => ({
  ...initialState,

  connect: () => {
    // TODO: Implement socket connection
  },

  disconnect: () => {
    // TODO: Implement socket disconnection
  },

  joinGame: (name: string) => {
    // TODO: Implement join game logic
  },

  vote: (targetId: string) => {
    // TODO: Implement voting logic
  },

  sendMessage: (content: string) => {
    // TODO: Implement message sending
  }
})); 
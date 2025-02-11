"use client";

import { Lobby, Player } from "./game";
export interface ServerToClientEvents {
  updateLobby: (lobbies: Record<string, Lobby>) => void;
  gameStarted: (data: GameStartData) => void;
  error: (error: ErrorData) => void;
  playerJoined: (data: PlayerJoinedData) => void;
  playerLeft: (data: PlayerLeftData) => void;
}

export interface ClientToServerEvents {
  createLobby: (lobbyId: string) => void;
  joinLobby: (lobbyId: string) => void;
  leaveLobby: (lobbyId: string) => void;
  startGame: (lobbyId: string) => void;
}

export interface GameStartData {
  lobbyId: string;
  role: string;
  players: Player[];
}

export interface ErrorData {
  code: string;
  message: string;
}

export interface PlayerJoinedData {
  lobbyId: string;
  player: Player;
}

export interface PlayerLeftData {
  lobbyId: string;
  playerId: string;
}

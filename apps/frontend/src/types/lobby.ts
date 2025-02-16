import { LobbyResponse } from "@cyber-police/shared/src/generate-types";

export interface Player {
  userId: number;
  username: string;
  isHost: boolean;
}

export interface Lobby extends LobbyResponse {}

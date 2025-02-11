import { Lobby } from "./game"; // or wherever your Lobby type is defined

export interface ApiResponse<T> {
  data: T;
  error?: string;
  status: number;
}

export interface LobbyResponse {
  lobbies: Record<string, Lobby>;
  totalCount: number;
  activeCount: number;
}

export interface CreateLobbyResponse {
  lobbyId: string;
  success: boolean;
}

export interface JoinLobbyResponse {
  success: boolean;
  error?: string;
  playerId?: string;
}

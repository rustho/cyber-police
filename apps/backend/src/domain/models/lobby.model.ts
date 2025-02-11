export interface Player {
  id: string;
  role?: "citizen" | "mafia" | "detective";
}

export interface Lobby {
  id: string;
  players: Player[];
  gameStarted: boolean;
}

export interface LobbyConfig {
  maxPlayers: number;
  minPlayers: number;
}

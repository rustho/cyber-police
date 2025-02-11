import { Injectable } from "@nestjs/common";
import { Lobby, Player, LobbyConfig } from "../models/lobby.model";

@Injectable()
export class LobbyManager {
  private lobbies: Record<string, Lobby> = {};
  private readonly config: LobbyConfig = {
    maxPlayers: 8,
    minPlayers: 3,
  };

  create(lobbyId: string, playerId: string): Lobby {
    if (this.lobbies[lobbyId]) {
      throw new Error("Lobby already exists");
    }

    this.lobbies[lobbyId] = {
      id: lobbyId,
      players: [{ id: playerId }],
      gameStarted: false,
    };
    return this.lobbies[lobbyId];
  }

  addPlayer(lobbyId: string, playerId: string): Lobby | null {
    const lobby = this.lobbies[lobbyId];
    if (!this.canJoinLobby(lobby, playerId)) return null;

    lobby.players.push({ id: playerId });
    return lobby;
  }

  removePlayer(playerId: string): void {
    Object.values(this.lobbies).forEach((lobby) => {
      lobby.players = lobby.players.filter((player) => player.id !== playerId);
    });
  }

  getAll(): Record<string, Lobby> {
    return this.lobbies;
  }

  get(lobbyId: string): Lobby | null {
    return this.lobbies[lobbyId] || null;
  }

  private canJoinLobby(lobby: Lobby | null, playerId: string): boolean {
    if (!lobby || lobby.gameStarted) return false;
    if (lobby.players.length >= this.config.maxPlayers) return false;
    if (lobby.players.some((p) => p.id === playerId)) return false;
    return true;
  }
}

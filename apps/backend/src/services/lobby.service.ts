import { Injectable } from "@nestjs/common";
import { LobbyManager } from "../domain/managers/lobby.manager";
import { GameManager } from "../domain/managers/game.manager";
import { Lobby } from "../domain/models/lobby.model";

@Injectable()
export class LobbyService {
  constructor(
    private readonly lobbyManager: LobbyManager,
    private readonly gameManager: GameManager
  ) {}

  createLobby(lobbyId: string, playerId: string): Lobby {
    return this.lobbyManager.create(lobbyId, playerId);
  }

  joinLobby(lobbyId: string, playerId: string): Lobby | null {
    return this.lobbyManager.addPlayer(lobbyId, playerId);
  }

  removePlayerFromLobbies(playerId: string): void {
    this.lobbyManager.removePlayer(playerId);
  }

  getAllLobbies(): Record<string, Lobby> {
    return this.lobbyManager.getAll();
  }

  startGame(lobbyId: string): Lobby | null {
    const lobby = this.lobbyManager.get(lobbyId);
    if (!lobby) return null;

    return this.gameManager.assignRoles(lobby);
  }
}

import { Injectable } from "@nestjs/common";
import { Lobby } from "../models/lobby.model";

@Injectable()
export class GameManager {
  assignRoles(lobby: Lobby): Lobby {
    if (lobby.players.length < 3) return lobby;

    const players = [...lobby.players];
    const roles: ("mafia" | "detective" | "citizen")[] = ["mafia", "detective"];

    while (roles.length < players.length) {
      roles.push("citizen");
    }

    for (let i = roles.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [roles[i], roles[j]] = [roles[j], roles[i]];
    }

    players.forEach((player, index) => {
      player.role = roles[index];
    });

    return { ...lobby, players, gameStarted: true };
  }
}

import { Controller, Get } from "@nestjs/common";
import { LobbyService } from "../services/lobby.service";
import { Lobby } from "../domain/models/lobby.model";

@Controller("api/lobbies")
export class LobbyController {
  constructor(private readonly lobbyService: LobbyService) {}

  @Get()
  getAllLobbies(): Record<string, Lobby> {
    return this.lobbyService.getAllLobbies();
  }
}

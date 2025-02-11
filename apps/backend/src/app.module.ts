import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { AppController } from "./app.controller";
import { AppGateway } from "./app.gateway";
import { LobbyService } from "./services/lobby.service";
import { LobbyManager } from "./domain/managers/lobby.manager";
import { GameManager } from "./domain/managers/game.manager";
import { LobbyController } from "./controllers/lobby.controller";

@Module({
  imports: [ConfigModule.forRoot()],
  controllers: [AppController, LobbyController],
  providers: [AppGateway, LobbyService, LobbyManager, GameManager],
})
export class AppModule {}

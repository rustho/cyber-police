import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { AppController } from "./app.controller";
import { AppGateway } from "./app.gateway";
import { LobbyService } from "./services/lobby.service";
import { LobbyManager } from "./domain/managers/lobby.manager";
import { GameManager } from "./domain/managers/game.manager";
import { LobbyController } from "./controllers/lobby.controller";
import { CtaController } from "./controllers/cta.controller";
import { CtaService } from "./services/cta.service";
import { Subscriber } from "./subscriber/subscriber.entity";

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: "postgres",
        url: configService.get("DATABASE_URL"),
        entities: [Subscriber],
        synchronize: process.env.NODE_ENV !== "production", // Be careful with this in production
        ssl:
          process.env.NODE_ENV === "production"
            ? { rejectUnauthorized: false }
            : false,
      }),
      inject: [ConfigService],
    }),
    TypeOrmModule.forFeature([Subscriber]),
  ],
  controllers: [AppController, LobbyController, CtaController],
  providers: [AppGateway, LobbyService, LobbyManager, GameManager, CtaService],
  exports: [CtaService],
})
export class AppModule {}

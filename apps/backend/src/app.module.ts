import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { AppController } from "./app.controller";
// import { AppGateway } from "./app.gateway";
import { CtaController } from "./controllers/cta.controller";
import { CtaService } from "./services/cta.service";
import { Subscriber } from "./subscriber/subscriber.entity";
import { HealthModule } from "./modules/health/health.module";
import { UserModule } from "./modules/user/user.module";
import { LobbyModule } from "./modules/lobby/lobby.module";
// import { LobbyService } from "./modules/lobby/lobby.service";
import { User } from "./modules/user/user.entity";
import { Lobby } from "./modules/lobby/lobby.entity";
import { JwtStrategy } from "./modules/user/jwt.strategy";

@Module({
  imports: [
    ConfigModule.forRoot(),
    PassportModule.register({ defaultStrategy: "jwt" }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get("JWT_SECRET"),
        signOptions: { expiresIn: "24h" },
      }),
      inject: [ConfigService],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: "postgres",
        url: configService.get("DATABASE_URL"),
        entities: [Subscriber, User, Lobby],
        synchronize: process.env.NODE_ENV !== "production", // Be careful with this in production
        ssl:
          process.env.NODE_ENV === "production"
            ? { rejectUnauthorized: false }
            : false,
      }),
      inject: [ConfigService],
    }),
    TypeOrmModule.forFeature([Subscriber]),
    HealthModule,
    UserModule,
    LobbyModule,
  ],
  controllers: [AppController, CtaController],
  providers: [CtaService, JwtStrategy],
  exports: [CtaService],
})
export class AppModule {}

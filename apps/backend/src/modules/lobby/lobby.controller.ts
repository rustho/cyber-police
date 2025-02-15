import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UseGuards,
  Request,
} from "@nestjs/common";
import { JwtAuthGuard } from "../user/jwt-auth.guard";
import { LobbyService } from "./lobby.service";
import { CreateLobbyDto } from "./dto/create-lobby.dto";

@Controller("lobbies")
@UseGuards(JwtAuthGuard)
export class LobbyController {
  constructor(private readonly lobbyService: LobbyService) {}

  @Post()
  create(
    @Request() req: { user: { userId: number; username: string } },
    @Body() createLobbyDto: CreateLobbyDto
  ) {
    return this.lobbyService.create(createLobbyDto, {
      userId: req.user.userId,
    });
  }

  @Get()
  findAll() {
    return this.lobbyService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.lobbyService.findOne(id);
  }

  @Post(":id/join")
  join(
    @Param("id") id: string,
    @Request() req: { user: { userId: number; username: string } }
  ) {
    return this.lobbyService.join(id, {
      userId: req.user.userId,
    });
  }

  @Post(":id/leave")
  leave(
    @Param("id") id: string,
    @Request() req: { user: { userId: number; username: string } }
  ) {
    return this.lobbyService.leave(id, req.user.userId);
  }
}

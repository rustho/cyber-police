import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UseGuards,
  Request,
  HttpStatus,
} from "@nestjs/common";
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiParam,
} from "@nestjs/swagger";
import { JwtAuthGuard } from "../user/jwt-auth.guard";
import { LobbyService } from "./lobby.service";
import { CreateLobbyDto, LobbyResponseDto } from "./dto/create-lobby.dto";

@ApiTags("Lobbies")
@ApiBearerAuth()
@Controller("lobbies")
@UseGuards(JwtAuthGuard)
export class LobbyController {
  constructor(private readonly lobbyService: LobbyService) {}

  @Post()
  @ApiOperation({ summary: "Create a new lobby" })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: "The lobby has been successfully created.",
    type: LobbyResponseDto,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: "Invalid input data.",
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: "User is not authorized.",
  })
  create(
    @Request() req: { user: { userId: number; username: string } },
    @Body() createLobbyDto: CreateLobbyDto
  ) {
    return this.lobbyService.create(createLobbyDto, {
      userId: req.user.userId,
    });
  }

  @Get()
  @ApiOperation({ summary: "Get all lobbies" })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "Return all available lobbies",
    type: [LobbyResponseDto],
  })
  findAll() {
    return this.lobbyService.findAll();
  }

  @Get(":id")
  @ApiOperation({ summary: "Get a specific lobby" })
  @ApiParam({ name: "id", description: "Lobby identifier" })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "Return the lobby",
    type: LobbyResponseDto,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: "Lobby not found",
  })
  findOne(@Param("id") id: string) {
    return this.lobbyService.findOne(id);
  }

  @Post(":id/join")
  @ApiOperation({ summary: "Join a lobby" })
  @ApiParam({ name: "id", description: "Lobby identifier" })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "Successfully joined the lobby",
    type: LobbyResponseDto,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: "Lobby not found",
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: "Lobby is full or game has already started",
  })
  join(
    @Param("id") id: string,
    @Request() req: { user: { userId: number; username: string } }
  ) {
    return this.lobbyService.join(id, {
      userId: req.user.userId,
    });
  }

  @Post(":id/leave")
  @ApiOperation({ summary: "Leave a lobby" })
  @ApiParam({ name: "id", description: "Lobby identifier" })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "Successfully left the lobby",
    type: LobbyResponseDto,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: "Lobby not found",
  })
  leave(
    @Param("id") id: string,
    @Request() req: { user: { userId: number; username: string } }
  ) {
    return this.lobbyService.leave(id, req.user.userId);
  }
}

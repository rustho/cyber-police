import {
  WebSocketGateway,
  OnGatewayConnection,
  OnGatewayDisconnect,
  WebSocketServer,
  SubscribeMessage,
} from "@nestjs/websockets";
import { Server, Socket } from "socket.io";
import { LobbyService } from "./services/lobby.service";
import { WebSocketLoggerMiddleware } from "./middleware/websocket-logger.middleware";

@WebSocketGateway({
  cors: {
    origin: process.env.FRONTEND_URL || "http://localhost:3000",
    methods: ["GET", "POST"],
  },
})
export class AppGateway implements OnGatewayConnection, OnGatewayDisconnect {
  private readonly logger = new WebSocketLoggerMiddleware();

  constructor(private readonly lobbyService: LobbyService) {}

  @WebSocketServer()
  //@ts-ignore
  server: Server;

  afterInit(server: Server) {
    // Apply middleware after server initialization
    server.use((socket: Socket, next) => {
      this.logger.use(socket, next);
    });
  }

  handleConnection(client: Socket) {
    console.log("User connected:", client.id);
  }

  handleDisconnect(client: Socket) {
    console.log("User disconnected:", client.id);
    this.lobbyService.removePlayerFromLobbies(client.id);
    this.server.emit("updateLobby", this.lobbyService.getAllLobbies());
  }

  @SubscribeMessage("createLobby")
  handleCreateLobby(client: Socket, lobbyId: string) {
    const lobby = this.lobbyService.createLobby(lobbyId, client.id);
    client.join(lobbyId);
    this.server.emit("updateLobby", this.lobbyService.getAllLobbies());
  }

  @SubscribeMessage("joinLobby")
  handleJoinLobby(client: Socket, lobbyId: string) {
    try {
      const lobby = this.lobbyService.joinLobby(lobbyId, client.id);
      if (lobby) {
        client.join(lobbyId);
        this.server.to(lobbyId).emit("updateLobby", lobby);
        this.server.emit("updateLobby", this.lobbyService.getAllLobbies());
      } else {
        client.emit("error", "Unable to join lobby");
      }
    } catch (error: any) {
      client.emit("error", error?.message);
    }
  }

  @SubscribeMessage("startGame")
  handleStartGame(client: Socket, lobbyId: string) {
    const lobby = this.lobbyService.startGame(lobbyId);
    if (lobby) {
      // Send individual roles to each player
      lobby.players.forEach((player) => {
        this.server.to(player.id).emit("gameStarted", {
          role: player.role,
          lobbyId: lobby.id,
        });
      });

      // Update lobby state for everyone
      this.server.to(lobbyId).emit("updateLobby", lobby);
    }
  }
}

import { io, Socket } from "socket.io-client";
import { Lobby } from "../types";

interface ServerToClientEvents {
  updateLobby: (lobbies: Record<string, Lobby>) => void;
  gameStarted: (data: { lobbyId: string; role: string }) => void;
}

interface ClientToServerEvents {
  createLobby: (lobbyId: string) => void;
  joinLobby: (lobbyId: string) => void;
  startGame: (lobbyId: string) => void;
}

export class GameSocket {
  private socket: Socket<ServerToClientEvents, ClientToServerEvents>;
  private static instance: GameSocket;

  private constructor() {
    const BACKEND_URL =
      process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5001";

    this.socket = io(BACKEND_URL, {
      autoConnect: false,
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
    });

    this.setupConnectionHandlers();
  }

  static getInstance(): GameSocket {
    if (!GameSocket.instance) {
      GameSocket.instance = new GameSocket();
    }
    return GameSocket.instance;
  }

  private setupConnectionHandlers() {
    this.socket.on("connect", () => {
      console.log("Connected to server with ID:", this.socket.id);
    });

    this.socket.on("disconnect", () => {
      console.log("Disconnected from server");
    });

    this.socket.on("connect_error", (error) => {
      console.error("Connection error:", error);
    });
  }

  connect() {
    if (!this.socket.connected) {
      this.socket.connect();
    }
  }

  disconnect() {
    this.socket.disconnect();
  }

  onLobbyUpdate(callback: (lobbies: Record<string, Lobby>) => void) {
    this.socket.on("updateLobby", callback);
  }

  offLobbyUpdate() {
    this.socket.off("updateLobby");
  }

  isConnected(): boolean {
    return this.socket.connected;
  }

  on<T extends keyof ServerToClientEvents>(
    event: T,
    callback: (data: Parameters<ServerToClientEvents[T]>[0]) => void
  ) {
    this.socket.on(event, callback as any);
  }

  off<T extends keyof ServerToClientEvents>(event: T) {
    this.socket.off(event);
  }
}

export const gameSocket = GameSocket.getInstance();

import { io } from "socket.io-client";

// Get the backend URL from environment variables, fallback to localhost
const BACKEND_URL =
  process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5001";

// Create socket instance
export const socket = io(BACKEND_URL, {
  autoConnect: true,
  reconnection: true,
});

// Add connection event listeners
socket.on("connect", () => {
  console.log("Connected to server with ID:", socket.id);
});

socket.on("disconnect", () => {
  console.log("Disconnected from server");
});

socket.on("connect_error", (error) => {
  console.error("Connection error:", error);
});

// Lobby-related events
export const lobbyEvents = {
  createLobby: (lobbyId: string) => {
    socket.emit("createLobby", lobbyId);
  },

  joinLobby: (lobbyId: string) => {
    socket.emit("joinLobby", lobbyId);
  },

  onLobbyUpdate: (callback: (lobbyData: any) => void) => {
    socket.on("updateLobby", callback);
  },

  offLobbyUpdate: () => {
    socket.off("updateLobby");
  },
};

// Helper function to check connection status
export const isConnected = () => socket.connected;

// Helper function to manually connect/disconnect
export const connectSocket = () => socket.connect();
export const disconnectSocket = () => socket.disconnect();

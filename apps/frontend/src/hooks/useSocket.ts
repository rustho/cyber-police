import { useEffect, useCallback } from "react";
import { gameSocket } from "../api/socket";

export const useSocket = () => {
  const connect = useCallback(() => {
    if (typeof window === "undefined") return;
    gameSocket.connect();
  }, []);

  const disconnect = useCallback(() => {
    gameSocket.disconnect();
  }, []);

  useEffect(() => {
    connect();
    return () => {
      disconnect();
    };
  }, [connect, disconnect]);

  return {
    socket: gameSocket,
    isConnected: gameSocket.isConnected(),
    connect,
    disconnect,
  };
};

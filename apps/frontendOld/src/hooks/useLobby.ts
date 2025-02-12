// TODO: Fix types
// @ts-nocheck

import { useState, useEffect, useCallback } from "react";
import { useSocket } from "./useSocket";
import { gameApi } from "../api/restApi";
import { Lobby, Player } from "../types";

interface UseLobbyOptions {
  autoConnect?: boolean;
  pollInterval?: number;
}

interface UseLobbyState {
  lobbies: Lobby[];
  isLoading: boolean;
  error?: string;
  joiningLobbyId?: string;
  isCreatingLobby: boolean;
  selectedLobby?: Lobby;
  currentPlayer?: Player;
}

interface UseLobbyActions {
  createLobby: () => Promise<string>;
  joinLobby: (lobbyId: string) => Promise<void>;
  leaveLobby: (lobbyId: string) => Promise<void>;
  refreshLobbies: () => Promise<void>;
  selectLobby: (lobbyId: string) => void;
  clearError: () => void;
}

interface ErrorData {
  message: string;
}

export const useLobby = (
  options: UseLobbyOptions = {}
): [UseLobbyState, UseLobbyActions] => {
  const { socket, isConnected } = useSocket();
  const [state, setState] = useState<UseLobbyState>({
    lobbies: [],
    isLoading: true,
    isCreatingLobby: false,
  });

  const setPartialState = (newState: Partial<UseLobbyState>) => {
    setState((prev) => ({ ...prev, ...newState }));
  };

  const handleError = useCallback((error: Error | ErrorData) => {
    const errorMessage = "message" in error ? error.message : error.toString();
    setPartialState({ error: errorMessage });
    console.error("Lobby error:", error);
  }, []);

  const refreshLobbies = useCallback(async () => {
    if (!isConnected) return;

    try {
      setPartialState({ isLoading: true });
      const { data } = await gameApi.getLobbies();
      const activeLobbies = Object.values(data.lobbies).filter(
        (lobby) => !lobby.gameStarted && lobby.players.length < lobby.maxPlayers
      );
      setPartialState({
        lobbies: activeLobbies,
        error: undefined,
        isLoading: false,
      });
    } catch (error) {
      handleError(error as Error);
      setPartialState({ isLoading: false });
    }
  }, [isConnected, handleError]);

  const createLobby = useCallback(async () => {
    if (!isConnected) throw new Error("Not connected to server");

    try {
      setPartialState({ isCreatingLobby: true });
      const { data } = await gameApi.createLobby();
      socket.emit("createLobby", data.lobbyId);
      return data.lobbyId;
    } catch (error) {
      handleError(error as Error);
      throw error;
    } finally {
      setPartialState({ isCreatingLobby: false });
    }
  }, [isConnected, socket, handleError]);

  const joinLobby = useCallback(
    async (lobbyId: string) => {
      if (!isConnected) throw new Error("Not connected to server");

      try {
        setPartialState({ joiningLobbyId: lobbyId });
        const { data } = await gameApi.joinLobby(lobbyId);
        if (!data.success) {
          throw new Error(data.error || "Failed to join lobby");
        }
        socket.emit("joinLobby", lobbyId);
      } catch (error) {
        handleError(error as Error);
        throw error;
      } finally {
        setPartialState({ joiningLobbyId: undefined });
      }
    },
    [isConnected, socket, handleError]
  );

  const leaveLobby = useCallback(
    async (lobbyId: string) => {
      if (!isConnected) return;

      try {
        await gameApi.leaveLobby(lobbyId);
        socket.emit("leaveLobby", lobbyId);
        setPartialState({ selectedLobby: undefined });
      } catch (error) {
        handleError(error as Error);
      }
    },
    [isConnected, socket, handleError]
  );

  const selectLobby = useCallback(
    (lobbyId: string) => {
      const lobby = state.lobbies.find((l) => l.id === lobbyId);
      setPartialState({ selectedLobby: lobby });
    },
    [state.lobbies]
  );

  useEffect(() => {
    if (!isConnected) return;

    socket.on("updateLobby", (lobbyData) => {
      const activeLobbies = Object.values(lobbyData).filter(
        (lobby) => !lobby.gameStarted && lobby.players.length < lobby.maxPlayers
      );
      setPartialState({ lobbies: activeLobbies });
    });

    socket.on("error", handleError);

    const pollInterval = options.pollInterval || 30000;
    const intervalId = setInterval(refreshLobbies, pollInterval);

    refreshLobbies();

    return () => {
      socket.off("updateLobby");
      socket.off("error");
      clearInterval(intervalId);
    };
  }, [isConnected, socket, options.pollInterval, refreshLobbies, handleError]);

  const actions: UseLobbyActions = {
    createLobby,
    joinLobby,
    leaveLobby,
    refreshLobbies,
    selectLobby,
    clearError: () => setPartialState({ error: undefined }),
  };

  return [state, actions];
};

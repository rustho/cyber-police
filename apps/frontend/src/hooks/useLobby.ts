import { useState, useEffect, useCallback } from "react";
import { gameSocket } from "../api/socket";
import { gameApi } from "../api/restApi";
import { Lobby, Player, ErrorData } from "../types";

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

export const useLobby = (
  options: UseLobbyOptions = {}
): [UseLobbyState, UseLobbyActions] => {
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
  }, [handleError]);

  const createLobby = useCallback(async () => {
    try {
      setPartialState({ isCreatingLobby: true });
      const { data } = await gameApi.createLobby();
      gameSocket.emit("createLobby", data.lobbyId);
      return data.lobbyId;
    } catch (error) {
      handleError(error as Error);
      throw error;
    } finally {
      setPartialState({ isCreatingLobby: false });
    }
  }, [handleError]);

  const joinLobby = useCallback(
    async (lobbyId: string) => {
      try {
        setPartialState({ joiningLobbyId: lobbyId });
        const { data } = await gameApi.joinLobby(lobbyId);
        if (!data.success) {
          throw new Error(data.error || "Failed to join lobby");
        }
        gameSocket.emit("joinLobby", lobbyId);
      } catch (error) {
        handleError(error as Error);
        throw error;
      } finally {
        setPartialState({ joiningLobbyId: undefined });
      }
    },
    [handleError]
  );

  const leaveLobby = useCallback(
    async (lobbyId: string) => {
      try {
        await gameApi.leaveLobby(lobbyId);
        gameSocket.emit("leaveLobby", lobbyId);
        setPartialState({ selectedLobby: undefined });
      } catch (error) {
        handleError(error as Error);
      }
    },
    [handleError]
  );

  const selectLobby = useCallback(
    (lobbyId: string) => {
      const lobby = state.lobbies.find((l) => l.id === lobbyId);
      setPartialState({ selectedLobby: lobby });
    },
    [state.lobbies]
  );

  useEffect(() => {
    if (options.autoConnect) {
      gameSocket.connect();
    }

    gameSocket.on("updateLobby", (lobbyData) => {
      const activeLobbies = Object.values(lobbyData).filter(
        (lobby) => !lobby.gameStarted && lobby.players.length < lobby.maxPlayers
      );
      setPartialState({ lobbies: activeLobbies });
    });

    gameSocket.on("error", handleError);

    const pollInterval = options.pollInterval || 30000; // 30 seconds default
    const intervalId = setInterval(refreshLobbies, pollInterval);

    refreshLobbies();

    return () => {
      gameSocket.off("updateLobby");
      gameSocket.off("error");
      clearInterval(intervalId);
      if (options.autoConnect) {
        gameSocket.disconnect();
      }
    };
  }, [options.autoConnect, options.pollInterval, refreshLobbies, handleError]);

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

// TODO: Fix this
// @ts-nocheck

import { useState, useEffect } from "react";
import { Lobby } from "../types";
import { gameApi } from "../api/restApi";
import { useSocket } from "./useSocket";

export const useLobbyState = () => {
  const [lobbies, setLobbies] = useState<Lobby[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string>();
  const [joiningLobbyId, setJoiningLobbyId] = useState<string>();
  const [isCreatingLobby, setIsCreatingLobby] = useState(false);
  const { socket, isConnected } = useSocket();

  useEffect(() => {
    const fetchLobbies = async () => {
      try {
        const { data } = await gameApi.getLobbies();
        const activeLobbies = Object.values(data.lobbies).filter(
          (lobby): lobby is Lobby =>
            !lobby.gameStarted && lobby.players.length < 8
        );
        setLobbies(activeLobbies);
        setError(undefined);
      } catch (error) {
        console.error("Failed to fetch lobbies:", error);
        setError("Failed to load lobbies");
      } finally {
        setIsLoading(false);
      }
    };

    fetchLobbies();

    if (isConnected) {
      socket.on("updateLobby", (lobbyData) => {
        const activeLobbies = Object.values(lobbyData).filter(
          (lobby): lobby is Lobby =>
            !lobby.gameStarted && lobby.players.length < 8
        );
        setLobbies(activeLobbies);
      });
    }

    return () => {
      if (isConnected) {
        socket.off("updateLobby");
      }
    };
  }, [isConnected, socket]);

  return {
    lobbies,
    isLoading,
    error,
    joiningLobbyId,
    setJoiningLobbyId,
    isCreatingLobby,
    setIsCreatingLobby,
  };
};

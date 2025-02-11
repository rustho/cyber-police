import { useState, useEffect } from 'react';
import { Lobby } from '../types';
import { gameSocket } from '../api/socket';
import { gameApi } from '../api/restApi';

export const useLobbyState = () => {
  const [lobbies, setLobbies] = useState<Lobby[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string>();
  const [joiningLobbyId, setJoiningLobbyId] = useState<string>();
  const [isCreatingLobby, setIsCreatingLobby] = useState(false);

  useEffect(() => {
    const fetchLobbies = async () => {
      try {
        const data = await gameApi.getLobbies();
        const activeLobbies = Object.values(data).filter(
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
    gameSocket.connect();

    gameSocket.onLobbyUpdate((lobbyData) => {
      const activeLobbies = Object.values(lobbyData).filter(
        (lobby): lobby is Lobby =>
          !lobby.gameStarted && lobby.players.length < 8
      );
      setLobbies(activeLobbies);
    });

    return () => {
      gameSocket.offLobbyUpdate();
      gameSocket.disconnect();
    };
  }, []);

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
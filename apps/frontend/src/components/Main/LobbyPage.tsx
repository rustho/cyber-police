"use client";

import { useState, useEffect } from "react";
import { CreateLobbyButton } from "./CreateLobbyButton";
import { LobbyList } from "./LobbyList";
import { Lobby } from "@/types/lobby";
import { useTranslations } from "next-intl";
import { useRouter } from "@/i18n/routing";
import { gameService } from '@/api/services/gameService';

export const LobbyPage = () => {
  const [lobbies, setLobbies] = useState<Lobby[]>([]);
  const [isCreating, setIsCreating] = useState(false);
  const [joiningLobbyId, setJoiningLobbyId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const t = useTranslations();
  const router = useRouter();

  // Fetch lobbies on component mount and periodically
  useEffect(() => {
    fetchLobbies();
    const interval = setInterval(fetchLobbies, 5000); // Refresh every 5 seconds
    return () => clearInterval(interval);
  }, []);

  const fetchLobbies = async () => {
    try {
      const data = await gameService.getLobbies();
      setLobbies(data);
    } catch (error) {
      console.error("Fetch error:", error);
      setError(error instanceof Error ? error.message : "Failed to fetch lobbies");
    }
  };

  const handleCreateLobby = async () => {
    setIsCreating(true);
    setError(null);

    try {
      const data = await gameService.createLobby({
        name: "My Lobby",
        maxPlayers: 10,
      });
      router.push(`/game/${data.id}`);
      await fetchLobbies();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to create lobby");
    } finally {
      setIsCreating(false);
    }
  };

  const handleJoinLobby = async (lobbyId: string) => {
    setJoiningLobbyId(lobbyId);
    setError(null);

    try {
      await gameService.joinLobby(lobbyId);
      router.push(`/game/${lobbyId}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to join lobby");
    } finally {
      setJoiningLobbyId(null);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">{t("lobby.availableRooms")}</h1>
          <CreateLobbyButton
            onCreateLobby={handleCreateLobby}
            isCreating={isCreating}
          />
        </div>

        {error && (
          <div className="bg-red-500/20 border border-red-500 text-red-200 p-4 rounded-lg mb-6">
            {error}
          </div>
        )}

        <LobbyList
          lobbies={lobbies}
          joiningLobbyId={joiningLobbyId}
          onJoinLobby={handleJoinLobby}
        />
      </div>
    </div>
  );
};

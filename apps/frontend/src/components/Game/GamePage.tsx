"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { useRouter } from "@/i18n/routing";
import { Lobby, Player } from "@/types/lobby";
import { PlayerList } from "./PlayerList";
import { GameChat } from "./GameChat";
import { gameService } from "@/api/services/gameService";
import { LobbyResponse } from "@cyber-police/shared/src/generate-types";

export const GamePage = () => {
  const [lobby, setLobby] = useState<LobbyResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const params = useParams();
  const router = useRouter();
  const t = useTranslations();

  useEffect(() => {
    fetchLobbyDetails();
    // Set up polling for lobby updates
    const interval = setInterval(fetchLobbyDetails, 3000);
    return () => clearInterval(interval);
  }, [params.id]);

  const fetchLobbyDetails = async () => {
    try {
      const data = await gameService.getLobby(params.id as string);
      setLobby(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  const handleLeaveLobby = async () => {
    try {
      await gameService.leaveLobby(params.id as string);
      router.push("/main");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to leave lobby");
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
        <div className="text-xl">{t("game.loading")}</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-900 text-white p-6">
        <div className="max-w-4xl mx-auto">
          <div className="bg-red-500/20 border border-red-500 text-red-200 p-4 rounded-lg">
            {error}
          </div>
          <button
            onClick={() => router.push("/main")}
            className="mt-4 px-4 py-2 bg-blue-600 rounded-lg hover:bg-blue-500"
          >
            {t("game.backToLobby")}
          </button>
        </div>
      </div>
    );
  }

  if (!lobby) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">
              {t("game.roomTitle", { id: lobby.id })}
            </h1>
            <p className="text-gray-400">
              {t("game.playerCount", {
                current: lobby.players.length,
                max: 8,
              })}
            </p>
          </div>
          <button
            onClick={handleLeaveLobby}
            className="px-4 py-2 bg-red-600 rounded-lg hover:bg-red-500 
              transition-colors"
          >
            {t("game.leaveLobby")}
          </button>
        </div>

        {/* Main Game Area */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Player List */}
          <div className="lg:col-span-1">
            <PlayerList players={lobby.players as unknown as Player[]} />
          </div>

          {/* Game/Chat Area */}
          <div className="lg:col-span-2">
            <GameChat lobbyId={lobby.id} />
          </div>
        </div>
      </div>
    </div>
  );
};

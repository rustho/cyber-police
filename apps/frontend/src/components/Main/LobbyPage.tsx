"use client";

import { useState, useEffect } from "react";
import { CreateLobbyButton } from "./CreateLobbyButton";
import { LobbyList } from "./LobbyList";
import { Lobby } from "@/types/lobby";
import { useTranslations } from "next-intl";
import { useRouter } from "@/i18n/routing";

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
      const token = localStorage.getItem("token");
      console.log("Token being sent:", token);

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/lobbies`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        console.error("Response status:", response.status);
        console.error("Response headers:", response.headers);
        const text = await response.text();
        console.error("Response body:", text);
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setLobbies(data);
    } catch (error) {
      console.error("Fetch error:", error);
      setError(
        error instanceof Error ? error.message : "Failed to fetch lobbies"
      );
    }
  };

  const handleCreateLobby = async () => {
    setIsCreating(true);
    setError(null);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/lobbies`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({
            name: "My Lobby",
            maxPlayers: 10,
          }),
        }
      );

      if (!response.ok) throw new Error("Failed to create lobby");
      const data = await response.json();
      console.log(data);
      router.push(`/game/${data.id}`);

      await fetchLobbies(); // Refresh lobby list
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
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/lobbies/${lobbyId}/join`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (!response.ok) throw new Error("Failed to join lobby");

      router.push(`/game/${lobbyId}`);
      // Handle successful join (e.g., redirect to game room)
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

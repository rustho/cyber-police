import { useEffect } from "react";
import { useRouter } from "next/router";
import { useSocket } from "../hooks/useSocket";
import { useLobbyState } from "../hooks/useLobbyState";

interface Player {
  id: string;
  role?: string;
}

export default function LobbyPage() {
  const router = useRouter();
  const { socket, isConnected } = useSocket();
  const {
    lobbies,
    joiningLobbyId,
    setJoiningLobbyId,
    isCreatingLobby,
    setIsCreatingLobby,
  } = useLobbyState();

  useEffect(() => {
    if (!isConnected) return;

    // Check for join parameter in URL
    const joinId = router.query.join as string;
    if (joinId) {
      joinLobby(joinId);
    }

    socket.on("gameStarted", (data) => {
      router.push(`/game/${data.lobbyId}?role=${data.role}`);
    });

    return () => {
      socket.off("gameStarted");
    };
  }, [router.query.join, isConnected]);

  const createLobby = async () => {
    try {
      setIsCreatingLobby(true);
      const lobbyId = `lobby-${Date.now()}`;
      socket.emit("createLobby", lobbyId);
      setJoiningLobbyId(lobbyId);
    } finally {
      setIsCreatingLobby(false);
    }
  };

  const joinLobby = (lobbyId: string) => {
    setJoiningLobbyId(lobbyId);
    socket.emit("joinLobby", lobbyId);
  };

  const startGame = () => {
    if (joiningLobbyId) {
      socket.emit("startGame", joiningLobbyId);
    }
  };

  const getCurrentLobbyPlayers = () => {
    return lobbies.find((lobby) => lobby.id === joiningLobbyId)?.players || [];
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Game Lobby</h1>
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
        onClick={createLobby}
        disabled={isCreatingLobby}
      >
        {isCreatingLobby ? "Creating..." : "Create Lobby"}
      </button>

      <h2 className="text-xl mt-6 mb-2">Available Rooms</h2>
      <div className="space-y-2">
        {lobbies.map((lobby) => (
          <div
            key={lobby.id}
            className="flex items-center gap-4 p-2 border rounded"
          >
            <span>
              {lobby.id} ({lobby.players.length} players)
            </span>
            <button
              className="bg-green-500 text-white px-3 py-1 rounded"
              onClick={() => joinLobby(lobby.id)}
              disabled={joiningLobbyId === lobby.id}
            >
              {joiningLobbyId === lobby.id ? "Joining..." : "Join"}
            </button>
          </div>
        ))}
      </div>

      {joiningLobbyId && (
        <div className="mt-4 p-4 bg-gray-100 rounded">
          <h3 className="font-semibold">Current Lobby: {joiningLobbyId}</h3>
          <div className="mt-2">
            <p>Players: {getCurrentLobbyPlayers().length}</p>
            {getCurrentLobbyPlayers().length >= 3 && (
              <button
                className="bg-green-500 text-white px-4 py-2 rounded mt-2"
                onClick={startGame}
              >
                Start Game
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

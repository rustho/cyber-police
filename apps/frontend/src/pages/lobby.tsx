import { useEffect, useState } from "react";
import { socket } from "../utils/socket";
import { useRouter } from 'next/router';

interface Player {
  id: string;
  role?: string;
}

interface Lobby {
  id: string;
  players: Player[];
  gameStarted: boolean;
}

export default function LobbyPage() {
  const [lobbies, setLobbies] = useState<Lobby[]>([]);
  const [currentLobby, setCurrentLobby] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    // Check for join parameter in URL
    const joinId = router.query.join as string;
    if (joinId) {
      joinLobby(joinId);
    }

    socket.on("updateLobby", (lobbyData) => {
      setLobbies(Object.values(lobbyData));
    });

    socket.on("gameStarted", (data) => {
      // Redirect to game page with role information
      router.push(`/game/${data.lobbyId}?role=${data.role}`);
    });

    return () => {
      socket.off("updateLobby");
      socket.off("gameStarted");
    };
  }, [router.query.join]);

  const createLobby = () => {
    const lobbyId = `lobby-${Date.now()}`;
    setCurrentLobby(lobbyId);
    socket.emit("createLobby", lobbyId);
  };

  const joinLobby = (lobbyId: string) => {
    setCurrentLobby(lobbyId);
    socket.emit("joinLobby", lobbyId);
  };

  const startGame = () => {
    if (currentLobby) {
      socket.emit("startGame", currentLobby);
    }
  };

  const getCurrentLobbyPlayers = () => {
    return lobbies.find(lobby => lobby.id === currentLobby)?.players || [];
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Game Lobby</h1>
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
        onClick={createLobby}
      >
        Create Lobby
      </button>

      <h2 className="text-xl mt-6 mb-2">Available Rooms</h2>
      <div className="space-y-2">
        {lobbies.map((lobby) => (
          <div
            key={lobby.id}
            className="flex items-center gap-4 p-2 border rounded"
          >
            <span>
              {lobby.id} ({lobby?.players?.length} players)
            </span>
            <button
              className="bg-green-500 text-white px-3 py-1 rounded"
              onClick={() => joinLobby(lobby.id)}
            >
              Join
            </button>
          </div>
        ))}
      </div>

      {currentLobby && (
        <div className="mt-4 p-4 bg-gray-100 rounded">
          <h3 className="font-semibold">Current Lobby: {currentLobby}</h3>
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

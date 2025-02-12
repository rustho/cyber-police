import { useEffect } from "react";
import { useRouter } from 'next/navigation'
import { useSocket } from "@/hooks/useSocket";
import { useLobbyState } from "@/hooks/useLobbyState";
import { LobbyList } from '@/components/Game/LobbyList';
import { CreateLobbyButton } from '@/components/Game/CreateLobbyButton';

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
      
      <CreateLobbyButton 
        onCreateLobby={createLobby}
        isCreating={isCreatingLobby}
      />

      <LobbyList 
        lobbies={lobbies}
        joiningLobbyId={joiningLobbyId}
        onJoinLobby={joinLobby}
      />

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

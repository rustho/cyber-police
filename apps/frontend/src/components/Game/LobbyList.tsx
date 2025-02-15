import { useT } from "@/context/TranslationContext";
import { Lobby } from '@/types/lobby';

interface LobbyListProps {
  lobbies: Lobby[];
  joiningLobbyId: string | null;
  onJoinLobby: (lobbyId: string) => void;
}

export function LobbyList({ lobbies, joiningLobbyId, onJoinLobby }: LobbyListProps) {
  const { t } = useT();

  if (lobbies.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">{t("lobby.noRooms")}</div>
    );
  }

  return (
    <div className="space-y-2">
      <h2 className="text-xl mt-6 mb-2">Available Rooms</h2>
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
            onClick={() => onJoinLobby(lobby.id)}
            disabled={joiningLobbyId === lobby.id}
          >
            {joiningLobbyId === lobby.id ? "Joining..." : "Join"}
          </button>
        </div>
      ))}
    </div>
  );
}

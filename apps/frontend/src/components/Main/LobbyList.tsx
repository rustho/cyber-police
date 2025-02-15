import { Lobby } from "@/types/lobby";
import { useTranslations } from "next-intl";

interface LobbyListProps {
  lobbies: Lobby[];
  joiningLobbyId: string | null;
  onJoinLobby: (lobbyId: string) => void;
}

export function LobbyList({
  lobbies,
  joiningLobbyId,
  onJoinLobby,
}: LobbyListProps) {
  const t = useTranslations();

  if (lobbies.length === 0) {
    return (
      <div className="text-center py-12 bg-gray-800/50 rounded-lg">
        <p className="text-gray-400">{t("lobby.noRooms")}</p>
      </div>
    );
  }

  return (
    <div className="grid gap-4">
      {lobbies.map((lobby) => (
        <div
          key={lobby.id}
          className="bg-gray-800 p-4 rounded-lg flex items-center justify-between
            hover:bg-gray-700 transition-colors"
        >
          <div>
            <h3 className="text-lg font-medium">
              {t("lobby.roomLabel")} #{lobby.id}
            </h3>
            <p className="text-sm text-gray-400">
              {t("lobby.players", { count: lobby.players.length })} / 8
            </p>
          </div>

          <button
            className={`px-6 py-2 rounded-lg transition-all
              ${
                joiningLobbyId === lobby.id
                  ? "bg-gray-600 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-500"
              }`}
            onClick={() => onJoinLobby(lobby.id)}
            disabled={joiningLobbyId === lobby.id}
          >
            {joiningLobbyId === lobby.id ? t("lobby.joining") : t("lobby.join")}
          </button>
        </div>
      ))}
    </div>
  );
}

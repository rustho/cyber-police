import { useTranslation } from "next-i18next";
import { Lobby } from "../../types";
import { LobbyItem } from "./LobbyItem";

interface LobbyListProps {
  lobbies: Lobby[];
  isLoading: boolean;
  error?: string;
  onJoinLobby: (lobbyId: string) => void;
  joiningLobbyId?: string;
}

export const LobbyList = ({
  lobbies,
  isLoading,
  error,
  onJoinLobby,
  joiningLobbyId,
}: LobbyListProps) => {
  const { t } = useTranslation();

  if (isLoading) {
    return (
      <div className="text-center py-8 text-gray-500">{t("lobby.loading")}</div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8 text-red-500">
        {t("errors.loadingRooms", { message: error })}
      </div>
    );
  }

  if (lobbies.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">{t("lobby.noRooms")}</div>
    );
  }

  return (
    <div className="space-y-4">
      {lobbies.map((lobby) => (
        <LobbyItem
          key={lobby.id}
          lobby={lobby}
          onJoin={onJoinLobby}
          isJoining={joiningLobbyId === lobby.id}
        />
      ))}
    </div>
  );
};

import { useT } from "@/context/TranslationContext";

interface CreateLobbyButtonProps {
  onCreateLobby: () => void;
  isCreating: boolean;
}

export function CreateLobbyButton({ onCreateLobby, isCreating }: CreateLobbyButtonProps) {
  const { t } = useT();

  return (
    <button
      className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
      onClick={onCreateLobby}
      disabled={isCreating}
    >
      {isCreating ? t("lobby.creating") : t("lobby.createRoom")}
    </button>
  );
}

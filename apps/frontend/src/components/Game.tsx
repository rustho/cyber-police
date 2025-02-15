import { useEffect } from "react";
import { useSocket } from "../hooks/useSocket";
import { useGameStore } from "../store/gameStore";
import { useT } from "@/context/TranslationContext";

export const Game = () => {
  const { phase, players } = useGameStore();
  const { socket, isConnected } = useSocket();
  const t = useT();

  useEffect(() => {
    if (!isConnected) return;

    // Setup your socket event listeners here
    socket.on("updateLobby", (lobbies) => {
      // Handle lobby updates
    });

    socket.on("gameStarted", (data) => {
      // Handle game start
    });

    return () => {
      socket.off("updateLobby");
      socket.off("gameStarted");
    };
  }, [socket, isConnected]);

  if (phase === "lobby") {
    return <LobbyPhase />;
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4">
      <div className="max-w-6xl mx-auto grid grid-cols-12 gap-4">
        <div className="col-span-8">{/* <GameBoard /> */}</div>
        <div className="col-span-4">
          {/* <PlayerList />
          <ChatBox /> */}
        </div>
      </div>
    </div>
  );
};

const LobbyPhase = () => {
  const joinGame = useGameStore((state) => state.joinGame);
  const t = useT();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg">
        <h1 className="text-3xl text-white mb-6">{t("lobby.title")}</h1>
        <input
          type="text"
          placeholder={t("lobby.namePlaceholder")}
          className="w-full p-2 mb-4 rounded bg-gray-700 text-white"
          onKeyPress={(e) => {
            if (e.key === "Enter") {
              const input = e.target as HTMLInputElement;
              joinGame(input.value);
            }
          }}
        />
      </div>
    </div>
  );
};

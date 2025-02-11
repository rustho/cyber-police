import { Lobby } from "../../types";

interface LobbyItemProps {
  lobby: Lobby;
  onJoin: (lobbyId: string) => void;
  isJoining?: boolean;
}

export const LobbyItem = ({ lobby, onJoin, isJoining = false }: LobbyItemProps) => {
  return (
    <div
      key={lobby.id}
      className="border rounded-lg p-4 flex justify-between items-center hover:bg-gray-50 transition-colors"
    >
      <div>
        <h3 className="font-medium">Room #{lobby.id}</h3>
        <p className="text-sm text-gray-500">
          Players: {lobby.players.length}/8
        </p>
      </div>
      <button
        onClick={() => onJoin(lobby.id)}
        disabled={isJoining}
        className={`
          px-4 py-2 rounded-md transition-colors
          ${isJoining 
            ? 'bg-gray-400 cursor-not-allowed' 
            : 'bg-green-500 hover:bg-green-600 text-white'
          }
        `}
      >
        {isJoining ? 'Joining...' : 'Join Game'}
      </button>
    </div>
  );
}; 
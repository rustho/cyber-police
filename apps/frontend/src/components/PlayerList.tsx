import { useGameStore } from '../store/gameStore';

export const PlayerList = () => {
  const players = useGameStore(state => state.players);
  const phase = useGameStore(state => state.phase);

  return (
    <div className="bg-gray-800 p-4 rounded-lg mb-4">
      <h2 className="text-xl mb-4">Players</h2>
      <ul className="space-y-2">
        {players.map(player => (
          <li 
            key={player.id}
            className={`p-2 rounded ${
              player.isAlive ? 'bg-gray-700' : 'bg-red-900 line-through'
            }`}
          >
            {player.name}
            {phase === 'voting' && player.isAlive && (
              <button className="ml-2 px-2 py-1 bg-blue-600 rounded text-sm">
                Vote
              </button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}; 
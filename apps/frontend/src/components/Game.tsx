import { useEffect } from 'react';
import { useGameStore } from '../store/gameStore';

export const Game = () => {
  const { phase, players, messages, connect, disconnect } = useGameStore();

  useEffect(() => {
    connect();
    return () => disconnect();
  }, [connect, disconnect]);

  if (phase === 'lobby') {
    return <LobbyPhase />;
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4">
      <div className="max-w-6xl mx-auto grid grid-cols-12 gap-4">
        <div className="col-span-8">
          <GameBoard />
        </div>
        <div className="col-span-4">
          <PlayerList />
          <ChatBox />
        </div>
      </div>
    </div>
  );
};

const LobbyPhase = () => {
  const joinGame = useGameStore(state => state.joinGame);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg">
        <h1 className="text-3xl text-white mb-6">Cyber Police</h1>
        <input
          type="text"
          placeholder="Enter your name"
          className="w-full p-2 mb-4 rounded bg-gray-700 text-white"
          onKeyPress={(e) => {
            if (e.key === 'Enter') {
              const input = e.target as HTMLInputElement;
              joinGame(input.value);
            }
          }}
        />
      </div>
    </div>
  );
}; 
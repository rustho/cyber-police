// TODO: Fix this
// @ts-nocheck

import { useEffect, useState } from "react";
import { useRouter } from 'next/navigation'
import { useSocket } from "../../hooks/useSocket";

interface Message {
  sender: string;
  message: string;
}

export default function GamePage() {
  const router = useRouter();
  const { id: lobbyId } = router.query;
  const { socket, isConnected } = useSocket();
  const [role, setRole] = useState<string | null>(null);
  const [phase, setPhase] = useState<"waiting" | "day" | "night">("waiting");
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState("");

  useEffect(() => {
    if (!isConnected || !lobbyId) return;

    socket.on("receiveRole", (assignedRole: string) => {
      setRole(assignedRole);
    });

    socket.on("gameStarted", (data: { phase: "waiting" | "day" | "night" }) => {
      setPhase(data.phase);
    });

    socket.on("receiveMessage", (msg: Message) => {
      setMessages((prev) => [...prev, msg]);
    });

    return () => {
      socket.off("receiveRole");
      socket.off("gameStarted");
      socket.off("receiveMessage");
    };
  }, [lobbyId, isConnected, socket]);

  const startGame = () => {
    if (lobbyId && isConnected) {
      socket.emit("startGame", lobbyId);
    }
  };

  const sendMessage = () => {
    if (inputMessage.trim() && lobbyId && isConnected) {
      socket.emit("chatMessage", { lobbyId, message: inputMessage });
      setInputMessage("");
    }
  };

  if (!isConnected) {
    return <div>Connecting to game server...</div>;
  }

  return (
    <div className="p-4">
      <div className="mb-4">
        <h1 className="text-2xl font-bold">Game Phase: {phase}</h1>
        {role && <h2 className="text-xl">Your Role: {role}</h2>}
      </div>

      {phase === "waiting" && (
        <button
          className="bg-green-500 text-white px-4 py-2 rounded"
          onClick={startGame}
        >
          Start Game
        </button>
      )}

      <div className="mt-6">
        <h2 className="text-xl mb-2">Chat</h2>
        <div className="h-64 overflow-y-auto border p-2 mb-2">
          {messages.map((msg, idx) => (
            <p key={idx} className="mb-1">
              <span className="font-bold">{msg.sender}:</span> {msg.message}
            </p>
          ))}
        </div>
        <div className="flex gap-2">
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && sendMessage()}
            className="flex-1 border p-2 rounded"
            placeholder="Type your message..."
          />
          <button
            onClick={sendMessage}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}

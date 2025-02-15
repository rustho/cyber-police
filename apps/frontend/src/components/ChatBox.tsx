import { useState } from "react";
import { useGameStore } from "../store/gameStore";
import { useT } from "@/context/TranslationContext";

export const ChatBox = () => {
  const [message, setMessage] = useState("");
  const messages = useGameStore((state) => state.messages);
  const sendMessage = useGameStore((state) => state.sendMessage);
  const t = useT();

  const handleSend = () => {
    if (message.trim()) {
      sendMessage(message);
      setMessage("");
    }
  };

  return (
    <div className="bg-gray-800 p-4 rounded-lg">
      <h2 className="text-xl mb-4">{t("chat.title")}</h2>
      <div className="h-64 overflow-y-auto mb-4 space-y-2">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`p-2 rounded ${
              msg.type === "system" ? "bg-yellow-900" : "bg-gray-700"
            }`}
          >
            {msg.content}
          </div>
        ))}
      </div>
      <div className="flex gap-2">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="flex-1 p-2 rounded bg-gray-700"
          placeholder={t("chat.inputPlaceholder")}
          onKeyPress={(e) => e.key === "Enter" && handleSend()}
        />
        <button onClick={handleSend} className="px-4 py-2 bg-blue-600 rounded">
          {t("chat.send")}
        </button>
      </div>
    </div>
  );
};

"use client";

import { useState, useEffect, useRef } from "react";
import { useTranslations } from "next-intl";
import { Message } from "@/types/game";
import { mockChat } from "@cyber-police/shared/src/mocks";

interface GameChatProps {
  lobbyId: string;
}

export const GameChat = ({ lobbyId }: GameChatProps) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const chatEndRef = useRef<HTMLDivElement>(null);
  const t = useTranslations();

  useEffect(() => {
    // Scroll to bottom when new messages arrive
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    setMessages(mockChat);
  }, []);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/chat/send`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({
            lobbyId,
            content: newMessage,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to send message");
      }

      setNewMessage("");
    } catch (error) {
      console.error("Failed to send message:", error);
    }
  };

  return (
    <div className="bg-gray-800 rounded-lg p-4 h-[600px] flex flex-col">
      <div className="flex-1 overflow-y-auto mb-4 space-y-2">
        {messages.map((message) => (
          <div key={message.id} className="p-2 bg-gray-700 rounded-lg">
            <div className="flex justify-between text-sm text-gray-400 mb-1">
              <span>{message.username}</span>
              <span>{new Date(message.timestamp).toLocaleTimeString()}</span>
            </div>
            <p className="text-white">{message.content}</p>
          </div>
        ))}
        <div ref={chatEndRef} />
      </div>

      <form onSubmit={handleSendMessage} className="flex gap-2">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder={t("game.chat.placeholder")}
          className="flex-1 px-4 py-2 bg-gray-700 rounded-lg focus:outline-none 
            focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 rounded-lg hover:bg-blue-500 
            transition-colors"
        >
          {t("game.chat.send")}
        </button>
      </form>
    </div>
  );
};

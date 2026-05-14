"use client";

import { useState } from "react";

export default function ChatWidget({ botId }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  async function sendMessage() {
    if (!input.trim()) return;

    const userMessage = {
      role: "user",
      content: input,
    };

    setMessages((prev) => [
      ...prev,
      userMessage,
    ]);

    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",

        headers: {
          "Content-Type":
            "application/json",
        },

        body: JSON.stringify({
          message: input,
          botId,
        }),
      });

      const data = await res.json();

      console.log(data);

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: data.response,
        },
      ]);

      setInput("");
    } catch (error) {
      console.log(error);
    }

    setLoading(false);
  }

  return (
    <div className="flex flex-col h-screen bg-white">
      {/* HEADER */}
      <div className="bg-black text-white p-4 text-lg font-bold">
        AI Assistant
      </div>

      {/* MESSAGES */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`max-w-[80%] p-3 rounded-xl ${
              msg.role === "user"
                ? "ml-auto bg-black text-white"
                : "bg-gray-200 text-black"
            }`}
          >
            {msg.content}
          </div>
        ))}
      </div>

      {/* INPUT */}
      <div className="p-4 border-t flex gap-2">
        <input
          value={input}
          onChange={(e) =>
            setInput(e.target.value)
          }
          placeholder="Type message..."
          className="flex-1 border rounded-xl px-4 py-2 outline-none"
        />

        <button
          onClick={sendMessage}
          disabled={loading}
          className="bg-black text-white px-5 rounded-xl"
        >
          {loading ? "..." : "Send"}
        </button>
      </div>
    </div>
  );
}
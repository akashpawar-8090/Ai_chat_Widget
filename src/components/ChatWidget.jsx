"use client";

import { useState } from "react";

export default function ChatWidget({
  botId,
}) {
  const [messages, setMessages] =
    useState([]);

  const [input, setInput] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  async function sendMessage() {
    if (!input.trim()) return;

    console.log(
      "BOT ID FROM CHAT WIDGET:"
    );

    console.log(botId);

    const userMessage = {
      role: "user",
      content: input,
    };

    setMessages((prev) => [
      ...prev,
      userMessage,
    ]);

    const currentInput = input;

    setInput("");

    setLoading(true);

    try {
      const res = await fetch(
        "/api/chat",
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify({
            botId: botId,
            message: currentInput,
          }),
        }
      );

      const data = await res.json();

      console.log(
        "CHAT API RESPONSE:"
      );

      console.log(data);

      if (!res.ok) {
        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            content:
              data.error ||
              "Something went wrong",
          },
        ]);

        return;
      }

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            data.response,
        },
      ]);
    } catch (error) {
      console.log(error);

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "Server error",
        },
      ]);
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
        {messages.map(
          (msg, index) => (
            <div
              key={index}
              className={`max-w-[80%] p-3 rounded-xl ${
                msg.role ===
                "user"
                  ? "ml-auto bg-black text-white"
                  : "bg-gray-200 text-black"
              }`}
            >
              {msg.content}
            </div>
          )
        )}

        {loading && (
          <div className="bg-gray-200 text-black p-3 rounded-xl w-fit">
            Typing...
          </div>
        )}
      </div>

      {/* INPUT */}
      <div className="p-4 border-t flex gap-2">
        <input
          value={input}
          onChange={(e) =>
            setInput(
              e.target.value
            )
          }
          placeholder="Type message..."
          className="flex-1 border rounded-xl px-4 py-2 outline-none"
          onKeyDown={(e) => {
            if (
              e.key === "Enter"
            ) {
              sendMessage();
            }
          }}
        />

        <button
          onClick={sendMessage}
          disabled={loading}
          className="bg-black text-white px-5 rounded-xl"
        >
          {loading
            ? "..."
            : "Send"}
        </button>
      </div>
    </div>
  );
}
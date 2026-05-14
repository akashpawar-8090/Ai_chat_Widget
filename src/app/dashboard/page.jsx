"use client";

import { useState } from "react";

export default function Dashboard() {
  const [name, setName] =
    useState("");

  const [themeColor, setThemeColor] =
    useState("#000000");

  const [prompt, setPrompt] =
    useState("");

  const [bot, setBot] =
    useState(null);

  const [loading, setLoading] =
    useState(false);

  async function createBot() {
    try {
      setLoading(true);

      const res = await fetch(
        "/api/bots/create",
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify({
            name,
            themeColor,
            systemPrompt: prompt,
          }),
        }
      );

      const data = await res.json();

      console.log(data);

      setBot(data);
    } catch (error) {
      console.log(error);
    }

    setLoading(false);
  }

  const scriptCode = bot
    ? `<script
  src="https://ai-chat-widget-umber.vercel.app/widget.js"
  data-bot-id="${bot._id}"
></script>`
    : "";

  return (
    <div className="min-h-screen bg-gray-100 p-10">
      <div className="max-w-5xl mx-auto">
        {/* HEADER */}
        <h1 className="text-5xl font-bold mb-10">
          AI Bot Dashboard
        </h1>

        {/* CREATE BOT CARD */}
        <div className="bg-white p-8 rounded-3xl shadow-xl">
          <h2 className="text-3xl font-bold mb-6">
            Create Bot
          </h2>

          {/* BOT NAME */}
          <div className="mb-5">
            <label className="block mb-2 font-semibold">
              Bot Name
            </label>

            <input
              type="text"
              placeholder="Support Bot"
              value={name}
              onChange={(e) =>
                setName(e.target.value)
              }
              className="w-full border p-4 rounded-xl outline-none"
            />
          </div>

          {/* THEME COLOR */}
          <div className="mb-5">
            <label className="block mb-2 font-semibold">
              Theme Color
            </label>

            <input
              type="color"
              value={themeColor}
              onChange={(e) =>
                setThemeColor(
                  e.target.value
                )
              }
              className="w-[100px] h-[50px]"
            />
          </div>

          {/* SYSTEM PROMPT */}
          <div className="mb-6">
            <label className="block mb-2 font-semibold">
              System Prompt
            </label>

            <textarea
              placeholder="You are helpful AI assistant..."
              value={prompt}
              onChange={(e) =>
                setPrompt(
                  e.target.value
                )
              }
              className="w-full border p-4 rounded-xl outline-none h-[200px]"
            />
          </div>

          {/* BUTTON */}
          <button
            onClick={createBot}
            disabled={loading}
            className="bg-black text-white px-8 py-4 rounded-xl"
          >
            {loading
              ? "Creating..."
              : "Create Bot"}
          </button>
        </div>

        {/* GENERATED SCRIPT */}
        {bot && (
          <div className="bg-white p-8 rounded-3xl shadow-xl mt-10">
            <h2 className="text-3xl font-bold mb-5">
              Your Embed Script
            </h2>

            <div className="bg-gray-100 p-5 rounded-2xl overflow-auto">
              <pre className="text-sm whitespace-pre-wrap">
                {scriptCode}
              </pre>
            </div>

            {/* COPY BUTTON */}
            <button
              onClick={() => {
                navigator.clipboard.writeText(
                  scriptCode
                );

                alert(
                  "Script copied!"
                );
              }}
              className="mt-5 bg-black text-white px-6 py-3 rounded-xl"
            >
              Copy Script
            </button>

            {/* TEST BOT */}
            <div className="mt-10">
              <h3 className="text-2xl font-bold mb-4">
                Test Chatbot
              </h3>

              <a
                href={`/embed/${bot._id}`}
                target="_blank"
                className="bg-blue-600 text-white px-6 py-3 rounded-xl inline-block"
              >
                Open Chatbot
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
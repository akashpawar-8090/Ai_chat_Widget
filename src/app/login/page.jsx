"use client";

import { useState } from "react";

export default function LoginPage() {
  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  async function login() {
    try {
      setLoading(true);

      const res = await fetch(
        "/api/auth/login",
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify({
            email,
            password,
          }),
        }
      );

      const data = await res.json();

      console.log(data);

      if (res.ok) {
        window.location.href =
          "/dashboard";
      } else {
        alert(data.error);
      }
    } catch (error) {
      console.log(error);
    }

    setLoading(false);
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-[400px] bg-white p-8 rounded-3xl shadow-xl">
        <h1 className="text-4xl font-bold mb-6 text-center">
          Login
        </h1>

        <input
          type="email"
          placeholder="Email"
          className="w-full border p-4 rounded-xl mb-4 outline-none"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full border p-4 rounded-xl mb-6 outline-none"
          value={password}
          onChange={(e) =>
            setPassword(
              e.target.value
            )
          }
        />

        <button
          onClick={login}
          disabled={loading}
          className="w-full bg-black text-white p-4 rounded-xl"
        >
          {loading
            ? "Loading..."
            : "Login"}
        </button>

        <p className="text-center mt-5">
          Create new account?
          <a
            href="/register"
            className="font-bold ml-2"
          >
            Register
          </a>
        </p>
      </div>
    </div>
  );
}
"use client";

import { useState } from "react";

export default function RegisterPage() {
  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  async function register() {
    try {
      setLoading(true);

      const res = await fetch(
        "/api/auth/register",
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
          "/login";
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
          Register
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
          onClick={register}
          disabled={loading}
          className="w-full bg-black text-white p-4 rounded-xl"
        >
          {loading
            ? "Loading..."
            : "Register"}
        </button>

        <p className="text-center mt-5">
          Already have account?
          <a
            href="/login"
            className="font-bold ml-2"
          >
            Login
          </a>
        </p>
      </div>
    </div>
  );
}
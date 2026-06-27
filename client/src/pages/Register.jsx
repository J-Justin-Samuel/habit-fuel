import React, { useState } from "react";

export default function Register({ setAuth, setPage }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Registration failed");

      localStorage.setItem("user", JSON.stringify(data));
      setAuth(data);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div class="max-w-md mx-auto mt-16 p-6 bg-white border border-gray-200 rounded-2xl shadow-xs">
      <h2 class="text-2xl font-bold mb-6 text-center text-gray-800">
        Create Account
      </h2>
      {error && (
        <p class="text-red-500 text-sm mb-4 bg-red-50 p-2 rounded">{error}</p>
      )}
      <form onSubmit={handleSubmit} class="space-y-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">
            Name
          </label>
          <input
            type="text"
            required
            class="w-full border border-gray-300 px-3 py-2 rounded-lg outline-indigo-600 text-sm"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <input
            type="email"
            required
            class="w-full border border-gray-300 px-3 py-2 rounded-lg outline-indigo-600 text-sm"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">
            Password
          </label>
          <input
            type="password"
            required
            class="w-full border border-gray-300 px-3 py-2 rounded-lg outline-indigo-600 text-sm"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button
          type="submit"
          class="w-full bg-indigo-600 text-white py-2.5 rounded-lg text-sm font-semibold hover:bg-indigo-700 transition"
        >
          Sign Up
        </button>
      </form>
      <p class="text-sm text-center text-gray-500 mt-4">
        Already have an account?{" "}
        <button
          onClick={() => setPage("login")}
          class="text-indigo-600 hover:underline"
        >
          Log in
        </button>
      </p>
    </div>
  );
}

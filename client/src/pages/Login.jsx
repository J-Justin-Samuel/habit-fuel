import React, { useState } from "react";

export default function Login({ setAuth, setPage }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Login failed");

      localStorage.setItem("user", JSON.stringify(data));
      setAuth(data);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20 p-8 bg-[#1E1B4B]/80 backdrop-blur-md border border-purple-900/50 rounded-2xl shadow-2xl">
      <h2 className="text-3xl font-black mb-2 text-center text-[#F8FAFC] tracking-tight">
        Welcome Back
      </h2>
      <p className="text-center text-sm text-gray-400 mb-8">
        Sign in to resume your daily routine
      </p>

      {error && (
        <p className="text-red-400 text-sm mb-5 bg-red-500/10 border border-red-500/20 p-3 rounded-xl text-center">
          {error}
        </p>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block text-xs font-bold text-purple-400 uppercase tracking-wider mb-2">
            Email Address
          </label>
          <input
            type="email"
            required
            className="w-full bg-[#0B1120] text-[#F8FAFC] border border-purple-900/60 px-4 py-3 rounded-xl outline-none focus:border-[#A855F7] transition duration-300 text-sm shadow-inner"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label className="block text-xs font-bold text-purple-400 uppercase tracking-wider mb-2">
            Password
          </label>
          <input
            type="password"
            required
            className="w-full bg-[#0B1120] text-[#F8FAFC] border border-purple-900/60 px-4 py-3 rounded-xl outline-none focus:border-[#A855F7] transition duration-300 text-sm shadow-inner"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button
          type="submit"
          className="w-full bg-gradient-to-r from-[#8B5CF6] to-[#A855F7] hover:from-[#7c4ee4] hover:to-[#9944e4] text-[#F8FAFC] py-3.5 rounded-xl text-sm font-bold transition duration-300 shadow-lg shadow-[#8B5CF6]/10 transform active:scale-[0.98]"
        >
          Sign In
        </button>
      </form>

      <p className="text-sm text-center text-gray-400 mt-6">
        Don't have an account?{" "}
        <button
          onClick={() => setPage("register")}
          className="text-[#A855F7] font-semibold hover:underline"
        >
          Register here
        </button>
      </p>
    </div>
  );
}

import React, { useState } from "react";
import { KeyRound, Mail, Sparkles } from "lucide-react";

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
    <div className="max-w-md mx-auto mt-12 sm:mt-20 p-8 bg-white border border-slate-100 rounded-3xl shadow-xl shadow-slate-100/70 relative overflow-hidden">
      <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500" />

      <div className="text-center mb-8">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-800 tracking-tight">
          Welcome Back
        </h2>
        <p className="text-slate-400 text-xs sm:text-sm mt-1.5">
          Sign in to maintain your tracking streaks
        </p>
      </div>

      {error && (
        <div className="text-rose-600 text-xs font-semibold mb-5 bg-rose-50 border border-rose-100 p-3 rounded-xl flex items-center gap-2">
          <span className="w-1.5 h-1.5 bg-rose-500 rounded-full shrink-0" />
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
            Email Address
          </label>
          <div className="relative">
            <Mail className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
            <input
              type="email"
              required
              className="w-full text-sm border border-slate-200 bg-slate-50/50 pl-11 pr-4 py-2.5 rounded-xl focus:bg-white focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 outline-hidden transition-all duration-200"
              placeholder="name@domain.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
            Password
          </label>
          <div className="relative">
            <KeyRound className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
            <input
              type="password"
              required
              className="w-full text-sm border border-slate-200 bg-slate-50/50 pl-11 pr-4 py-2.5 rounded-xl focus:bg-white focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 outline-hidden transition-all duration-200"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 text-white py-3 rounded-xl text-sm font-bold transition-all duration-200 shadow-lg shadow-indigo-100 mt-2 hover:scale-[1.01] habit-press-effect"
        >
          Sign In
        </button>
      </form>

      <div className="text-center mt-6 pt-5 border-t border-slate-100">
        <p className="text-sm text-slate-400">
          New to Habit Fuel?{" "}
          <button
            onClick={() => setPage("register")}
            className="text-indigo-600 hover:text-indigo-700 font-bold hover:underline transition"
          >
            Create an Account
          </button>
        </p>
      </div>
    </div>
  );
}

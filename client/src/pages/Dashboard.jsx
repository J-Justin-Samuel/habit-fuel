import React, { useState, useEffect } from "react";
import HabitItem from "../components/HabitItem";
import { Plus, Target, Sparkles } from "lucide-react";

export default function Dashboard({ user }) {
  const [habits, setHabits] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const getPastDays = () => {
    const days = [];
    for (let i = 6; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      const dateStr = d.toISOString().split("T")[0];
      const dayName = d.toLocaleDateString("en-US", { weekday: "short" });
      const dayNum = d.getDate();
      days.push({ dateStr, dayName, dayNum });
    }
    return days;
  };

  const pastDays = getPastDays();

  const fetchHabits = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/habits", {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      const data = await res.json();
      if (res.ok) setHabits(data);
    } catch (e) {
      console.error("Error fetching habits", e);
    }
  };

  useEffect(() => {
    fetchHabits();
  }, []);

  const handleCreateHabit = async (e) => {
    e.preventDefault();
    if (!name) return;
    const res = await fetch("http://localhost:5000/api/habits", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
      body: JSON.stringify({ name, description }),
    });
    if (res.ok) {
      setName("");
      setDescription("");
      fetchHabits();
    }
  };

  const handleToggleHabit = async (habitId, dateStr) => {
    const res = await fetch(
      `http://localhost:5000/api/habits/${habitId}/toggle`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify({ date: dateStr }),
      },
    );
    if (res.ok) fetchHabits();
  };

  const handleDeleteHabit = async (habitId) => {
    const res = await fetch(`http://localhost:5000/api/habits/${habitId}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${user.token}` },
    });
    if (res.ok) fetchHabits();
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
      {/* Motivating Layout Header Area */}
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-800 tracking-tight flex items-center gap-2">
          <Target className="w-7 h-7 text-indigo-600" /> Track Routines
        </h1>
        <p className="text-slate-500 text-sm mt-1">
          Consistency creates continuous change. Track your last 7 days.
        </p>
      </div>

      {/* Modernized Creation Card Form */}
      <form
        onSubmit={handleCreateHabit}
        className="bg-white border border-slate-200/70 rounded-2xl p-6 shadow-sm mb-10 flex flex-col md:flex-row gap-4 items-end"
      >
        <div className="flex-1 w-full">
          <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
            Habit Identity
          </label>
          <input
            type="text"
            placeholder="E.g., Morning Meditation"
            required
            className="w-full text-sm border border-slate-200 bg-slate-50/50 px-4 py-2.5 rounded-xl focus:bg-white focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 outline-hidden transition-all duration-200 placeholder:text-slate-400 font-medium"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="flex-1 w-full">
          <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
            Target / Description
          </label>
          <input
            type="text"
            placeholder="E.g., 15 minutes clear mindedness"
            className="w-full text-sm border border-slate-200 bg-slate-50/50 px-4 py-2.5 rounded-xl focus:bg-white focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 outline-hidden transition-all duration-200 placeholder:text-slate-400 font-medium"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <button
          type="submit"
          className="w-full md:w-auto bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 text-white px-6 py-2.5 rounded-xl text-sm font-bold flex items-center justify-center space-x-1.5 transition-all duration-200 shadow-md shadow-indigo-100 h-[42px] hover:scale-[1.02] habit-press-effect"
        >
          <Plus className="w-4 h-4" />
          <span>Add Habit</span>
        </button>
      </form>

      {/* Render Lists Container */}
      <div className="space-y-4">
        {habits.length === 0 ? (
          <div className="text-center bg-white border border-dashed border-slate-300/80 rounded-2xl py-16 px-4 shadow-2xs">
            <div className="w-12 h-12 bg-indigo-50 text-indigo-500 rounded-full flex items-center justify-center mx-auto mb-3">
              <Sparkles className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-slate-700 text-base">
              Your Dashboard is clean!
            </h3>
            <p className="text-slate-400 text-sm max-w-xs mx-auto mt-1">
              No daily milestones configured. Fill out the fields above to
              establish goals.
            </p>
          </div>
        ) : (
          habits.map((habit) => (
            <HabitItem
              key={habit._id}
              habit={habit}
              onToggle={handleToggleHabit}
              onDelete={handleDeleteHabit}
              pastDays={pastDays}
            />
          ))
        )}
      </div>
    </div>
  );
}

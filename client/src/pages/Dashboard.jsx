import React, { useState, useEffect } from "react";
import HabitItem from "../components/HabitItem";
import { Plus } from "lucide-react";

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
    const res = await fetch("http://localhost:5000/api/habits", {
      headers: { Authorization: `Bearer ${user.token}` },
    });
    const data = await res.json();
    if (res.ok) setHabits(data);
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
    <div className="max-w-4xl mx-auto px-4 py-10 animate-fade-in">
      {/* Creation form */}
      <form
        onSubmit={handleCreateHabit}
        className="bg-[#1E1B4B]/80 backdrop-blur-md border border-purple-900/40 rounded-2xl p-6 shadow-2xl mb-10 flex flex-col md:flex-row gap-4 items-end"
      >
        <div className="flex-1 w-full">
          <label className="block text-xs font-bold text-purple-400 uppercase tracking-widest mb-2">
            Habit Name
          </label>
          <input
            type="text"
            placeholder="E.g., Workout, Meditation..."
            required
            className="w-full text-sm bg-[#0B1120] text-[#F8FAFC] border border-purple-900/60 px-4 py-3 rounded-xl outline-none focus:border-[#A855F7] transition duration-300 placeholder-gray-500 shadow-inner"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="flex-1 w-full">
          <label className="block text-xs font-bold text-purple-400 uppercase tracking-widest mb-2">
            Description
          </label>
          <input
            type="text"
            placeholder="E.g., 30 mins every morning"
            className="w-full text-sm bg-[#0B1120] text-[#F8FAFC] border border-purple-900/60 px-4 py-3 rounded-xl outline-none focus:border-[#A855F7] transition duration-300 placeholder-gray-500 shadow-inner"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <button
          type="submit"
          className="w-full md:w-auto bg-gradient-to-r from-[#8B5CF6] to-[#A855F7] hover:from-[#7c4ee4] hover:to-[#9944e4] text-[#F8FAFC] px-6 py-3 rounded-xl text-sm font-bold flex items-center justify-center space-x-2 transition-all duration-300 h-11 shadow-lg shadow-[#8B5CF6]/20 active:scale-95"
        >
          <Plus className="w-4 h-4 stroke-[3]" />
          <span>Add Habit</span>
        </button>
      </form>

      {/* Habit List */}
      <div className="space-y-4">
        {habits.length === 0 ? (
          <div className="text-center py-16 bg-[#1E1B4B]/30 border border-dashed border-purple-900/40 rounded-2xl">
            <p className="text-gray-400 font-medium">
              No habits tracked yet. Start building your legacy!
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

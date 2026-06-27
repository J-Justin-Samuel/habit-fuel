import React, { useState, useEffect } from "react";
import HabitItem from "../components/HabitItem";
import { Plus } from "lucide-react";

export default function Dashboard({ user }) {
  const [habits, setHabits] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  // Generate date reference objects for the past 7 days locally
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
    <div class="max-w-4xl mx-auto px-4 py-8">
      {/* Creation form */}
      <form
        onSubmit={handleCreateHabit}
        class="bg-white border border-gray-200 rounded-2xl p-5 shadow-xs mb-8 flex flex-col md:flex-row gap-4 items-end"
      >
        <div class="flex-1 w-full">
          <label class="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">
            Habit Name
          </label>
          <input
            type="text"
            placeholder="E.g., Read books"
            required
            class="w-full text-sm border border-gray-300 px-3 py-2 rounded-lg outline-indigo-600"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div class="flex-1 w-full">
          <label class="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">
            Description
          </label>
          <input
            type="text"
            placeholder="E.g., 20 pages a day"
            class="w-full text-sm border border-gray-300 px-3 py-2 rounded-lg outline-indigo-600"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <button
          type="submit"
          class="w-full md:w-auto bg-indigo-600 text-white px-5 py-2 rounded-lg text-sm font-semibold flex items-center justify-center space-x-1 hover:bg-indigo-700 transition h-9.5"
        >
          <Plus class="w-4 h-4" />
          <span>Add</span>
        </button>
      </form>

      {/* Habit List */}
      <div class="space-y-4">
        {habits.length === 0 ? (
          <p class="text-center text-gray-500 py-12">
            No habits tracked yet. Start creating your routine!
          </p>
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

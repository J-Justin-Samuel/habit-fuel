import React from "react";
import { Trash2, CheckCircle } from "lucide-react";

export default function HabitItem({ habit, onToggle, onDelete, pastDays }) {
  return (
    <div class="bg-white border border-gray-200 rounded-xl p-5 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
      <div>
        <h3 class="font-semibold text-lg text-gray-800">{habit.name}</h3>
        <p class="text-gray-500 text-sm mt-0.5">
          {habit.description || "No description provided"}
        </p>
        <span class="inline-block mt-2 text-xs bg-indigo-50 text-indigo-600 font-medium px-2 py-1 rounded">
          🔥 {habit.history.length} Days Tracked
        </span>
      </div>

      <div class="flex flex-col sm:flex-row sm:items-center gap-4">
        {/* Responsive Grid for last 7 days */}
        <div class="grid grid-cols-7 gap-2">
          {pastDays.map((day) => {
            const isCompleted = habit.history.includes(day.dateStr);
            return (
              <button
                key={day.dateStr}
                onClick={() => onToggle(habit._id, day.dateStr)}
                class={`flex flex-col items-center justify-center p-2 rounded-lg border w-11 transition-all ${
                  isCompleted
                    ? "bg-emerald-50 border-emerald-300 text-emerald-600"
                    : "bg-gray-50 border-gray-200 hover:border-gray-300 text-gray-400"
                }`}
              >
                <span class="text-[10px] font-semibold uppercase">
                  {day.dayName}
                </span>
                <span class="text-xs font-bold">{day.dayNum}</span>
                <CheckCircle
                  class={`w-3.5 h-3.5 mt-1 ${isCompleted ? "opacity-100" : "opacity-20"}`}
                />
              </button>
            );
          })}
        </div>

        <button
          onClick={() => onDelete(habit._id)}
          class="text-gray-400 hover:text-red-500 p-2 rounded-lg hover:bg-gray-50 self-end sm:self-auto transition"
          aria-label="Delete habit"
        >
          <Trash2 class="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}

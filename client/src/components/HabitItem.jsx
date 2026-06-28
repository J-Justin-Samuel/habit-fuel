import React from "react";
import { Trash2, CheckCircle2 } from "lucide-react";

export default function HabitItem({ habit, onToggle, onDelete, pastDays }) {
  return (
    <div className="bg-[#1E1B4B]/80 backdrop-blur-md border border-purple-900/40 rounded-2xl p-6 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6 transition-all duration-300 hover:border-purple-500/30 hover:shadow-purple-500/5">
      <div>
        <h3 className="font-bold text-xl text-[#F8FAFC] tracking-wide">
          {habit.name}
        </h3>
        <p className="text-gray-400 text-sm mt-1">
          {habit.description || "No description provided"}
        </p>
        <span className="inline-flex items-center mt-3 text-xs bg-[#8B5CF6]/10 text-[#A855F7] font-semibold px-3 py-1.5 rounded-full border border-[#8B5CF6]/20">
          🔥 {habit.history.length} Days Tracked
        </span>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center gap-4">
        {/* Responsive Grid for last 7 days */}
        <div className="grid grid-cols-7 gap-2">
          {pastDays.map((day) => {
            const isCompleted = habit.history.includes(day.dateStr);
            return (
              <button
                key={day.dateStr}
                onClick={() => onToggle(habit._id, day.dateStr)}
                className={`flex flex-col items-center justify-center p-2 rounded-xl border w-12 h-16 transition-all duration-300 transform active:scale-95 ${
                  isCompleted
                    ? "bg-[#22C55E]/10 border-[#22C55E] text-[#22C55E] shadow-[0_0_12px_rgba(34,197,94,0.15)]"
                    : "bg-[#0B1120]/60 border-purple-950 hover:border-purple-500/50 text-gray-400 hover:text-gray-200"
                }`}
              >
                <span className="text-[10px] font-bold uppercase tracking-wider opacity-60">
                  {day.dayName}
                </span>
                <span className="text-sm font-black my-0.5">{day.dayNum}</span>
                <CheckCircle2
                  className={`w-4 h-4 transition-all duration-300 ${
                    isCompleted ? "scale-110 opacity-100" : "opacity-30"
                  }`}
                />
              </button>
            );
          })}
        </div>

        <button
          onClick={() => onDelete(habit._id)}
          className="text-gray-500 hover:text-red-400 p-2.5 rounded-xl hover:bg-red-500/10 self-end sm:self-auto transition-all duration-200 active:scale-90"
          aria-label="Delete habit"
        >
          <Trash2 className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}

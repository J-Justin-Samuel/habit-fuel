import React from "react";
import { Trash2, CheckCircle, Flame, CalendarDays } from "lucide-react";

export default function HabitItem({ habit, onToggle, onDelete, pastDays }) {
  const currentStreak = habit.history ? habit.history.length : 0;

  return (
    <div className="bg-white border border-slate-100 rounded-2xl p-5 sm:p-6 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col lg:flex-row lg:items-center justify-between gap-6 group">
      {/* Habit Details Block */}
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between lg:justify-start lg:items-center gap-3">
          <h3 className="font-bold text-lg text-slate-800 tracking-tight truncate">
            {habit.name}
          </h3>
          <span
            className={`inline-flex items-center gap-1 text-xs font-bold px-2.5 py-1 rounded-full border shadow-2xs shrink-0 ${
              currentStreak > 0
                ? "bg-amber-50 text-amber-700 border-amber-200/60 animate-pulse"
                : "bg-slate-50 text-slate-500 border-slate-200/60"
            }`}
          >
            <Flame
              className={`w-3.5 h-3.5 ${currentStreak > 0 ? "fill-amber-500 text-amber-500" : ""}`}
            />
            {currentStreak} {currentStreak === 1 ? "Day" : "Days"}
          </span>
        </div>
        <p className="text-slate-500 text-sm mt-1.5 leading-relaxed font-normal max-w-xl">
          {habit.description ||
            "No specific details assigned to this core routine."}
        </p>
      </div>

      {/* Date Grids & Operations Wrapper */}
      <div className="flex items-center justify-between lg:justify-end gap-4 border-t border-slate-50 pt-4 lg:border-t-0 lg:pt-0">
        {/* Calendar Grid - Handles compact layouts across devices safely */}
        <div className="grid grid-cols-4 sm:grid-cols-7 gap-2 w-full sm:w-auto">
          {pastDays.map((day) => {
            const isCompleted = habit.history?.includes(day.dateStr);
            return (
              <button
                key={day.dateStr}
                onClick={() => onToggle(habit._id, day.dateStr)}
                className={`habit-press-effect flex flex-col items-center justify-center p-2 rounded-xl border transition-all relative ${
                  isCompleted
                    ? "bg-gradient-to-b from-emerald-50 to-emerald-100/60 border-emerald-300 text-emerald-700 shadow-xs shadow-emerald-100"
                    : "bg-slate-50/60 border-slate-200/80 hover:border-slate-300 text-slate-400 hover:bg-slate-50"
                }`}
                title={`${day.dayName}, ${day.dateStr}`}
              >
                <span
                  className={`text-[9px] font-extrabold uppercase tracking-wider ${isCompleted ? "text-emerald-800/80" : "text-slate-400"}`}
                >
                  {day.dayName}
                </span>
                <span className="text-sm font-black tracking-tighter my-0.5">
                  {day.dayNum}
                </span>
                <CheckCircle
                  className={`w-3.5 h-3.5 transition-all duration-300 ${
                    isCompleted
                      ? "text-emerald-600 fill-emerald-100 scale-110"
                      : "text-slate-300 opacity-40"
                  }`}
                />
              </button>
            );
          })}
        </div>

        {/* Delete Trigger Button */}
        <button
          onClick={() => onDelete(habit._id)}
          className="text-slate-400 hover:text-rose-600 p-2.5 rounded-xl hover:bg-rose-50 border border-transparent hover:border-rose-100 self-center transition-all shrink-0 shadow-2xs lg:opacity-0 lg:group-hover:opacity-100 focus:opacity-100"
          aria-label="Delete this habit item"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

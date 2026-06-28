import React from "react";
import { LogOut, CheckSquare, User } from "lucide-react";

export default function Navbar({ user, logout }) {
  return (
    <nav className="bg-white/80 backdrop-blur-md border-b border-slate-200/80 sticky top-0 z-50 transition-all">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Brand Logo */}
        <div className="flex items-center space-x-2.5 group cursor-pointer">
          <div className="bg-gradient-to-tr from-indigo-600 to-violet-500 p-2 rounded-xl shadow-md shadow-indigo-200 group-hover:scale-105 transition-transform duration-200">
            <CheckSquare className="w-5 h-5 text-white" />
          </div>
          <span className="font-extrabold text-xl tracking-tight bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">
            Habit Fuel
          </span>
        </div>

        {/* User Auth controls */}
        {user && (
          <div className="flex items-center space-x-4">
            <div className="hidden sm:flex items-center space-x-2 bg-slate-50 border border-slate-100 rounded-full pl-2 pr-4 py-1">
              <div className="w-6 h-6 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600">
                <User className="w-3.5 h-3.5" />
              </div>
              <span className="text-xs font-semibold text-slate-600">
                {user.name}
              </span>
            </div>

            <button
              onClick={logout}
              className="flex items-center space-x-1.5 text-xs font-bold text-slate-600 bg-white border border-slate-200 hover:border-red-200 hover:text-red-600 px-3.5 py-2 rounded-xl transition-all duration-200 shadow-xs hover:shadow-md hover:shadow-red-50"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Logout</span>
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}

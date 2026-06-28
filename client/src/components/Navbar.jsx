import React from "react";
import { LogOut, CheckSquare } from "lucide-react";

export default function Navbar({ user, logout }) {
  return (
    <nav className="bg-[#1E1B4B]/60 backdrop-blur-md border-b border-purple-900/30 sticky top-0 z-50 shadow-lg shadow-[#0B1120]/50">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center space-x-2 text-transparent bg-clip-text bg-gradient-to-r from-[#8B5CF6] to-[#A855F7] font-extrabold text-2xl tracking-wider">
          <CheckSquare className="w-7 h-7 text-[#8B5CF6] stroke-[2.5]" />
          <span>RoutineUp</span>
        </div>

        {user && (
          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-300 font-medium hidden sm:inline">
              Welcome back,{" "}
              <span className="text-[#F8FAFC] font-semibold">{user.name}</span>
            </span>
            <button
              onClick={logout}
              className="flex items-center space-x-2 text-sm bg-purple-950/40 hover:bg-red-500/10 text-gray-300 hover:text-red-400 border border-purple-900/40 hover:border-red-500/30 px-4 py-2 rounded-xl transition-all duration-300 font-medium active:scale-95"
            >
              <LogOut className="w-4 h-4" />
              <span>Logout</span>
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}

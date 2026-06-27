import React from "react";
import { LogOut, CheckSquare } from "lucide-react";

export default function Navbar({ user, logout }) {
  return (
    <nav class="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div class="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        <div class="flex items-center space-x-2 text-indigo-600 font-bold text-xl">
          <CheckSquare class="w-6 h-6" />
          <span>RoutineUp</span>
        </div>
        {user && (
          <div class="flex items-center space-x-4">
            <span class="text-sm text-gray-600 font-medium hidden sm:inline">
              Hello, {user.name}
            </span>
            <button
              onClick={logout}
              class="flex items-center space-x-1 text-sm bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-2 rounded-lg transition"
            >
              <LogOut class="w-4 h-4" />
              <span>Logout</span>
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}

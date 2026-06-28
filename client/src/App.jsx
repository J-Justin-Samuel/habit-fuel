import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";

export default function App() {
  const [auth, setAuth] = useState(null);
  const [page, setPage] = useState("login");

  useEffect(() => {
    const cachedUser = localStorage.getItem("user");
    if (cachedUser) {
      const parsed = JSON.parse(cachedUser);
      setAuth(parsed);
      setPage("dashboard");
    }
  }, []);

  useEffect(() => {
    if (auth) {
      setPage("dashboard");
    } else if (page === "dashboard") {
      setPage("login");
    }
  }, [auth]);

  const logout = () => {
    localStorage.removeItem("user");
    setAuth(null);
    setPage("login");
  };

  return (
    // Applied background hex: #0B1120 with an elegant background gradient glow effect
    <div className="min-h-screen bg-[#0B1120] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-950/20 via-[#0B1120] to-[#0B1120] text-[#F8FAFC] antialiased">
      <Navbar user={auth} logout={logout} />
      <main className="py-8">
        {page === "login" && <Login setAuth={setAuth} setPage={setPage} />}
        {page === "register" && (
          <Register setAuth={setAuth} setPage={setPage} />
        )}
        {page === "dashboard" && auth && <Dashboard user={auth} />}
      </main>
    </div>
  );
}

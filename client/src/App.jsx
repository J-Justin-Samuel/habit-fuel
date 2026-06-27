import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";

export default function App() {
  const [auth, setAuth] = useState(null);
  const [page, setPage] = useState("login"); // login, register, dashboard

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
    <div class="min-h-screen bg-gray-50">
      <Navbar user={auth} logout={logout} />
      <main class="py-6">
        {page === "login" && <Login setAuth={setAuth} setPage={setPage} />}
        {page === "register" && (
          <Register setAuth={setAuth} setPage={setPage} />
        )}
        {page === "dashboard" && auth && <Dashboard user={auth} />}
      </main>
    </div>
  );
}

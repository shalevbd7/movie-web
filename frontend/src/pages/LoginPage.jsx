import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/authUser";
import toast from "react-hot-toast";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { login, isLoggingIn } = useAuthStore();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!username || !password) {
      toast.error("Please fill all fields");
      return;
    }
    try {
      await login({ username, password });
      navigate("/home");
    } catch (error) {
      console.error("Login failed:", error);
      toast.error("Login failed. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <header className="py-6 px-4 shadow-sm bg-white">
        <h1 className="text-xl font-semibold text-gray-800">Movies App</h1>
      </header>

      <main className="flex-grow flex items-center justify-center px-4">
        <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8 space-y-6">
          <h2 className="text-2xl font-bold text-gray-800 text-center">
            Welcome Back
          </h2>
          <form className="space-y-5" onSubmit={handleLogin}>
            <div>
              <label
                htmlFor="username"
                className="block text-sm font-medium text-gray-700"
              >
                Username
              </label>
              <input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg bg-white text-gray-800
                           focus:outline-none focus:ring-2 focus:ring-teal-500 transition"
                placeholder="Your username"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg bg-white text-gray-800
                           focus:outline-none focus:ring-2 focus:ring-teal-500 transition"
                placeholder="••••••••"
              />
            </div>

            <button
              type="submit"
              disabled={isLoggingIn}
              className="w-full py-2 bg-teal-500 text-white font-semibold rounded-lg shadow-sm
                         hover:bg-teal-600 disabled:opacity-50 disabled:cursor-not-allowed
                         transition"
            >
              {isLoggingIn ? "Logging in…" : "Login"}
            </button>
          </form>

          <p className="text-center text-sm text-gray-600">
            Don׳t have an account?{" "}
            <Link
              to="/signup"
              className="text-teal-500 hover:underline font-medium"
            >
              Sign Up
            </Link>
          </p>
        </div>
      </main>
    </div>
  );
};

export default LoginPage;

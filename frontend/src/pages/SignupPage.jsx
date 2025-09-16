import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/authUser";
import toast from "react-hot-toast";
import { Film } from "lucide-react";

const SignupPage = () => {
  const [fullName, setFullName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const { signup, isSigningup } = useAuthStore();

  const handleSignUp = async (e) => {
    e.preventDefault();
    if (!fullName || !username || !password) {
      toast.error("Please fill all fields");
      return;
    }
    try {
      await signup({ username, fullName, password });
      navigate("/");
    } catch (error) {
      toast.error("Signup failed. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="py-6 px-4 shadow-sm bg-white">
        <Link to="/home" className="flex items-center space-x-2">
          <Film className="h-6 w-6 text-blue-600" />
          <span className="text-lg font-semibold text-gray-800">
            Movies Manager
          </span>
        </Link>
      </header>

      {/* Main */}
      <main className="flex-grow flex items-center justify-center px-4">
        <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8 space-y-6">
          <h2 className="text-2xl font-bold text-gray-800 text-center">
            Create Your Account
          </h2>

          <form className="space-y-5" onSubmit={handleSignUp}>
            <div>
              <label
                htmlFor="fullName"
                className="block text-sm font-medium text-gray-700"
              >
                Full Name
              </label>
              <input
                id="fullName"
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg bg-white text-gray-800
                           focus:outline-none focus:ring-2 focus:ring-teal-500 transition"
                placeholder="John Doe"
              />
            </div>

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
                placeholder="johndoe"
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
              disabled={isSigningup}
              className="w-full py-2 bg-teal-500 text-white font-semibold rounded-lg shadow-sm
                         hover:bg-teal-600 disabled:opacity-50 disabled:cursor-not-allowed transition"
            >
              {isSigningup ? "Signing Up…" : "Sign Up"}
            </button>
          </form>

          <p className="text-center text-sm text-gray-600">
            Already a member?{" "}
            <Link
              to="/login"
              className="text-teal-500 hover:underline font-medium"
            >
              Sign In
            </Link>
          </p>
        </div>
      </main>
    </div>
  );
};

export default SignupPage;

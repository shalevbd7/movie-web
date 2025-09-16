import React from "react";
import { Link } from "react-router-dom";
import { Film, Play } from "lucide-react";

const AuthScreen = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="p-6 bg-white shadow-sm">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Film className="h-7 w-7 text-blue-600" />
            <span className="text-xl font-semibold text-gray-800">
              Movies Manager
            </span>
          </div>
          <div className="flex space-x-3">
            <Link
              to="/login"
              className="px-4 py-2 text-gray-600 hover:text-gray-800 border border-gray-300 rounded-md hover:border-gray-400 transition-colors"
            >
              Login
            </Link>
            <Link
              to="/signup"
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              Sign Up
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center px-6">
        <div className="max-w-2xl text-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Welcome to Movies Manager
          </h1>

          <p className="text-lg text-gray-600 mb-8">
            Manage your movies, members, and subscriptions in one simple place.
          </p>

          {/* Simple Feature List */}
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="p-4 bg-white rounded-lg shadow-sm border">
              <h3 className="font-semibold text-gray-800 mb-2">
                Movies Library
              </h3>
              <p className="text-sm text-gray-600">
                Manage your movie collection
              </p>
            </div>

            <div className="p-4 bg-white rounded-lg shadow-sm border">
              <h3 className="font-semibold text-gray-800 mb-2">Members</h3>
              <p className="text-sm text-gray-600">Track all your members</p>
            </div>

            <div className="p-4 bg-white rounded-lg shadow-sm border">
              <h3 className="font-semibold text-gray-800 mb-2">
                Subscriptions
              </h3>
              <p className="text-sm text-gray-600">Monitor subscriptions</p>
            </div>
          </div>

          {/* Call to Action */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-800">
              Ready to start?
            </h2>
            <div className="flex justify-center space-x-4">
              <Link
                to="/signup"
                className="flex items-center space-x-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Play className="h-4 w-4" />
                <span>Get Started</span>
              </Link>
              <Link
                to="/login"
                className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:border-gray-400 transition-colors"
              >
                Sign In
              </Link>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="p-4 text-center text-gray-500 text-sm border-t">
        <p>&copy; 2025 Developed by Shalev Ben David</p>
      </footer>
    </div>
  );
};

export default AuthScreen;

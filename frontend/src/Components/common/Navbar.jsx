import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuthStore } from "../../store/authUser";
import { Film, Home, Users, Calendar, LogOut } from "lucide-react";

const Navbar = () => {
  const { user, logout, isLoggingOut } = useAuthStore();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  const isActiveLink = (path) => location.pathname === path;

  return (
    <nav className="bg-white shadow-sm border-b">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-14">
          {/* Logo */}
          <Link to="/home" className="flex items-center space-x-2">
            <Film className="h-6 w-6 text-blue-600" />
            <span className="text-lg font-semibold text-gray-800">
              Movies Manager
            </span>
          </Link>

          {/* Navigation Links */}
          <div className="flex items-center space-x-1">
            <Link
              to="/home"
              className={`flex items-center space-x-1 px-3 py-2 rounded text-sm ${
                isActiveLink("/home")
                  ? "bg-blue-100 text-blue-700"
                  : "text-gray-600 hover:text-blue-600 hover:bg-gray-50"
              }`}
            >
              <Home className="h-4 w-4" />
              <span>Home</span>
            </Link>

            <Link
              to="/movies"
              className={`flex items-center space-x-1 px-3 py-2 rounded text-sm ${
                isActiveLink("/movies")
                  ? "bg-blue-100 text-blue-700"
                  : "text-gray-600 hover:text-blue-600 hover:bg-gray-50"
              }`}
            >
              <Film className="h-4 w-4" />
              <span>Movies</span>
            </Link>

            <Link
              to="/members"
              className={`flex items-center space-x-1 px-3 py-2 rounded text-sm ${
                isActiveLink("/members")
                  ? "bg-blue-100 text-blue-700"
                  : "text-gray-600 hover:text-blue-600 hover:bg-gray-50"
              }`}
            >
              <Users className="h-4 w-4" />
              <span>Members</span>
            </Link>

            <Link
              to="/subscriptions"
              className={`flex items-center space-x-1 px-3 py-2 rounded text-sm ${
                isActiveLink("/subscriptions")
                  ? "bg-blue-100 text-blue-700"
                  : "text-gray-600 hover:text-blue-600 hover:bg-gray-50"
              }`}
            >
              <Calendar className="h-4 w-4" />
              <span>Subscriptions</span>
            </Link>
          </div>

          {/* User Menu */}
          <div className="flex items-center space-x-4">
            {user && (
              <>
                <span className="text-sm text-gray-600">
                  Hi, {user.fullName}
                </span>

                <button
                  onClick={handleLogout}
                  disabled={isLoggingOut}
                  className="flex items-center space-x-1 px-3 py-2 bg-gray-100 text-gray-700 rounded hover:bg-gray-200 transition-colors text-sm disabled:opacity-50"
                >
                  <LogOut className="h-4 w-4" />
                  <span>{isLoggingOut ? "Logging out..." : "Logout"}</span>
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

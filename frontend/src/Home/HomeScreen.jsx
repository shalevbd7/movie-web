import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuthStore } from "../store/authUser";
import { Film, Users, Calendar, Plus } from "lucide-react";
import { moviesAPI, membersAPI, subscriptionsAPI } from "../services/api";

const HomeScreen = () => {
  const { user } = useAuthStore();
  const [stats, setStats] = useState({
    movies: "--",
    members: "--",
    subscriptions: "--",
  });
  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [moviesRes, membersRes, subsRes] = await Promise.all([
          moviesAPI.getAllMovies(),
          membersAPI.getAllMembers(),
          subscriptionsAPI.getAllSubs(),
        ]);

        setStats({
          movies: Array.isArray(moviesRes)
            ? moviesRes.length
            : moviesRes.movies?.length || 0,
          members: Array.isArray(membersRes)
            ? membersRes.length
            : membersRes.members?.length || 0,
          subscriptions: Array.isArray(subsRes)
            ? subsRes.length
            : subsRes.subscriptions?.length || 0,
        });
      } catch (err) {
        console.error("Failed to fetch stats:", err);
      }
    };

    fetchStats();
  }, []);

  const quickActions = [
    { title: "Add Movie", icon: Plus, link: "/movies/add" },
    { title: "Add Member", icon: Users, link: "/members/add" },
    { title: "New Subscription", icon: Calendar, link: "/subscriptions" },
  ];

  const mainSections = [
    {
      title: "Movies",
      desc: "Manage your movie collection",
      icon: Film,
      link: "/movies",
    },
    {
      title: "Members",
      desc: "View and manage members",
      icon: Users,
      link: "/members",
    },
    {
      title: "Subscriptions",
      desc: "Track all subscriptions",
      icon: Calendar,
      link: "/subscriptions",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-6 space-y-8">
      {/* Welcome */}
      <div className="bg-white rounded-xl shadow p-6">
        <h1 className="text-2xl font-bold text-gray-800">
          Welcome back, {user?.fullName}!
        </h1>
        <p className="text-gray-600 mt-1">Ready to manage your movies?</p>
      </div>

      {/* Quick Actions */}
      <section>
        <h2 className="text-lg font-semibold text-gray-800 mb-4">
          Quick Actions
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {quickActions.map(({ title, icon: Icon, link }, i) => (
            <Link
              key={i}
              to={link}
              className="flex flex-col items-center justify-center bg-white border border-gray-200
                         rounded-xl p-4 shadow-sm hover:shadow-md transition"
            >
              <Icon className="h-6 w-6 text-teal-500 mb-2" />
              <span className="text-sm font-medium text-gray-800">{title}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* Main Sections */}
      <section>
        <h2 className="text-lg font-semibold text-gray-800 mb-4">
          Main Sections
        </h2>
        <div className="grid sm:grid-cols-3 gap-4">
          {mainSections.map(({ title, desc, icon: Icon, link }, i) => (
            <Link
              key={i}
              to={link}
              className="flex flex-col bg-white border border-gray-200 rounded-xl p-5
                         hover:shadow-md transition"
            >
              <div className="flex items-center mb-3">
                <Icon className="h-5 w-5 text-teal-500 mr-2" />
                <h3 className="text-md font-semibold text-gray-800">{title}</h3>
              </div>
              <p className="text-gray-600 text-sm">{desc}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Overview Stats */}
      <section className="bg-white rounded-xl shadow p-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Overview</h2>
        <div className="grid grid-cols-3 text-center gap-4">
          <div>
            <div className="text-2xl font-bold text-teal-600">
              {stats.movies}
            </div>
            <div className="text-gray-600 text-sm">Movies</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-teal-600">
              {stats.members}
            </div>
            <div className="text-gray-600 text-sm">Members</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-teal-600">
              {stats.subscriptions}
            </div>
            <div className="text-gray-600 text-sm">Subscriptions</div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomeScreen;

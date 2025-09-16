import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import HomePage from "./Home/HomePage";
import HomeScreen from "./Home/HomeScreen";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import MoviesPage from "./pages/MoviesPage";
import MembersPage from "./pages/MembersPage";
import QuickPage from "./pages/QuickPage";
import { Toaster } from "react-hot-toast";
import Layout from "./Components/common/Layout";
import ProtectedRoute from "./Components/ProtectedRoute";
import { useAuthStore } from "./store/authUser";

const App = () => {
  const { authCheck, isCheckingAuth } = useAuthStore();

  useEffect(() => {
    authCheck();
  }, [authCheck]);

  if (isCheckingAuth) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading Movies Manager...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />

        <Route element={<Layout />}>
          <Route
            path="/home"
            element={
              <ProtectedRoute>
                <HomeScreen />
              </ProtectedRoute>
            }
          />
          <Route
            path="/movies"
            element={
              <ProtectedRoute>
                <MoviesPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/members"
            element={
              <ProtectedRoute>
                <MembersPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/subscriptions"
            element={
              <ProtectedRoute>
                <QuickPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/movies/add"
            element={
              <ProtectedRoute>
                <MoviesPage openAddMovie />
              </ProtectedRoute>
            }
          />
          <Route
            path="/members/add"
            element={
              <ProtectedRoute>
                <MembersPage openAddMember />
              </ProtectedRoute>
            }
          />
        </Route>
      </Routes>

      <Toaster
        position="top-center"
        reverseOrder={false}
        toastOptions={{
          duration: 4000,
          style: {
            background: "#363636",
            color: "#fff",
          },
        }}
      />
    </>
  );
};

export default App;

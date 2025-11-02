import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Otp from "./pages/Otp";
import Restaurants from "./pages/Restaurants";
import RestaurantDetail from "./pages/RestaurantDetail";

function PrivateRoute({ children }) {
  const token = localStorage.getItem("fastor_token");
  return token ? children : <Navigate to="/login" replace />;
}

export default function App() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/otp" element={<Otp />} />
        <Route
          path="/restaurants"
          element={
            <PrivateRoute>
              <Restaurants />
            </PrivateRoute>
          }
        />
        <Route
          path="/restaurant/:id"
          element={
            <PrivateRoute>
              <RestaurantDetail />
            </PrivateRoute>
          }
        />
      </Routes>
    </div>
  );
}

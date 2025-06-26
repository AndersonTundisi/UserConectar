import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from '../pages/LoginPage';
import ProfilePage from '../pages/ProfilePage';
import Dashboard from '../pages/DashboardPage';
import CreateUserPage from '../pages/CreateUserPage';
import EditUserPage from '../pages/EditUserPage';
import ProtectedRoute from './ProtectedRoute';

const AppRoutes = () => (
  <Router>
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
      <Route path="/profile" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
      <Route path="/register" element={<ProtectedRoute><CreateUserPage /></ProtectedRoute>} />
      <Route path="/edit-user/:id" element={<ProtectedRoute><EditUserPage /></ProtectedRoute>} />
      <Route path="*" element={<Navigate to="/dashboard" />} />
    </Routes>
  </Router>
);

export default AppRoutes;
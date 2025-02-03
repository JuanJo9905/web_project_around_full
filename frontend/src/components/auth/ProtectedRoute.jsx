import React from 'react';
import { Navigate } from 'react-router-dom';

function ProtectedRoute({ element: Component, isLoggedIn }) {
  return isLoggedIn ? Component : <Navigate to="/signin" replace />;
}

export default ProtectedRoute;

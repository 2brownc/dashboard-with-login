import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';

import UserContext from './UserContext';

export default function ProtectedRoute() {
  const { user } = React.useContext(UserContext);

  if (user === null) {
    return (
      <Navigate to={'/'} replace />
    );
  }

  return (<Outlet />);
}
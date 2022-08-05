import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';

import UserContext from './UserContext';
import { getLoggedInUser } from './auth';

export default function ProtectedRoute() {
  const { user, setUser } = React.useContext(UserContext);

  /*
    if user naviagates to dashboard
    check if the user is logged in.
  */
  if (user === null) {
    /*
      incase user closed the window
      without logging out
      try to retrieve the user
    */
    setUser(getLoggedInUser());

    /*
      if user did not previously login
      before closing tab or window
      redirect user to login page
    */
    if (user === null) {
      return (
        <Navigate to="/" replace />
      );
    }
  }

  /*
    if the user is logged in
    redirect to dashbaord
    which is currently the child of
    PrivateRoute
  */

  return (<Outlet />);
}

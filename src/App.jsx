import React from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
} from 'react-router-dom';

import LoginPage from './components/account/Login';
import SignUpPage from './components/account/SignUp';
import DashboardMain from './components/dashboard/Main';
import Home from './components/home/Home';
import LoginProgress from './components/account/LoginProgress';
import PageNotFound from './components/pages/PageNotFound';

import UserContext from './auth/UserContext';
import ProtectedRoute from './auth/ProtectedRoute';

function App() {
  const [user, setUser] = React.useState(null);
  return (
    <UserContext.Provider value={{ user, setUser }}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}>
            <Route index element={<LoginPage />} />
            <Route path="signup" element={<SignUpPage />} />
            <Route path="loginprogress" element={<LoginProgress />}>
              <Route path=":loginType" element={<LoginProgress />} />
            </Route>
            <Route element={<ProtectedRoute />}>
              <Route path="dashboard" element={<DashboardMain />} />
            </Route>
            <Route path="*" element={<PageNotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App;

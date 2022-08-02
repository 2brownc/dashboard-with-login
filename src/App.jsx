import React from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import LoginPage from './components/account/Login';
import SignUpPage from './components/account/SignUp';
import DashboardMain from './components/dashboard/Main';
import Home from './components/home/Home';
function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}>
          <Route path="login" element={<LoginPage />} />
          <Route path="signup" element={<SignUpPage />} />
          <Route path="dashboard" element={<DashboardMain />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

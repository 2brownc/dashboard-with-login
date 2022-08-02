import React from 'react';
import Fade from '@mui/material/Fade';
import Box from '@mui/material/Box';

import LoginPage from './components/account/Login';
import SignUpPage from './components/account/SignUp';
import DashboardMain from './components/dashboard/Main';

function App() {
  // fade in the login form
  const [show, setShow] = React.useState(false);
  React.useEffect(() => {
    setTimeout(() => { setShow(true) }, 500)
  }, []);

  return (
    <Fade in={show}>
      <Box>
        <LoginPage />
      </Box>
    </Fade>
  );
}

export default App;

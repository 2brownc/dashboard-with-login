import React from 'react';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { useNavigate, Outlet, useParams } from 'react-router-dom';
import Button from '@mui/material/Button';
import LinearProgress from '@mui/material/LinearProgress';
import Typography from '@mui/material/Typography';
import UserContext from '../../auth/UserContext';

/*
use React Router hook to useNavigation
navigate to "login form" path
*/
function SignupFail({ goto }) {
  return (
    <Stack spacing={4} sx={{ width: 1 }}>
      <Typography variant="h5" component="div">
        Sorry, your account can&apos;t be created at the moment.
      </Typography>
      <Button
        variant="outlined"
        startIcon={<ArrowBackIosNewIcon />}
        onClick={goto('../../login')}
      >
        Go Back
      </Button>
    </Stack>
  );
}

function SignupSuccess({ goto }) {
  const waitAndGotoDashboard = () => {
    setTimeout(() => {
      goto('../../dashboard');
    }, 5000);
  };
  return (
    <Stack spacing={4} sx={{ width: 1 }}>
      <Typography variant="h4" component="div">
        <div>Account created successfully!</div>
        <div>Logging in...</div>
      </Typography>
      <LinearProgress />
      {
        /*
      Goto dashboard after showing success
      message for a comfortable time
      */
        waitAndGotoDashboard()
      }
    </Stack>
  );
}

function LoginSuccess({ goto }) {
  const waitAndGotoDashboard = () => {
    setTimeout(() => {
      goto('../../dashboard');
    }, 5000);
  };
  return (
    <Stack spacing={4} sx={{ width: 1 }}>
      <Typography variant="h4" component="div">
        <div>Logging in...</div>
      </Typography>
      <LinearProgress />
      {
        /*
      Goto dashboard after showing success
      message for a comfortable time
      */
        waitAndGotoDashboard()
      }
    </Stack>
  );
}

export default function LoginProgress() {
  const user = React.useContext(UserContext);

  const reactRouterNavigate = useNavigate();
  // get parameters from URL
  const params = useParams();

  const reactRouterGoto = (path) => {
    reactRouterNavigate(path, { replace: true });
  };
  return (
    <Container maxWidth="xs" sx={{ height: 1 }}>
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        sx={{ height: 1 }}
      >
        <Grid item>
          <Paper elevation={5}>
            <Box p={4}>
              {
                params.loginType === 'afterlogin'
                && (<LoginSuccess goto={reactRouterGoto} />)
              }

              {
                params.loginType === 'aftersignup'
                && (user === null
                  ? (<SignupFail goto={reactRouterGoto} />)
                  : (<SignupSuccess goto={reactRouterGoto} />))
              }
            </Box>
          </Paper>
        </Grid>
      </Grid>
      <Outlet />
    </Container>
  );
}

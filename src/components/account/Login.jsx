import React from 'react';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import LoginIcon from '@mui/icons-material/Login';
import AutoModeIcon from '@mui/icons-material/AutoMode';
import FormControl from '@mui/material/FormControl';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import IconButton from '@mui/material/IconButton';
import Fade from '@mui/material/Fade';
import { Link, Navigate, useNavigate } from 'react-router-dom';

import {
  userLogin,
  createDemoUser,
  getLoggedInUser,
  logoutUser,
} from '../../auth/auth';
import UserContext from '../../auth/UserContext';

export default function LoginPage() {
  // fade in the login form
  const [show, setShow] = React.useState(false);
  React.useEffect(() => {
    setTimeout(() => { setShow(true); }, 100);
  }, []);

  // PASSWORD

  /*
  maitain state of password field vales
  for password visibility toggle button
  */
  const [passwordValues, setPasswordValues] = React.useState({
    amount: '',
    password: '',
    weight: '',
    weightRange: '',
    showPassword: false,
  });

  // update password field values
  const handleChange = (prop) => (event) => {
    setPasswordValues({ ...passwordValues, [prop]: event.target.value });
  };

  // toggle password visibility
  const handleClickShowPassword = () => {
    setPasswordValues({
      ...passwordValues,
      showPassword: !passwordValues.showPassword,
    });
  };

  /*
    prevent native event
    when toggling password visibility
  */
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  // USERNAME
  const [usernameValue, setUsernameValue] = React.useState('');

  const handleUsernameOnChange = (event) => {
    setUsernameValue(event.target.value);
  };

  // CHECK IF THE USRE IS ALREADY LOGGED IN

  /*
  use UserContext to set
  the logged in user
*/
  const { setUser } = React.useContext(UserContext);

  /*
    user React Router hook, useNavigate
    to navigate routes
  */
  const reactRouterNavigate = useNavigate();

  const userIsLoggedIn = () => {
    const loggedInUser = getLoggedInUser();

    if (loggedInUser !== null) {
      setUser(loggedInUser);
      return true;
    }
    setUser(null);
    return false;
  };

  const gotoDashboard = () => <Navigate to="../dashboard" replace />;

  // USER LOGIN

  // error message if login fails
  const [LoginError, setLoginError] = React.useState('');
  const [UsernameError, setUsernameError] = React.useState('');
  const [PasswordError, setPasswordError] = React.useState('');

  const login = () => {
    // ensure non-empty values
    let submit = true;
    if (passwordValues.password === '') {
      setPasswordError('Enter the password.');
      submit = false;
    } else {
      setPasswordError('');
    }
    if (usernameValue === '') {
      setUsernameError('Enter your username.');
      submit = false;
    } else {
      setUsernameError('');
    }
    if (submit === true) {
      const result = userLogin(usernameValue, passwordValues.password);

      if (result.correctPassword === true) {
        setLoginError('');
        setUser(result);
        reactRouterNavigate('../loginprogress/afterlogin');
      } else {
        setLoginError('Please recheck your username & password.');
      }
    }
  };

  // DEMO LOGIN

  /*
    a demo user is created in src/auth/auth.js
    username: demouser
    password: icyHam$ter48
  */

  const demoLogin = () => {
    // create the demo user
    createDemoUser();

    /*
      prevent auto login
      wait for user to press login button
    */
    setUser(null);
    logoutUser();

    // login as the demo user
    const username = 'demouser';
    const password = 'icyHam$ter48';

    // fill the username & password fields
    setUsernameValue(username);
    setPasswordValues({
      ...passwordValues,
      password,
    });
  };

  return (
    <>
      {/*
        if user already logged in the previous session
        skip the login page and
        redirect user to the dashboard
      */}
      {userIsLoggedIn() && gotoDashboard()}
      <Fade in={show}>
        <Container maxWidth="xs" sx={{ height: 1 }}>
          <Grid
            container
            justifyContent="center"
            alignItems="center"
            sx={{ height: 1 }}
          >
            <Grid item>
              <Paper elevation={3}>
                <Grid
                  container
                  item
                  spacing={3}
                  justifyContent="center"
                  alignItems="center"
                  p={4}
                >
                  <Grid
                    item
                    container
                    justifyContent="center"
                    alignItems="center"
                    xs={12}
                  >
                    <Grid item>
                      <Typography variant="h5" component="div">
                        Login
                      </Typography>
                    </Grid>
                  </Grid>

                  <Grid item xs={12}>
                    <Stack spacing={1}>
                      <TextField
                        label="Username"
                        id="outlined"
                        type="username"
                        value={usernameValue}
                        onChange={handleUsernameOnChange}
                      />

                      <FormControl variant="outlined">
                        <InputLabel htmlFor="password">Password</InputLabel>
                        <OutlinedInput
                          id="password"
                          type={passwordValues.showPassword ? 'text' : 'password'}
                          autoComplete="current-password"
                          value={passwordValues.password}
                          onChange={handleChange('password')}
                          endAdornment={(
                            <InputAdornment position="end">
                              <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleClickShowPassword}
                                onMouseDown={handleMouseDownPassword}
                                edge="end"
                              >
                                {passwordValues.showPassword ? <VisibilityOff /> : <Visibility />}
                              </IconButton>
                            </InputAdornment>
                          )}
                          label="Password"
                        />
                      </FormControl>

                    </Stack>
                  </Grid>

                  <Grid item xs={12}>
                    <Stack>
                      <Typography sx={{ color: 'error.main' }}>
                        {UsernameError}
                      </Typography>
                      <Typography sx={{ color: 'error.main' }}>
                        {PasswordError}
                      </Typography>
                      <Typography sx={{ color: 'error.main' }}>
                        {LoginError}
                      </Typography>
                    </Stack>
                  </Grid>

                  <Grid item xs={12}>
                    <Button
                      variant="contained"
                      fullWidth
                      startIcon={<LoginIcon />}
                      onClick={login}
                    >
                      Login
                    </Button>
                  </Grid>

                  <Grid item xs={12}>
                    <Stack
                      spacing={1}
                      alignItems="center"
                      justifyContent="center"
                    >
                      <Button
                        variant="outlined"
                        fullWidth
                        startIcon={<AutoModeIcon />}
                        onClick={demoLogin}
                      >
                        Demo Login
                      </Button>
                      <Typography variant="subtitle2" component="div" sx={{ margin: 'auto' }}>
                        Don&apos;t have an account?
                        {' '}
                        <Link to="../signup">Sign Up!</Link>
                      </Typography>
                    </Stack>
                  </Grid>

                </Grid>
              </Paper>
            </Grid>
          </Grid>

        </Container>
      </Fade>
    </>
  );
}

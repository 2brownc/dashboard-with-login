import React from 'react';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
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

export default function LoginPage() {
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

  // prevent native event
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <Container maxWidth="sm">
      <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
        sx={{ minHeight: '100vh' }}
      >
        <Paper elevation={3}>
          <Box p={4}>
            <Stack
              spacing={2}
              justifyContent="center"
              alignItems="center"
            >
              <Typography variant="h5" component="div" mb={2}>
                Login
              </Typography>
              <Stack spacing={1}>
                <TextField label="Username" id="outlined" type="username" />

                <FormControl fullWidth sx={{ m: 1 }} variant="outlined">
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
              <Button variant="contained" fullWidth startIcon={<LoginIcon />}>Login</Button>
              <Button variant="outlined" fullWidth startIcon={<AutoModeIcon />}>Demo Login</Button>
              <Typography variant="subtitle2" component="div" sx={{ margin: 'auto' }}>
                Don&apos;t have an account? Sign Up!
              </Typography>
            </Stack>
          </Box>
        </Paper>
      </Grid>
    </Container>
  );
}

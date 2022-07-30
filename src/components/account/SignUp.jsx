import React from 'react';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import FormControl from '@mui/material/FormControl';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import IconButton from '@mui/material/IconButton';
import Divider from '@mui/material/Divider';
import Popper from '@mui/material/Popper';
import Fade from '@mui/material/Fade';

export default function SignUpPage() {

  const [open, setOpen] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);

  const [values, setValues] = React.useState({
    password: '',
    showPassword: false,
  });

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handlePasswordFocus = (event) => {
    setAnchorEl(event.currentTarget);
    setOpen((previousOpen) => !previousOpen);
  };

  const handlePasswordBlur = (event) => {
    setAnchorEl(event.currentTarget);
    setOpen((previousOpen) => !previousOpen);
  };

  const handleClose = (event) => {
    console.log("closing..., pass helper", showPasswordHelper)
    setShowPasswordHelper(!showPasswordHelper);
    console.log("closed..., pass helper", showPasswordHelper)
    setAnchorEl(null);

  };

  const canBeOpen = open && Boolean(anchorEl);
  const id = canBeOpen ? 'transition-popper' : undefined;
  return (
    <Container fixed>
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        sx={{ minHeight: "100vh" }}
      >
        <Grid
          item
        >
          <Paper elevation={3}>
            <Box width={400} m={4}>
              <Grid
                container
                item
                spacing={3}
                justifyContent="center"
                alignItems="center"
              >
                <Grid item xs={12}>
                  < Typography variant="h5" component="div" mb={2}>
                    Sign Up
                  </Typography>
                </Grid>

                <Grid item xs={12}>
                  <Stack spacing={1}>
                    <Divider>What is your name?</Divider>
                    <TextField label="First Name" id="firstname" type="text" />
                    <TextField label="Last Name" id="lastname" type="text" fullWidth />
                  </Stack>
                </Grid>

                <Grid item xs={12}>
                  <Stack spacing={1}>
                    <Divider>Set your credentials.</Divider>
                    <TextField label="Username" id="username" type="text" />

                    <FormControl variant="outlined">
                      <InputLabel htmlFor="password">Password</InputLabel>
                      <OutlinedInput
                        id="password"
                        type={values.showPassword ? 'text' : 'password'}
                        value={values.password}
                        autoComplete="new-password"
                        onChange={handleChange('password')}
                        onFocus={handlePasswordFocus}
                        onBlur={handlePasswordBlur}
                        endAdornment={
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={handleClickShowPassword}
                              onMouseDown={handleMouseDownPassword}
                              edge="end"
                            >
                              {values.showPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                          </InputAdornment>
                        }
                        label="Password"
                      />
                    </FormControl>



                    <Popper
                      id={id}
                      open={open}
                      anchorEl={anchorEl}
                      placement="top-start"
                      transition
                    >
                      {({ TransitionProps }) => (
                        <Fade {...TransitionProps} timeout={350}>
                          <Paper elevation={5}>
                            <Box sx={{ mb: 1 }}>
                              The content of the Popper.
                            </Box>
                          </Paper>
                        </Fade>
                      )}
                    </Popper>
                  </Stack>
                </Grid>

                <Grid item xs={12}>
                  <Button
                    variant="contained"
                    startIcon={<PersonAddIcon />}
                    fullWidth
                  >
                    Sign Up
                  </Button>
                </Grid>

                <Grid item xs={12}>
                  <Stack spacing={1}>
                    <Divider>Don&apos;t want an account?</Divider>
                    <Button variant="outlined" startIcon={<ArrowBackIosNewIcon />}>Go Back</Button>
                  </Stack>
                </Grid>

                <Grid item xs={12}>
                  {' '}
                </Grid>
              </Grid>
            </Box>
          </Paper>
        </Grid>
      </Grid >
    </Container >
  );
}

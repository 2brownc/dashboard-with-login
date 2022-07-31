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
import PasswordValidator from 'password-validator';
import FormHelperText from '@mui/material/FormHelperText';

function HandlePasswordPolicy({ passwordIssues }) {
  /*
    show problems with the current password
  
    passwordIssues = [
      {validation, message},
    ]
  */
  if (passwordIssues === null
    || passwordIssues === undefined) {
    return null;
  }

  return (
    <div>
      Password must have:
      <ul>
        {
          passwordIssues.map(issue => (
            <li key={issue.validation}>
              {issue.message}
            </li>
          ))
        }
      </ul>
    </div>
  );

};
export default function SignUpPage() {
  // popper needs an element reference
  // of the password field
  const passwordRef = React.useRef();

  // if to show the password helper dialog (popper)
  const [showPasswordHelper, setShowPasswordHelper] = React.useState(false);

  // issues of the password against
  // the password policy
  const [passwordIssues, setPasswordIssues] = React.useState(null);

  /*
  show an error message below password field when
  the password does not confirm to the policy
  and the password field is out of focus
  so the user reminded to set a correct password
  */
  const [passwordValidMessage, setPasswordValidMesssage] = React.useState("");

  /*
  main state of password field's values
  for show/hide password functionality
  */
  const [passwordValues, setPasswordValues] = React.useState({
    password: '',
    showPassword: false,
  });

  // update state values of password field
  const handlePasswordOnChange = (prop) => (event) => {
    setPasswordValues({ ...passwordValues, [prop]: event.target.value });
  };

  // toggle visibility of password chars
  const handleClickShowPassword = () => {
    setPasswordValues({
      ...passwordValues,
      showPassword: !passwordValues.showPassword,
    });
  };

  // toggle password visibility when clicked
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  /*
  show password helper when
  password field is focused
  */
  const handlePasswordOnFocus = () => {
    if (passwordIssues !== null) {
      setShowPasswordHelper(true);
    }
  };

  /*
  when password field loses focus
  hide password helper
  show error reminder if any
  */
  const handlePasswordOnBlur = (event) => {
    setShowPasswordHelper(false);

    if (passwordIssues !== null) {
      setPasswordValidMesssage("Recheck your password.");
    }
  };

  // set password policy
  const passwordPolicy = new PasswordValidator();
  passwordPolicy
    .is().min(8, 'a minimum length of 8 letters')
    .has().uppercase(1, 'at least 1 upper case letter')
    .has().lowercase(1, 'at least 1 lower case letter')
    .has().digits(1, 'at least 1 number')
    .has().symbols(1, 'at least 1 symbol: #, $, !, &...');

  /*
  monitor password for policy conformance and
  set if password helper, error reminder
  are to be shown
  */
  React.useEffect(() => {
    const issues = passwordPolicy.validate(
      passwordValues.password,
      { details: true },
    );

    if (passwordValues.password !== ''
      && issues.length === 0) {
      setShowPasswordHelper(false);
      setPasswordValidMesssage("");
      setTimeout(() => setPasswordIssues(null), 400);
    } else if (passwordValues.password !== ''
      && issues.length > 0) {
      setShowPasswordHelper(true);
      setPasswordIssues(issues);
    } else if (passwordValues.password === ''
      || issues.length === 0) {
      setShowPasswordHelper(false);
      setPasswordValidMesssage("");

      setTimeout(() => setPasswordIssues(null), 400);
    }
  }, [passwordValues.password]);



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
                        ref={passwordRef}
                        type={passwordValues.showPassword ? 'text' : 'password'}
                        value={passwordValues.password}
                        autoComplete="new-password"
                        onChange={handlePasswordOnChange('password')}
                        onBlur={handlePasswordOnBlur}
                        onFocus={handlePasswordOnFocus}
                        endAdornment={
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
                        }
                        label="Password"
                      />
                      <FormHelperText sx={{ color: "error.main" }}>{passwordValidMessage}</FormHelperText>
                    </FormControl>
                    <Popper
                      id="transition-popper"
                      open={showPasswordHelper}
                      anchorEl={passwordRef.current}
                      placement="top-end"
                      transition
                    >
                      {({ TransitionProps }) => (
                        <Fade {...TransitionProps} timeout={350}>
                          <Paper elevation={5}>
                            <Box sx={{ p: 1, mb: 1 }}>
                              <HandlePasswordPolicy
                                passwordIssues={passwordIssues}
                              />
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

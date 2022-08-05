import React from 'react';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
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
import { validate as validateEmail } from 'check-email-validation';
import { useNavigate } from 'react-router-dom';

import { userSignUp, isNewUser } from '../../auth/auth';
import UserContext from '../../auth/UserContext';

function getPasswordPolicy() {
  // set password policy
  const passwordPolicy = new PasswordValidator();
  return passwordPolicy
    .is().min(8, 'a minimum length of 8 letters')
    .has().uppercase(1, 'at least 1 upper case letter')
    .has()
    .lowercase(1, 'at least 1 lower case letter')
    .has()
    .digits(1, 'at least 1 number')
    .has()
    .symbols(1, 'at least 1 symbol: #, $, !, &...');
}

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
          passwordIssues.map((issue) => (
            <li key={issue.validation}>
              {issue.message}
            </li>
          ))
        }
      </ul>
    </div>
  );
}
export default function SignUpPage() {
  // fade in the sign up form
  const [show, setShow] = React.useState(false);
  React.useEffect(() => {
    setTimeout(() => { setShow(true); }, 100);
  }, []);

  // get user from UserContext
  const { setUser } = React.useContext(UserContext);

  // PASSWORD VISIBILITY TOGGLE

  /*
  popper needs an element reference
  of the password field
  */
  const passwordRef = React.useRef();

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

  // PASSWORD VALIDATION

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
  const [passwordHelperText, setPasswordHelperText] = React.useState('');
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
  const handlePasswordOnBlur = () => {
    setShowPasswordHelper(false);

    if (passwordIssues !== null) {
      setPasswordHelperText('Password is invalid.');
    }
  };

  /*
  monitor password for policy conformance and
  set if password helper, error reminder
  are to be shown
  */
  React.useEffect(() => {
    const issues = getPasswordPolicy().validate(
      passwordValues.password,
      { details: true },
    );

    if (passwordValues.password !== ''
      && issues.length === 0) {
      setShowPasswordHelper(false);
      setPasswordHelperText('');
      setTimeout(() => setPasswordIssues(null), 400);
    } else if (passwordValues.password !== ''
      && issues.length > 0) {
      setShowPasswordHelper(true);
      setPasswordIssues(issues);
    } else if (passwordValues.password === ''
      || issues.length === 0) {
      setShowPasswordHelper(false);
      setPasswordHelperText('');

      setTimeout(() => setPasswordIssues(null), 400);
    }
  }, [passwordValues.password]);

  // EMAIL VALIDATION

  /*
  check validity of email
  when the field loses focus
  so the user is reminded
  to correct the email if needed
  */
  const [emailValue, setEmailValue] = React.useState('');
  const [emailValidity, setEmailValidity] = React.useState(false);
  const [emailHelperText, setEmailHelperText] = React.useState('');
  /*
  check if email is valid when it is being typed
  */
  React.useEffect(() => {
    if (emailValue !== '') {
      const isEmailValid = validateEmail(emailValue);
      if (isEmailValid === true) {
        setEmailValidity(true);
      } else if (isEmailValid === false) {
        setEmailValidity(false);
      }
    } else {
      setEmailValidity(true);
    }
  }, [emailValue]);

  const handleEmailOnBlur = () => {
    if (emailValidity === true) {
      setEmailHelperText('');
    } else {
      setEmailHelperText('Email is invalid.');
    }
  };

  const handleEmailOnChange = (event) => {
    // update email state
    setEmailValue(event.target.value);
  };

  const handleEmailOnFocus = () => {
    setEmailHelperText('');
  };

  // USERNAME VALIDATION

  const [usernameValue, setUsernameValue] = React.useState('');
  const [usernameValidity, setUsernameValidity] = React.useState(false);
  const [usernameHelperText, setUsernameHelperText] = React.useState('');

  // update state as username is typed in
  const handleUsernameOnChange = (event) => {
    setUsernameValue(event.target.value);
  };

  /*
  check if an account with the username
  already exists.
  */

  React.useEffect(() => {
    if (usernameValue !== '') {
      const accountIsNew = isNewUser(usernameValue);
      if (accountIsNew === true) {
        setUsernameValidity(true);
        setUsernameHelperText('');
      } else {
        setUsernameValidity(false);
        setUsernameHelperText('Username exists. Try something else.');
      }
    }
  }, [usernameValue]);

  // FIRST NAME
  const [firstnameValue, setFirstnameValue] = React.useState('');
  const [firstnameHelperText, setFirstnameHelperText] = React.useState('');

  const handleFirstnameOnChange = (event) => {
    setFirstnameValue(event.target.value);
  };

  React.useEffect(() => {
    if (firstnameValue !== '') {
      setFirstnameHelperText('');
    }
  }, [firstnameValue]);

  // LAST NAME
  const [lastnameValue, setLastnameValue] = React.useState('');
  const [lastnameHelperText, setLastnameHelperText] = React.useState('');

  const handleLastnameOnChange = (event) => {
    setLastnameValue(event.target.value);
  };

  React.useEffect(() => {
    if (lastnameValue !== '') {
      setLastnameHelperText('');
    }
  }, [lastnameValue]);

  /*
check if username,password and email or valid
and try and create a new user
then redirect to a page that gives the
status of creating an account
*/
  /*
  use React Router hook to useNavigation
  navigate to "login form" path
  */
  const reactRouterNavigate = useNavigate();

  const handleUserSignUp = () => {
    let submit = true;

    /*
      check if the field are empty
      because being empty itself
      will not trigger
      invalid messages
    */
    if (firstnameValue === '') {
      setFirstnameHelperText('Please enter your first name.');
      submit = false;
    }
    if (lastnameValue === '') {
      setLastnameHelperText('Please enter your last name.');
      submit = false;
    }
    if (emailValue === '') {
      setEmailHelperText('Please enter your email.');
      submit = false;
    }
    if (usernameValue === '') {
      setUsernameHelperText('You need a username to create an account.');
      submit = false;
    }
    if (passwordValues.password === '') {
      setPasswordHelperText('You need a password for your account.');
      submit = false;
    }

    // check if the field are valid
    if (passwordIssues !== null
      || passwordValues.password === ''
      || emailValidity === false
      || usernameValidity === false) {
      submit = false;
    }

    if (submit === true) {
      const userInfo = userSignUp(
        firstnameValue,
        lastnameValue,
        usernameValue,
        emailValue,
        passwordValues.password,
      );

      setUser(userInfo);

      reactRouterNavigate('../loginprogress/aftersignup', { replace: true });
    }
  };

  const handleGoBackClick = () => {
    reactRouterNavigate('/', { replace: true });
  };

  return (
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
                      Sign Up
                    </Typography>
                  </Grid>
                </Grid>

                <Grid item xs={12}>
                  <Stack spacing={1}>
                    <Divider>What is your name?</Divider>

                    <FormControl variant="outlined">
                      <InputLabel htmlFor="firstname">First Name</InputLabel>
                      <OutlinedInput
                        id="firstname"
                        type="firstname"
                        onChange={handleFirstnameOnChange}
                        label="First Name"
                        value={firstnameValue}
                      />
                      <FormHelperText sx={{ color: 'error.main' }}>{firstnameHelperText}</FormHelperText>
                    </FormControl>

                    <FormControl variant="outlined">
                      <InputLabel htmlFor="lastname">Last Name</InputLabel>
                      <OutlinedInput
                        id="lastname"
                        type="lastname"
                        onChange={handleLastnameOnChange}
                        label="Last Name"
                        value={lastnameValue}
                      />
                      <FormHelperText sx={{ color: 'error.main' }}>{lastnameHelperText}</FormHelperText>
                    </FormControl>
                  </Stack>
                </Grid>

                <Grid item xs={12}>
                  <Stack spacing={1}>
                    <Divider>Let&apos;s get in touch.</Divider>
                    <FormControl variant="outlined">
                      <InputLabel htmlFor="email">Email</InputLabel>
                      <OutlinedInput
                        id="email"
                        type="email"
                        onBlur={handleEmailOnBlur}
                        onChange={handleEmailOnChange}
                        onFocus={handleEmailOnFocus}
                        label="Email"
                        value={emailValue}
                      />
                      <FormHelperText sx={{ color: 'error.main' }}>{emailHelperText}</FormHelperText>
                    </FormControl>
                  </Stack>
                </Grid>

                <Grid item xs={12}>
                  <Stack spacing={1}>
                    <Divider>Set your credentials.</Divider>

                    <FormControl variant="outlined">
                      <InputLabel htmlFor="username">Username</InputLabel>
                      <OutlinedInput
                        id="username"
                        type="username"
                        onChange={handleUsernameOnChange}
                        label="Username"
                        value={usernameValue}
                      />
                      <FormHelperText sx={{ color: 'error.main' }}>{usernameHelperText}</FormHelperText>
                    </FormControl>

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
                      <FormHelperText sx={{ color: 'error.main' }}>{passwordHelperText}</FormHelperText>
                    </FormControl>
                    <Popper
                      id="transition-popper"
                      open={showPasswordHelper}
                      anchorEl={passwordRef.current}
                      placement="top"
                      transition
                      sx={{ zIndex: 1 }}
                    >
                      {({ TransitionProps }) => (
                        <Fade {...TransitionProps} timeout={350}>
                          <Paper elevation={5}>
                            <Box sx={{ p: 1, mb: 2 }}>
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
                    onClick={handleUserSignUp}
                  >
                    Sign Up
                  </Button>
                </Grid>

                <Grid item xs={12}>
                  <Stack spacing={1}>
                    <Divider>Don&apos;t want an account?</Divider>
                    <Button
                      variant="outlined"
                      startIcon={<ArrowBackIosNewIcon />}
                      onClick={handleGoBackClick}
                    >
                      Go Back
                    </Button>
                  </Stack>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Fade>
  );
}

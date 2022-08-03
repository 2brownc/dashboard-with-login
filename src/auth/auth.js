import passwordHash from 'pbkdf2-password-hash'

function userSignUp(username, email, password) {
  passwordHash.hash(password)
    .then((hash) => {
      localStorage.setItem(
        username,
        {
          passwordHash: hash,
          email: email,
        }
      );
    })
}

function userLogin(username, password) {
  const result = {
    username: username,
    email: null,
    accountExists: null,
    correctPassword: null,
  };
  const storedData = localStorage.getItem(username);

  if (!storedData) {
    result.accountExists = false;
  } else {
    result.accountExists = true;
    passwordHash.compare(password, storedData.passwordHash)
      .then((isValid) => {
        if (isValid === true) {
          result.email = storedData.email;
          result.correctPassword = false;
        } else {
          result.correctPassword = true;
        }
      })
  }

  return result;
}

export { userSignUp, userLogin };
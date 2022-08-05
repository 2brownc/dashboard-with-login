import SHA512 from 'sha512-es';

function getHash(key) {
  return SHA512.hash(key);
}

function compareHash(key, hash) {
  const hashFromKey = getHash(key);
  return hashFromKey === hash;
}

function userLogin(username, password) {
  const result = {
    username,
    email: null,
    firstname: null,
    lastname: null,
    accountExists: null,
    correctPassword: null,
  };
  const storedData = JSON.parse(localStorage.getItem(username));

  if (!storedData) {
    result.accountExists = false;
  } else {
    result.accountExists = true;
    if (compareHash(password, storedData.passwordHash) === true) {
      result.email = storedData.email;
      result.correctPassword = true;
      result.firstname = storedData.firstname;
      result.lastname = storedData.lastname;
    } else {
      result.correctPassword = false;
    }
  }
  return result;
}

function userSignUp(firstname, lastname, username, email, password) {
  try {
    const passwordHash = getHash(password);

    const accountData = {
      passwordHash,
      email,
      username,
      firstname,
      lastname,
    };

    localStorage.setItem(username, JSON.stringify(accountData));

    return userLogin(username, password);
  } catch (exception) {
    // account creation failed
    return null;
  }
}

function isNewUser(username) {
  const storedData = localStorage.getItem(username);

  if (!storedData) {
    /*
    if no such username is found
    return true
    meaning no such user exits
    */
    return true;
  }
  return false;
}

// Create a DEMO USER
function createDemoUser() {
  userSignUp(
    'User',
    'Demo',
    'demouser',
    'demouser@email.com',
    'icyHam$ter48',
  );
}

export {
  userSignUp, userLogin, isNewUser, createDemoUser,
};

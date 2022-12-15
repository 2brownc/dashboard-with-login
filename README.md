# [Dashboard with Login](https://dashboardapp.pages.dev/dashboard)

A frontend mock up of an application with dashboard that requires user authentication. A sign up form with form validation is provided for users wishing to create an account. After login a Dashboard is presented with a list of current projects of the fictional company ACME Inc.

[Click here to view.](https://dashboardapp.pages.dev/dashboard)

## App Overview

### Login Form

* If login is successful, it redirects to the Dashboard.
* If unsuccessful, error message is shown.
* If previous session exists, user is automatically redirected to the Dashboard.

### Signup Form

* Fields in the Signup Form are validated.
* email field validation: checks if the entered email confirms to standard email address format. 
* username field validation: checks if an account with same username exists as user types in the desired username.
* password field validation: checks if the password is strong as in having at least one lowercase letter, one uppercase letter, one number and one symbol. Minimum length of 8 characters is also enforced.
* A popper for helping user choose a strong password.
* Password is stored as hash not plain text.

### Dashboard

* Proteteced page so only authenticated users can view this page.
* Unauthenticated users will be redirected to login page.
* Project information as in total projects, projects compeleted last month and current projects are shown.
* Further information is provided for current projects.

### Header

* Adapts to the current screen size and correctly places the company logo and title.
* Shows username for the logged in user.
* Log out menu for the logged in user.

### 404 Page

* Non existent paths are redirected to a 404 page.

Built on NodeJS using ReactJS, React Router and Material UI.

## App Screenshots

### Login
![App Screenshot - Login](<screenshots/Login.png> "Login Page")

### Sign Up
![App Screenshot - Sign Up](<screenshots/SignUp.png> "Sign Up Page")

### Dashboard
![App Screenshot - Dashboard](<screenshots/Dashboard.png> "Dashboard Page")  

### Project Info Dialog
![App Screenshot - Project Info](<screenshots/ProjectInfo.png> "Project Information")  









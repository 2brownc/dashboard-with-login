# Dashboard with Login

A login form is presented; after successful login a dashboard is loaded. An new account can also be created using the Signup form. 

## Project Overview

### Login Form

* If login is successful, it redirects to the Dashboard.
* If unsuccessful, error message is shown.
* If previous session exists, user is automatically redirected to the Dashboard.

### Signup Form

* Validition for username, password and email.
* A popper for helping user choose a strong password.

### Dashboard

* Proteteced page so only authenticated users can view this page.
* Unauthenticated users will be redirected to login page.
* Project information as in total projects, projects compeleted last month and current projects are shown.
* Further information is provided for current projects.

### Header

* Adapts to the current screen size and correctly places the company logo and title.
* Shows username for the logged in user.
* Log out menu for the logged in user.

Built on NodeJS using ReactJS, React Router and Material UI. 

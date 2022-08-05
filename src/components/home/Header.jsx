import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import WorkIcon from '@mui/icons-material/Work';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Stack from '@mui/material/Stack';
import { useNavigate } from 'react-router-dom';

import UserContext from '../../auth/UserContext';
import { logoutUser } from '../../auth/auth';

const pages = [];

export default function Header() {
  // useNavigate to nagivate through routes
  const reactRouterNavigate = useNavigate();

  // get user login info
  const { user, setUser } = React.useContext(UserContext);

  const handleLogoLinkClick = () => {
    if (user === null) {
      reactRouterNavigate('/', { replace: true });
    } else {
      reactRouterNavigate('../dashboard', { replace: true });
    }
  };

  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  /*
    logout by setting the
    user state as null and
    navigating to the 'login' page
  */
  const logout = () => {
    setAnchorElUser(null);
    setUser(null);
    /*
      clear localStorage
      so user won't be
      automatically logged in afterwards
    */
    logoutUser();

    // navigate back to login page
    reactRouterNavigate('/', { replace: true });
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box
            onClick={handleLogoLinkClick}
            sx={{ cursor: 'pointer' }}
          >
            <Stack
              direction="row"
              spacing={2}
              justifyContent="flex-end"
              alignItems="center"
            >
              <WorkIcon />
              <Typography
                variant="h6"
                noWrap
                component="a"
                sx={{
                  mr: 2,
                  display: { xs: 'none', md: 'flex' },
                  fontFamily: 'monospace',
                  fontWeight: 700,
                  letterSpacing: '.3rem',
                  color: 'inherit',
                  textDecoration: 'none',
                }}
              >
                ACME INC
              </Typography>
            </Stack>
          </Box>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <WorkIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            LOGO
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Button
                key={page}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                {page}
              </Button>
            ))}
          </Box>

          {
            user !== null
            && (
              <Box sx={{ flexGrow: 0 }}>
                <Tooltip title="Profile">
                  <IconButton
                    onClick={handleOpenUserMenu}
                    color="inherit"
                    sx={{ p: 0 }}
                  >
                  <Stack
                    direction="row"
                    alignItems="center"
                    spacing={1}
                  >
                    <AccountCircleIcon />
                    <Typography variant="subtitle1" component="span">
                      {user.username}
                    </Typography>
                  </Stack>
                  </IconButton>
                </Tooltip>
                <Menu
                  sx={{ mt: '45px' }}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  <MenuItem key="logout-button" onClick={logout}>
                    <IconButton>
                      <Typography textAlign="center">Logout</Typography>
                    </IconButton>
                  </MenuItem>
                </Menu>
              </Box>
            )
          }
        </Toolbar>
      </Container>
    </AppBar>
  );
}

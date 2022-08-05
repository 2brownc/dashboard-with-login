import React from 'react';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Fade from '@mui/material/Fade';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import HomeIcon from '@mui/icons-material/Home';

import { useNavigate } from 'react-router-dom';

export default function PageNotFound() {
  // fade in the page
  const [show, setShow] = React.useState(false);
  React.useEffect(() => {
    setTimeout(() => { setShow(true); }, 100);
  }, []);

  /*
    user React Router hook, useNavigate
    to navigate routes
  */
  const reactRouterNavigate = useNavigate();

  const handleGotoHomeButton = () => {
    reactRouterNavigate('../dashboard', { replace: true });
  };

  return (
    <Fade in={show}>
      <Container maxWidth="sm" sx={{ height: 1 }}>
        <Grid
          container
          justifyContent="center"
          alignItems="center"
          sx={{ height: 1 }}
        >
          <Grid item>
            <Paper elevation={3}>
              <Box p={4}>
                <Stack spacing={3}>
                  <Typography variant="h3" component="h3">
                    404 - Page not found
                  </Typography>
                  <Divider />
                  <Button
                    variant="outlined"
                    startIcon={<HomeIcon />}
                    onClick={handleGotoHomeButton}
                  >
                    Go To Home
                  </Button>
                </Stack>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Fade>
  );
}

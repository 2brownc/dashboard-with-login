import React from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import { Outlet } from 'react-router-dom';
import Header from './Header';

export default function Home() {
  return (
    <Box sx={{ height: '90vh' }}>
      <Header />
      <Container mt={3} pt={3} maxWidth="md" sx={{ height: '100%' }}>
        <Outlet />
      </Container>
    </Box>
  );
}

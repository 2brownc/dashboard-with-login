import React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';

import CountCard from './CountCard';
import ProjectCard from './projectcard/ProjectCard';

import { projectData } from '../../data/projects';

export default function DashboardMain() {
  return (
    <Container maxWidth="md">
      <Box>
        <Grid
          container
          spacing={4}
          alignItems="stretch"
        >
          <Grid item xs={6}>
            <CountCard count={128} message="total projects" interval={50} counterPadding={3} />
          </Grid>
          <Grid item xs={6}>
            <CountCard count={12} message="projects this month" interval={500} counterPadding={1} />
          </Grid>
          <Grid item container spacing={2} xs={12}>

            {
              projectData.map((project) => (
                <Grid item>
                  <ProjectCard project={project} />
                </Grid>
              ))
            }
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}

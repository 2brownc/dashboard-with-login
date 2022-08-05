import React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

import CountCard from './CountCard';
import ProjectCard from './projectcard/ProjectCard';

import { projectData } from '../../data/projects';
import UserContext from '../../auth/UserContext';

export default function DashboardMain() {
  // get user info
  const { user } = React.useContext(UserContext);
  return (
    <Box pt={3} pb={3} >
      <Grid
        container
        spacing={4}
        alignItems="stretch"
      >
        <Grid item xs={12}>
          {
            user === null
              ? null
              : (
                <Typography variant="h5" component="div">
                  {`Hello, ${user.firstname}!`}
                </Typography>
              )
          }
        </Grid>
        <Grid item xs={6}>
          <CountCard count={128} message="total projects" interval={50} counterPadding={3} />
        </Grid>
        <Grid item xs={6}>
          <CountCard count={12} message="projects this month" interval={500} counterPadding={1} />
        </Grid>
        <Grid
          item
          container
          justifyContent="center"
          alignItems="center"
          xs={12}
        >
          <Grid item>
            <Typography variant="h6" component="div">
              Current Projects
            </Typography>
          </Grid>
        </Grid>
        <Grid item container spacing={2} xs={12}>

          {
            projectData.map((project) => (
              <Grid item xs={12}>
                <ProjectCard project={project} />
              </Grid>
            ))
          }
        </Grid>
      </Grid>
    </Box>
  );
}

import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import LinearProgress from '@mui/material/LinearProgress';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';

import StarRating from './StarRating';
import ProjectInfoDialog from './ProjectInfoDialog';

export default function ProjectCard({ project }) {
  /*
  whether to show ProjectInfoDialog
  */
  const [projectDialogOpen, setProjectDialogOpen] = React.useState(false);

  /*
  to show ProjectInfoDialog when the button is clicked
  */
  const showProjectDialog = () => {
    setProjectDialogOpen(true);
  };
  return (
    <>
      <Card sx={{ width: 1 }}>
        <CardContent>
          <Grid
            container
            p={2}
            spacing={1}
          >
            <Grid
              container
              alignItems="baseline"
              xs={12}
              spacing={1}
            >
              <Grid item>
                <Typography sx={{ fontSize: '2rem' }}>
                  {project.name}
                </Typography>
              </Grid>
              <Grid item>
                <StarRating rating={project.rating} total={100} />
              </Grid>
            </Grid>

            <Grid item xs={12}>
              <Divider textAlign="right" sx={{ fontVariant: 'small-caps' }}>
                Technologies
              </Divider>
            </Grid>

            <Grid item xs={12}>
              <span>{project.tech.join(', ')}</span>
            </Grid>
            <Grid item xs={12} mt={2}>
              <Divider textAlign="right" sx={{ fontVariant: 'small-caps' }}>
                Progress
              </Divider>
            </Grid>
            <Grid item xs={12}>
              <LinearProgress variant="determinate" value={project.progress} />
            </Grid>
            <Grid
              item
              container
              justifyContent="flex-end"
              alignItems="center"
              xs={12}
              mt={2}
            >
              <Grid item>
                <Button variant="text" onClick={showProjectDialog}>
                  More Info
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
      <ProjectInfoDialog
        project={project}
        open={projectDialogOpen}
        setOpen={setProjectDialogOpen}
      />
    </>
  );
}

import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Divider from '@mui/material/Divider';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  maxWidth: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function ProjectInfoDialog({ project, open, setOpen }) {
  // for when close button is clicked
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
      >
        <Box sx={style}>
          <Stack spacing={3}>
            <Typography variant="h3" component="h3">
              {project.name}
            </Typography>


            <TableContainer component={Paper}>
              <Table>
                <TableBody>
                  <TableRow>
                    <TableCell>Technologies</TableCell>
                    <TableCell>
                      <span>{project.tech.join(', ')}</span>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Domain</TableCell>
                    <TableCell>{project.domain}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Progress</TableCell>
                    <TableCell>{`${project.progress}%`}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Software Audit Review</TableCell>
                    <TableCell>{`${project.rating}/100`}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>

            <Box pl={3} pr={3}>
              <Typography variant="body1" component="div">
                {project.description}
              </Typography>
            </Box>

            <Divider />
            <Stack alignItems="flex-end">
              <Button onClick={handleClose}>Close</Button>
            </Stack>
          </Stack>
        </Box>
      </Modal>
    </div>
  );
}
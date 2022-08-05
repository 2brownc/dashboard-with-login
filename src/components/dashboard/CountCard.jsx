import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';

export default function CountCard({ count, message, interval }) {
  // maintain state of the counter variable
  const [counter, setCounter] = React.useState(0);

  React.useEffect(() => {
    if (counter < count) {
      // keep incrementing counter by given interval
      setTimeout(() => setCounter(counter + 1), interval);
    }
  }, [counter, count, interval]);

  return (
    <Card sx={{ height: '100%' }}>
      <CardContent>
        <Stack
          spacing={4}
          justifyContent="space-evenly"
          direction="row"
        >
          <Box
            sx={{
              fontSize: 'h4.fontSize',
            }}
          >
            {counter}
          </Box>
          <Box
            sx={{
              fontSize: 'h6.fontSize',
              fontVariant: 'small-caps',
            }}
          >
            {message}
          </Box>
        </Stack>
      </CardContent>
    </Card>
  );
}

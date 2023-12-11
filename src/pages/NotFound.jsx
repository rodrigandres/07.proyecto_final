import { Link } from 'react-router-dom'
import { Box, Button, Typography } from '@mui/material'

const Notfound = () => {
  const btnstyle = { margin: '8px 0' }
  return (
    <Box
      sx={{
        width: '100%',
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column'
      }}
    >
      <Typography variant='h3'>404 Not Found anything in this URL</Typography>
      <Link
        to='/'
        style={{
          color: '#3BB77E',
          fontSize: '1.5vmax',
          fontFamily: 'sans-serif',
          padding: '1vmax 0'
        }}
      >
        <Button
          type='submit'
          color='primary'
          variant='contained'
          style={btnstyle}
          fullWidth
        >
          Back To Home
        </Button>
      </Link>
    </Box>
  )
}

export default Notfound

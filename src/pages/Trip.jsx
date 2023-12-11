import Sidenav from '../components/sidenav'
import { Box } from '@mui/material'

const Trip = () => {
  return (
    <>
      <Box sx={{ display: 'flex' }}>
        <Sidenav />
        <Box component='main' sx={{ flexGrow: 1, p: 3 }}>
          <h1>Trips</h1>
        </Box>
      </Box>
    </>
  )
}

export default Trip

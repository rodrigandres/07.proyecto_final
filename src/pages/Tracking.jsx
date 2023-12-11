import Sidenav from '../components/sidenav'
import { Box } from '@mui/material'

const Tracking = () => {
  return (
    <>
      <Box sx={{ display: 'flex' }}>
        <Sidenav />
        <Box component='main' sx={{ flexGrow: 1, p: 3 }}>
          <h1>Tracking</h1>
        </Box>
      </Box>
    </>
  )
}

export default Tracking

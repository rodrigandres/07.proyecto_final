import Sidenav from '../components/sidenav'
import { Box } from '@mui/material'

const Perfil = () => {
  return (
    <>
      <Box sx={{ display: 'flex' }}>
        <Sidenav />
        <Box component='main' sx={{ flexGrow: 1, p: 3 }}>
          <h1>Perfil</h1>
        </Box>
      </Box>
    </>
  )
}

export default Perfil

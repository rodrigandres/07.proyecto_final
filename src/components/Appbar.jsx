import { Link, useLocation } from 'react-router-dom'
import {
  AppBar,
  Button,
  Toolbar,
  Typography
} from '@mui/material'

export default function Appbar () {
  const location = useLocation()
  const { pathname } = location

  const isActive = (route) => {
    return route === pathname ? 'primary' : 'inherit'
  }

  const loginVariant = pathname === '/login' ? 'outlined' : 'contained'
  const signUpVariant = pathname === '/login' ? 'contained' : 'outlined'

  return (
    <AppBar position='static' color='default'>
      <Toolbar>
        <Typography variant='h6' color='inherit' noWrap sx={{ flexGrow: 1 }}>
          Transporte Maple SpA
        </Typography>
        <Button color={isActive('/')} component={Link} to='/'>
          Home
        </Button>
        {/* <Button color={isActive('/contact')} component={Link} to='/contact'>
            Contact
          </Button> */}
        <Button color='primary' variant={loginVariant} component={Link} to='/login'>
          Login
        </Button>
        <Button color='primary' variant={signUpVariant} component={Link} to='/register' sx={{ marginLeft: 1 }}>
          Sign Up
        </Button>
        <Button />
      </Toolbar>
    </AppBar>
  )
}

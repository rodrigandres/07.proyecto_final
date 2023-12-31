import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { Grid, Paper, Avatar, TextField, Button, Typography, Link, FormControlLabel, Checkbox, Box } from '@mui/material'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import { onLogin } from '../../api/authApi'
import { authenticateUser } from '../../redux/slices/authSlice'
import Appbar from '../../components/Appbar'
import Swal from 'sweetalert2'

const Login = () => {
  const paperStyle = { padding: 20, width: 350, margin: 'auto' }
  const avatarStyle = { backgroundColor: '#1bbd7e' }
  const btnstyle = { margin: '8px 0' }

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [values, setValues] = useState({
    email: '',
    password: ''
  })

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value })
  }

  const handleLogin = async (e) => {
    e.preventDefault()

    try {
      const response = await onLogin(values)
      if (response.token) {
        dispatch(authenticateUser({ token: response.token }))
        window.sessionStorage.setItem('token', response.token)
        navigate('/profile/')

        Swal.fire({
          icon: 'success',
          title: 'Inicio de sesión exitoso',
          text: 'Has iniciado sesión correctamente.'
        })
      } else {
        Swal.fire({
          icon: 'info',
          title: 'Información',
          text: '401 Unauthorized: Token Inválido o Expirado'
        })
      }
    } catch (error) {
      console.error('Login error:', error)
      Swal.fire({
        icon: 'error',
        title: 'Error de Inicio de Sesión',
        text: 'Contraseña y/o email inválido.'
      })
    }
  }

  return (
    <>
      <Appbar />
      <Grid container justifyContent='center' alignItems='center' style={{ height: '80vh' }}>
        <Grid item>
          <Paper elevation={10} style={paperStyle}>
            <Box textAlign='center' mb={3} sx={{ borderColor: '#1c2536' }}>
              <Avatar style={avatarStyle}><LockOutlinedIcon /></Avatar>
              <Typography variant='h5'>Sign In</Typography>
            </Box>
            <form onSubmit={handleLogin}>
              <TextField
                label='Email'
                placeholder='test@gmail.com'
                type='email'
                fullWidth
                required
                name='email'
                margin='normal'
                value={values.email}
                onChange={(e) => onChange(e)}
              />
              <TextField
                label='Password'
                placeholder='Enter password'
                type='password'
                fullWidth
                required
                name='password'
                margin='normal'
                value={values.password}
                onChange={(e) => onChange(e)}
              />
              <FormControlLabel
                control={<Checkbox name='checkedB' color='primary' />}
                label='Remember me'
              />
              <Button
                type='submit'
                color='primary'
                variant='contained'
                style={btnstyle}
                fullWidth
              >
                Sign in
              </Button>
            </form>
            <Box mt={2} mb={1} textAlign='center'>
              {/* <Typography>
                <Link href='/notfound'>Forgot password?</Link>
              </Typography> */}
              <Typography>
                Do you have an account? <Link href='/register'>Sign Up</Link>
              </Typography>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </>
  )
}

export default Login

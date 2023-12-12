import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { Grid, Paper, Avatar, TextField, Button, Typography, Link, FormControlLabel, Checkbox, Box } from '@mui/material'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import { onLogin } from '../../api/authApi'
import { authenticateUser } from '../../redux/slices/authSlice'
import Appbar from '../../components/Appbar'

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
      const { token } = await onLogin(values)
      if (token) {
        const userId = token.id
        console.warn('User ID LOGIN', token)
        dispatch(authenticateUser({ token }))
        window.sessionStorage.setItem('token', token)
        navigate(`/profile/${userId}`)
      } else {
        navigate('/')
      }
    } catch (error) {
      console.error('Login error:', error)
    }
  }

  return (
    <>
      <Appbar />
      <Grid container justifyContent='center' alignItems='center' style={{ height: '100vh' }}>
        <Grid item>
          <Paper elevation={10} style={paperStyle}>
            <Box textAlign='center' mb={3}>
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
              <Typography>
                <Link href='/notfound'>Forgot password?</Link>
              </Typography>
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

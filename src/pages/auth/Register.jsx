import { Grid, Button, Typography, TextField, Paper, Avatar, FormControlLabel, Radio, RadioGroup, FormLabel, FormControl, Checkbox, FormHelperText } from '@mui/material'
import { Formik, Field, Form, ErrorMessage } from 'formik'
import { useNavigate } from 'react-router-dom'
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined'
import { registerValidationSchema } from '../../utils/formValidation'
import { registerUser } from '../../api/authApi'
import Appbar from '../../components/Appbar'
import Swal from 'sweetalert2'

const Register = () => {
  const paperStyle = { padding: 20, width: 400, margin: '0 auto', marginTop: 100 }
  const headerStyle = { margin: 0 }
  const avatarStyle = { backgroundColor: '#1bbd7e' }
  const marginTop = { marginTop: 5 }
  const initialValues = {
    name: '',
    email: '',
    gender: '',
    phoneNumber: '',
    password: '',
    confirmPassword: '',
    termsandConditions: ' '
  }
  const navigate = useNavigate()

  const onSubmit = async (values, props) => {
    try {
      const register = await registerUser(values)

      if (register && register.token) {
        window.sessionStorage.setItem('token', register.token)
        navigate('/profile/')
        Swal.fire({
          icon: 'success',
          title: 'Registro Exitoso',
          text: 'Tu cuenta ha sido creada exitosamente.'
        })
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Error de Registro',
          text: 'No se pudo completar el registro.'
        })
      }

      props.resetForm()
      props.setSubmitting(false)
    } catch (error) {
      console.error(error)
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Ocurrió un error durante el registro.'
      })
      props.setSubmitting(false)
    }
  }

  return (
    <>
      <Appbar />
      <Grid>
        <Paper style={paperStyle}>
          <Grid align='center'>
            <Avatar style={avatarStyle}>
              <AddCircleOutlineOutlinedIcon />
            </Avatar>
            <h2 style={headerStyle}>Sign Up</h2>
            <Typography variant='caption' gutterBottom>Please fill this form to create an account !</Typography>
          </Grid>
          <Formik initialValues={initialValues} validationSchema={registerValidationSchema} onSubmit={onSubmit}>
            {(props) => (
              <Form>

                <Field
                  as={TextField} fullWidth name='name' label='Name'
                  placeholder='Enter your name' helperText={<ErrorMessage name='name' />}
                />
                <Field
                  as={TextField} fullWidth name='email' label='Email'
                  placeholder='Enter your email' helperText={<ErrorMessage name='email' />}
                />
                <FormControl component='fieldset' style={marginTop}>
                  <FormLabel component='legend'>Gender</FormLabel>
                  <Field as={RadioGroup} aria-label='gender' name='gender' style={{ display: 'initial' }}>
                    <FormControlLabel value='female' control={<Radio />} label='Female' />
                    <FormControlLabel value='male' control={<Radio />} label='Male' />
                  </Field>
                </FormControl>
                <FormHelperText><ErrorMessage name='gender' /></FormHelperText>
                <Field
                  as={TextField} fullWidth name='phoneNumber' label='Phone Number'
                  placeholder='Enter your phone number' helperText={<ErrorMessage name='phoneNumber' />}
                />
                <Field
                  as={TextField} fullWidth name='password' type='password'
                  label='Password' placeholder='Enter your password'
                  helperText={<ErrorMessage name='password' />}
                />
                <Field
                  as={TextField} fullWidth name='confirmPassword' type='password'
                  label='Confirm Password' placeholder='Confirm your password'
                  helperText={<ErrorMessage name='confirmPassword' />}
                />
                <FormControlLabel
                  control={<Field as={Checkbox} name='termsandConditions' />}
                  label='I accept the terms and conditions.'
                />
                <FormHelperText><ErrorMessage name='termsandConditions' /></FormHelperText>
                <Button
                  type='submit' variant='contained' disabled={props.isSubmitting}
                  color='primary'
                >{props.isSubmitting ? 'Loading' : 'Sign up'}
                </Button>

              </Form>
            )}
          </Formik>
        </Paper>
      </Grid>
    </>
  )
}

export default Register

import * as Yup from 'yup'

export const registerValidationSchema = Yup.object().shape({
  name: Yup.string().min(3, "It's too short").required('Required'),
  email: Yup.string().email('Enter valid email').required('Required'),
  gender: Yup.string().oneOf(['male', 'female'], 'Required').required('Required'),
  phoneNumber: Yup.number().typeError('Enter valid Phone Number').required('Required'),
  password: Yup.string().min(8, 'Password minimum length should be 8').required('Required'),
  confirmPassword: Yup.string().oneOf([Yup.ref('password')], 'Password not matched').required('Required'),
  termsAndConditions: Yup.string().oneOf(['true'], 'Accept terms & conditions')
})

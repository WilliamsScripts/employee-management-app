import * as yup from "yup"

export const loginValidation = yup.object({
  email: yup.string().email().required('Please enter your email'),
  password: yup.string().required('Please enter your password')
}).required()

export const registerValidation = yup.object({
  name: yup.string().required('First name is required'),
  email: yup
    .string()
    .email('Invalid email format')
    .required('Email is required'),
  password: yup.string().required('Password is required'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password')], 'Passwords must match')
    .required('Confirm password is required'),
}).required()
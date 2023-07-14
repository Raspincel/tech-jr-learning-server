import * as yup from 'yup'

export const RegisterSchema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().required(),
  name: yup.string().required(),
})

export const LoginSchema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().required(),
})

export const ResetSchema = yup.object().shape({
  password: yup.string().required()
})
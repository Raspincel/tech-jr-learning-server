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

export const ForgotSchema = yup.object().shape({
  email: yup.string().email().required(),
})

export const ResetSchema = yup.object().shape({
  password: yup.string().required(),
})

yup.addMethod(yup.object, 'atLeastOneOf', function (list) {
  return this.test({
    name: 'atLeastOneOf',
    message:
      'At least one field (email, password or name) is necessary in the body of your requisition',
    exclusive: true,
    params: { keys: list.join(', ') },
    test: (value) =>
      value == null || list.some((f) => value[f] != null && value[f] !== ''),
  })
})

export const UpdateSchema = (yup
  .object()
  .shape({
    email: yup.string().email(),
    password: yup.string(),
    name: yup.string(),
  }) as any)
  .atLeastOneOf(['email', 'password', 'name'])

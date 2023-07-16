import { Request, Response } from 'express'
import registerService from '../services/users/register.service'
import loginService from '../services/users/login.service'
import deleteService from '../services/users/delete.service'
import getUserService from '../services/users/getUser.service'
import sendResetTokenService from '../services/users/sendResetToken.service'
import changePasswordService from '../services/users/changePassword.service'
import updateService from '../services/users/update.service'
import logActionService from '../services/logAction.service'

export async function registerController(req: Request, res: Response) {
  const data = req.body as { email: string; password: string; name: string }

  const user = await registerService(data)
  logActionService({ user: data.email, description: `User ${data.email} created an account`})

  res.status(201).json({ message: 'Usuário criado com sucesso :) ', user })
}

export async function loginController(req: Request, res: Response) {
  const { email } = req.body as { email: string }

  const token = await loginService(email)
  logActionService({ user: email, description: `User ${email} logged in`})

  res.status(200).json({ token })
}

export async function deleteController(req: Request, res: Response) {
  const { id, email } = req.user
  await deleteService(id)
  logActionService({ user: email, description: `User ${email} deleted their account`})
  
  return res.status(200).send()
}

export async function getUserController(req: Request, res: Response) {
  const { id, email } = req.user
  const user = await getUserService(id)

  logActionService({ user: email, description: `User ${email} got informations about their account and received ${user}`})

  return res.status(200).json({ user })
}

export async function sendResetTokenController(req: Request, res: Response) {
  const { email, name } = req.user
  const { message } = sendResetTokenService(email, name) as { message: string }
  logActionService({ user: email, description: `An reset token was sent to ${email}`})

  res.status(202).json({ message })
}

export async function resetPasswordController(req: Request, res: Response) {
  const { email } = req.user
  const { password } = req.body as { password: string }

  const user = await changePasswordService(email, password)
  logActionService({ user: email, description: `User ${email} accessed the sent reset token and changed their password`})

  return res.status(200).json({ user })
}

export async function updateController(req: Request, res: Response) {
  const { email, password, name } = req.body as {
    email: string
    password: string
    name: string
  }

  const user = await updateService(req.user.email, { email, password, name })
  logActionService({ user: email, description: `User ${req.user.email} updated their account. New e-mail: ${email || req.user.email}, new name: ${name || req.user.name}`})

  return res.status(200).json({ user })
}

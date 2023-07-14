import { Router, Request, Response } from 'express'
import registerService from '../services/users/register.service'
import loginService from '../services/users/login.service'
import deleteService from '../services/users/delete.service';
import getUserService from '../services/users/getUser.service';
import sendResetTokenService from '../services/users/sendResetToken.service';
import resetPasswordService from '../services/users/resetPassword.service';

export async function registerController (req: Request, res: Response){
    const data = req.body as { email: string, password: string, name: string }; 
 
    const user = await registerService(data);
    
    res.status(201).json({ message: "Usuário criado com sucesso :) ", user});
}

export async function loginController (req: Request, res: Response) {
    const { email } = req.body as { email: string }

    const token = await loginService(email)

    res.status(200).json({ token})
}

export async function deleteController (req: Request, res: Response) {
    const { id } = req.user
    await deleteService(id)

    return res.status(200).send()
}

export async function getUserController (req: Request, res: Response) {
    const { id } = req.user
    const user = await getUserService(id)

    return res.status(200).json({ user })
}

export async function sendResetTokenController (req: Request, res: Response) {
    const { email, name } = req.user
    const { message } = sendResetTokenService(email, name) as { message: string }

    res.status(202).json({ message })
}

export async function resetPasswordController(req: Request, res: Response) {
    const { email } = req.user 
    const { password } = req.body as { password: string }

    const user = await resetPasswordService(email, password)

    return res.status(200).json({ user })
}
import { Router, Request, Response } from 'express'
import registerService from '../services/users/register.service'

async function registerController (req: Request, res: Response){
    const data = req.body as { email: string, password: string }; 
 
    const user = await registerService(data);
    
    res.status(201).json({ message: "Usuário criado com sucesso :) ", user});
}

export default registerController;
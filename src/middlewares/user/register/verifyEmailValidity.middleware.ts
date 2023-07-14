// import ExpressParameters from '../../../utils/ExpressParameters'
import emailValidator from 'deep-email-validator'
import { Request, Response, NextFunction } from 'express'

export default async function verifyEmailValidity(req: Request, res: Response, next: NextFunction) {
    const { email } = req.body as { email: string };

    const isValidEmail = email.endsWith('@acad.ifma.edu.br');

    if (!isValidEmail) return res.status(401).json({ message: "You must use your academic email to register :("});

    const { valid } = await emailValidator(email);

    if (!valid) return res.status(401).json({ message: "Insert a valid email" });

    next();

}
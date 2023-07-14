import { Request, Response, NextFunction } from "express";
import registerProductService from "../services/products/register.service";

export async function registerProductController(req: Request, res: Response, next: NextFunction) {
    const { email } = req.user
    const data = req.body as { name: string, price: number }

    const product = await registerProductService({ email, data })

    return res.status(201).json({ product })
}
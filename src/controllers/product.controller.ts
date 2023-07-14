import { Request, Response, NextFunction } from "express";
import deleteProductService from "../services/products/delete.service";
import getAllService from "../services/products/getAll.service";
import registerProductService from "../services/products/register.service";

export async function registerProductController(req: Request, res: Response, next: NextFunction) {
    const { email } = req.user
    const data = req.body as { name: string, price: number }

    const product = await registerProductService({ email, data })

    return res.status(201).json({ product })
}

export async function deleteProductController(req: Request, res: Response, next: NextFunction) {
    const { name } = req.params as { name: string }

    await deleteProductService(name)

    return res.status(200).send()
}

export async function getAllController(req: Request, res: Response, next: NextFunction) {
    const { email } = req.user

    const products = await getAllService(email)

    return res.status(200).json({ products })
}   
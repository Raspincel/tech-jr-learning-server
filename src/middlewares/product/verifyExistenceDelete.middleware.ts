import { Request, Response, NextFunction } from "express";
import prisma from "../../database";
import { AppError } from "../../error";

export default async function verifyExistenceDeleteMIddleware(req: Request, res: Response, next: NextFunction) {
    const { email } = req.user
    const { name } = req.params

    const user = await prisma.product.findUnique({
        where: {
            name,
            AND: {
                user: email
            }

        }
    })

    if (!user) throw new AppError(404, "You haven't registered such a product (or have deleted a previous register). Please try with another product", {
        message: `(${req.method}) User tried to delete a product that isn't associated to e-mail address`,
        email: req.user.email
    })

    next()
}
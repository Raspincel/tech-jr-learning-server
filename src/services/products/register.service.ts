import prisma from "../../database";

interface iRegisterProduct {
    email: string
    data: {
        name: string
        price: number
    }
}

export default async function registerProductService({ email, data: { name, price } }: iRegisterProduct) {
    const product = await prisma.product.create({
        data: {
            user: email,
            name, price 
        }
    })

    return { ...product, id: undefined }
}
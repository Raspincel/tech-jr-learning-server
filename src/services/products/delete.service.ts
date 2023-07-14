import prisma from "../../database"

export default async function deleteProductService(name: string) {
    await prisma.product.delete({
        where: {
            name
        }
    })

    return;
}
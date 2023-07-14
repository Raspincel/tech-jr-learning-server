import prisma from "../../database";

export default async function deleteService(id: string) {
    await prisma.user.delete({ where: { id } }) 
}
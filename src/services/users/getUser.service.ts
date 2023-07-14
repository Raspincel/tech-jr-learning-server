import prisma from "../../database";

export default async function getUserService(id: string) {
    const user = await prisma.user.findUnique({
        where: {
            id
        }
    })

    return { ...user, password: undefined }
}
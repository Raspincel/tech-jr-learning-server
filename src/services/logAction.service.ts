import prisma from "../database";

interface iLog {
    user: string;
    description: string
}

export default function logActionService({ user, description }: iLog) {
    prisma.log.create({
        data: { user, description }
    })
}
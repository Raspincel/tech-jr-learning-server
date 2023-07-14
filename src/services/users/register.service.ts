import prisma from "../../database";
import { hash } from 'bcryptjs'

interface iRegister {
    email: string
    password: string
}

export default async function registerService({ email, password }: iRegister) {
    const user = await prisma.user.create({
        data: { 
          email, 
          password: await hash(password, 10)
        }
    });
    
    return { ...user, password: undefined };
}


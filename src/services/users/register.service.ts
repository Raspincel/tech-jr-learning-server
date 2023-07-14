import prisma from "../../database";
import { hash } from 'bcryptjs'

interface iRegister {
    email: string
    password: string,
    name: string
}

export default async function registerService({ email, password, name }: iRegister) {
    const user = await prisma.user.create({
        data: { 
          email, 
          name,
          password: await hash(password, 10)
        }
    });
    
    return { ...user, password: undefined };
}


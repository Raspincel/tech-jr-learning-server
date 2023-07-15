import prisma from '../../database'
import { hash } from 'bcryptjs'

export default async function changePasswordService(email: string, password) {
  const user = await prisma.user.update({
    where: {
      email,
    },
    data: {
      password: await hash(password, 10),
      updatedAt: new Date(),
    },
  })

  return { ...user, password: undefined, id: undefined }
}

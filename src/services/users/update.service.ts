import prisma from '../../database'
import { hash } from 'bcryptjs'

interface iUpdateService {
  email: string
  password: string
  name: string
}

export default async function updateService(
  oldEmail: string,
  { email, password, name }: iUpdateService,
) {
  const user = await prisma.user.update({
    where: {
      email: oldEmail,
    },
    data: {
      password: password ? await hash(password, 10) : password,
      name,
      email,
      updatedAt: new Date(),
    },
  })

  return { ...user, password: undefined, id: undefined }
}

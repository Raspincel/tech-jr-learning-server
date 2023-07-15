import prisma from '../../database'
import { hash } from 'bcryptjs'

export default async function updateService(
  email: string,
  newPassword,
  newName,
  newEmail,
) {
  const user = await prisma.user.update({
    where: {
      email,
    },
    data: {
      password: newPassword ? await hash(newPassword, 10) : newPassword,
      name: newName,
      updatedAt: new Date(),
      email: newEmail,
    },
  })

  return { ...user, password: undefined, id: undefined }
}

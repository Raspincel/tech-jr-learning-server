import prisma from '../../database'

export default async function getAllService(email: string) {
  const products = await prisma.product.findMany({
    where: {
      user: email,
    },
  })

  return products?.map((product) => {
    return { ...product, id: undefined }
  })
}

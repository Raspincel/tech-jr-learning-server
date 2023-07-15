import prisma from '../../database'

export default async function getProductService(name: string) {
  const product = await prisma.product.findFirst({
    where: {
      name,
    },
  })

  return { ...product, id: undefined }
}

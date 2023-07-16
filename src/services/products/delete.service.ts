import prisma from '../../database'

export default async function deleteProductService(name: string) {
    const product =  await prisma.product.delete({
    where: {
      name,
    },
  })

  return product
}

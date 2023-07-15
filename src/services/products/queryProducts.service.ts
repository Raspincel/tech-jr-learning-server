import prisma from '../../database'

export async function queryProductsService({
  name,
  minPrice,
  maxPrice,
  email,
}: {
  name: string
  minPrice: string
  maxPrice: string
  email: string
}) {
  const gte = Number(minPrice) || 0
  const lte = Number(maxPrice) || Number.MAX_VALUE
  const contains = name || ''

  const products = await prisma.product.findMany({
    where: {
      name: {
        contains,
        mode: 'insensitive',
      },
      price: {
        gte,
        lte,
      },
      AND: {
        user: email,
      },
    },
  })

  return products?.map((product) => {
    return { ...product, id: undefined }
  })
}

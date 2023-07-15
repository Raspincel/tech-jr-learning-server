<<<<<<< HEAD
import prisma from "../../database";

export default async function getAllService(email: string) {
    const products = await prisma.product.findMany({
        where: {
            user: email
        }
    })

    return products?.map(product => { 
        return {...product, id: undefined }
    })
}
=======
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
>>>>>>> 42f84e85078bc1ae20128820100f7a69acde9bc8

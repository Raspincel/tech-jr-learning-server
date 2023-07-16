import { Request, Response, NextFunction } from 'express'
import deleteProductService from '../services/products/delete.service'
import getAllService from '../services/products/getAll.service'
import registerProductService from '../services/products/register.service'
import getProductService from '../services/products/getProduct.service'
import { queryProductsService } from '../services/products/queryProducts.service'

import logActionService from '../services/logAction.service'

export async function registerProductController(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const { email } = req.user
  const data = req.body as { name: string; price: number }

  const product = await registerProductService({ email, data })
  logActionService({ user: email, description: "User created a new product"})
  return res.status(201).json({ product })
}

export async function deleteProductController(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const { name } = req.params as { name: string }
  const { email } = req.user

  const product = await deleteProductService(name)
  logActionService({ user: email, description: `User deleted a product: ${product}`})

  return res.status(200).send()
}

export async function getAllController(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const { email } = req.user

  const products = await getAllService(email)
  logActionService({ user: email, description: "User got all products from database "})

  return res.status(200).json({ products })
}

export async function getProductController(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const { name } = req.params
  const { email } = req.user

  const product = await getProductService(name)
  logActionService({ user: email, description: `User got (or at least tried to get) the product ${name} from database and received ${product}`})

  return res.status(200).json({ product })
}

export async function queryProductsController(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const { name, minPrice, maxPrice } = req.query as {
    name: string
    minPrice: string
    maxPrice: string
  }

  const { email } = req.user
  const products = await queryProductsService({
    name,
    minPrice,
    maxPrice,
    email,
  })

  logActionService({ user: email, description: `User queried (or at least tried to query) the database with the queries set as: minPrice=${minPrice}, maxPrice=${maxPrice}, name=${name} and received ${products}`})

  return res.status(200).json({ products })
}

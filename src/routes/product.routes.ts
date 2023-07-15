// schemas
import verifyShape from '../schemas/verifyShape.schema'
import { RegisterSchema } from '../schemas/product.schema'

// middlewares
import validateTokenMiddleware from '../middlewares/validateToken.middleware'
import verifyExistenceRegisterMiddleware from '../middlewares/product/verifyExistenceRegister.middleware'
import verifyExistenceDeleteMiddleware from '../middlewares/product/verifyExistenceDelete.middleware'

// controllers
import {
  deleteProductController,
  getAllController,
  getProductController,
  queryProductsController,
  registerProductController,
} from '../controllers/product.controller'

// routes
import { Router } from 'express'
import { verifyNameMiddleware } from '../middlewares/product/verifyName.middleware'
const productRouter = Router()

productRouter.post(
  '',
  verifyShape(RegisterSchema),
  validateTokenMiddleware,
  verifyExistenceRegisterMiddleware,
  registerProductController,
)

productRouter.delete(
  '/:name',
  validateTokenMiddleware,
  verifyExistenceDeleteMiddleware,
  deleteProductController,
)

productRouter.get('', validateTokenMiddleware, getAllController)

productRouter.get(
  '/one/:name',
  validateTokenMiddleware,
  verifyNameMiddleware,
  getProductController,
)

productRouter.get('/list', validateTokenMiddleware, queryProductsController)

export default productRouter

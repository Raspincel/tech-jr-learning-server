// schemas
import verifyShape from '../schemas/verifyShape.schema'
import { RegisterSchema } from '../schemas/product.schema'

// middlewares
import validateTokenMiddleware from '../middlewares/validateToken.middleware'
import verifyExistenceRegisterMiddleware from '../middlewares/product/verifyExistenceRegister.middleware'
import verifyExistenceDeleteMiddleware from '../middlewares/product/verifyExistenceDelete.middleware'

// controllers
import { deleteProductController, getAllController, registerProductController } from '../controllers/product.controller'

// routes
import { Router } from 'express'
const productRouter = Router()

productRouter.post(
    '', 
    verifyShape(RegisterSchema), 
    validateTokenMiddleware,
    verifyExistenceRegisterMiddleware,
    registerProductController
)

productRouter.delete(
    '/:name',
    validateTokenMiddleware,
    verifyExistenceDeleteMiddleware,
    deleteProductController
)

productRouter.get(
    '/all',
    validateTokenMiddleware,
    getAllController
)

export default productRouter
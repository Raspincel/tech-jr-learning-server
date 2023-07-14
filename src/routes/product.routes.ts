// schemas
import verifyShape from '../schemas/verifyShape.schema'
import { RegisterSchema } from '../schemas/product.schema'

// middlewares
import validateTokenMiddleware from '../middlewares/validateToken.middleware'

// controllers
import { deleteProductController, registerProductController } from '../controllers/product.controller'

// routes
import { Router } from 'express'
const productRouter = Router()

productRouter.post(
    '', 
    verifyShape(RegisterSchema), 
    validateTokenMiddleware,
    registerProductController
)

productRouter.delete(
    '/:name',
    validateTokenMiddleware,
    deleteProductController
)

export default productRouter
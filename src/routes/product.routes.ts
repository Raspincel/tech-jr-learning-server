// schemas
import verifyShape from '../schemas/verifyShape.schema'

// routes
import { Router } from 'express'
import { RegisterSchema } from '../schemas/product.schema'
import validateTokenMiddleware from '../middlewares/validateToken.middleware'
import { registerProductController } from '../controllers/product.controller'
const productRouter = Router()

productRouter.post(
    '', 
    verifyShape(RegisterSchema), 
    validateTokenMiddleware,
    registerProductController
)

export default productRouter
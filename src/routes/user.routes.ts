import { Router } from 'express'
// import { PrismaClient } from '@prisma/client'
// import registerController from '../controllers/register.controller'
import verifyShape from '../schemas/verifyShape.schema'
import { LoginSchema, RegisterSchema } from '../schemas/user.schema'
import verifyEmailValidity from '../middlewares/user/register/verifyEmailValidity.middleware'
import verifyEmailExistMiddleware from '../middlewares/user/login/verifyEmailExist.middleware'
import verifyPasswordMiddleware from '../middlewares/user/login/verifyPassword.middleware'
import {
  registerController,
  loginController,
  deleteController,
  getUserController,
} from '../controllers/user.controller'
import verifyEmailAvailabilityMiddleware from '../middlewares/user/register/verifyEmailAvailability.middleware'
import validateTokenMiddleware from '../middlewares/user/validateToken.middleware'

const userRouter = Router()

userRouter.post(
  '/login',
  verifyShape(LoginSchema),
  verifyEmailExistMiddleware,
  verifyPasswordMiddleware,
  loginController,
)

userRouter.post(
  '/register',
  verifyShape(RegisterSchema),
  verifyEmailAvailabilityMiddleware,
  verifyEmailValidity,
  registerController,
)

userRouter.delete(
  '',
  validateTokenMiddleware,
  deleteController
)

userRouter.get(
  '',
  validateTokenMiddleware,
  getUserController
  )

export default userRouter

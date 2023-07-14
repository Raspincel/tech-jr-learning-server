import { Router } from 'express'
// import { PrismaClient } from '@prisma/client'
// import registerController from '../controllers/register.controller'
import verifyShape from '../schemas/verifyShape.schema'
import {
  ForgotSchema,
  LoginSchema,
  RegisterSchema,
  ResetSchema,
} from '../schemas/user.schema'
import verifyEmailValidity from '../middlewares/user/register/verifyEmailValidity.middleware'
import verifyEmailExistanceMiddleware from '../middlewares/user/login/verifyEmailExistance.middleware'
import verifyEmailAvailabilityMiddleware from '../middlewares/user/register/verifyEmailAvailability.middleware'
import validateTokenMiddleware from '../middlewares/user/validateToken.middleware'

import verifyPasswordMiddleware from '../middlewares/user/login/verifyPassword.middleware'
import {
  registerController,
  loginController,
  deleteController,
  getUserController,
  sendResetTokenController,
  resetPasswordController,
} from '../controllers/user.controller'

const userRouter = Router()

userRouter.post(
  '/register',
  verifyShape(RegisterSchema),
  verifyEmailAvailabilityMiddleware,
  verifyEmailValidity,
  registerController,
)

userRouter.post(
  '/login',
  verifyShape(LoginSchema),
  verifyEmailExistanceMiddleware,
  verifyPasswordMiddleware,
  loginController,
)

userRouter.delete('', validateTokenMiddleware, deleteController)

userRouter.get('', validateTokenMiddleware, getUserController)

userRouter.post(
  '/forgot',
  verifyShape(ForgotSchema),
  verifyEmailExistanceMiddleware,
  sendResetTokenController,
)

userRouter.post(
  '/reset',
  verifyShape(ResetSchema),
  validateTokenMiddleware,
  resetPasswordController,
)

export default userRouter

// schemas
import verifyShape from '../schemas/verifyShape.schema'
import {
  ForgotSchema,
  LoginSchema,
  RegisterSchema,
  ResetSchema,
  UpdateSchema,
} from '../schemas/user.schema'

// middlewares
import verifyEmailValidity from '../middlewares/user/register/verifyEmailValidity.middleware'
import verifyEmailExistanceMiddleware from '../middlewares/user/login/verifyEmailExistence.middleware'
import verifyEmailAvailabilityMiddleware from '../middlewares/user/register/verifyEmailAvailability.middleware'
import validateTokenMiddleware from '../middlewares/validateToken.middleware'
import verifyPasswordMiddleware from '../middlewares/user/login/verifyPassword.middleware'
import verifyEmailIntegrity from '../middlewares/user/update/verifyEmailIntegrity.middleware'
import verifyDataRepetition from '../middlewares/user/update/verifyDataRepetition.middleware'

// controllers
import {
  registerController,
  loginController,
  deleteController,
  getUserController,
  sendResetTokenController,
  resetPasswordController,
  updateController,
} from '../controllers/user.controller'

// routes
import { Router } from 'express'
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

userRouter.patch(
  '',
  verifyShape(UpdateSchema),
  verifyEmailIntegrity,
  validateTokenMiddleware,
  verifyDataRepetition,
  updateController,
)

export default userRouter

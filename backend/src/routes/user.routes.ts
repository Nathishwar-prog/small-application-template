import { Router } from 'express';
import { UserController } from '../controllers/user.controller';
import { UserService } from '../services/user.service';
import { UserRepository } from '../repositories/user.repository';
import { validate } from '../validators/validate.middleware';
import { authenticate, requireRole, requirePermission } from '../auth/auth.middleware';
import { createUserSchema, updateUserSchema, userIdParamSchema } from '../validators/user.validation';
import { asyncHandler } from '../errors/async.handler';

const router = Router();

// Instantiate dependencies manually to show Dependency Injection (DI) setup
const userRepository = new UserRepository();
const userService = new UserService(userRepository);
const userController = new UserController(userService);

// --- Public Endpoints ---
router.post(
  '/register',
  validate({ body: createUserSchema }),
  asyncHandler(userController.register)
);

router.post(
  '/login',
  asyncHandler(userController.login)
);

router.post(
  '/refresh',
  asyncHandler(userController.refresh)
);

router.post(
  '/logout',
  asyncHandler(userController.logout)
);

// --- Protected Endpoints ---
router.get(
  '/me',
  authenticate,
  asyncHandler(userController.getProfile)
);

router.patch(
  '/me',
  authenticate,
  validate({ body: updateUserSchema }),
  asyncHandler(userController.updateProfile)
);

// --- Admin / Management Endpoints ---
router.get(
  '/',
  authenticate,
  requireRole(['ADMIN', 'SUPER_ADMIN']),
  asyncHandler(userController.getUserList)
);

router.delete(
  '/:id',
  authenticate,
  requireRole(['SUPER_ADMIN']),
  requirePermission(['users:delete']),
  validate({ params: userIdParamSchema }),
  asyncHandler(userController.deleteUser)
);

export default router;
export { router as userRouter };

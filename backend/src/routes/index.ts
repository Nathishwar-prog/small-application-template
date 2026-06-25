import { Router } from 'express';
import { userRouter } from './user.routes';

const router = Router();

// Mount user and authentication routes
// In a real application, you can split authentication routes into auth.routes.ts
// For this template, user-related CRUD and Auth endpoints are consolidated in userRouter
router.use('/users', userRouter);
router.use('/auth', userRouter); // login, register, refresh, logout

export default router;

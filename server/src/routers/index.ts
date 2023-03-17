import { Router } from 'express';
import authRouter from './auth.router';
import feedbackRouter from './feedback.router';
import itemRouter from './item.router';
import userRouter from './user.router';

const router = Router();

router.use('/user', userRouter);
router.use('/auth', authRouter);
router.use('/item', itemRouter);
router.use('/feedback', feedbackRouter)

export default router
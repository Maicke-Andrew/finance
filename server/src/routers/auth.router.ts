import { Router } from "express";
import authController from "../controllers/auth.controller";

const authRouter = Router()

authRouter.post('/login', authController.makeLogin);
authRouter.post('/validate', authController.doValidateToken);
authRouter.post('/emailAlreadyUsed', authController.emailAlreadyUsed)
authRouter.post('/loginAlreadyUsed', authController.loginAlreadyUsed)

export default authRouter
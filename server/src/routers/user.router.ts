import { Router } from "express";
import upload from "../config/multer";
import userController from "../controllers/user.controller";

const userRouter = Router()

userRouter.post('/enterWithGoogle', userController.enterWithGoogle);
userRouter.post('/sendEmail', userController.sendEmail);
userRouter.post('/emailNewPassword', userController.emailNewPassword);
userRouter.get('/confirmAccount', userController.confirmAccount);
userRouter.post('/emailNewPassword', userController.emailNewPassword);
userRouter.get('/newPassword', userController.newPassword);
userRouter.post('/newPassword', userController.changePassword);
userRouter.post('/logout', userController.logout);
userRouter.post('/newPicture', upload.single('file'), userController.updateImg);
userRouter.post('/getPicture', userController.getImg);

export default userRouter
import { Router } from "express";
import userController from "../controllers/user.controller";
import multer from "multer";
import { fileMulter } from "../middlewares/global.middlewares";

const userRouter = Router()
const upload = multer({ storage: fileMulter })

userRouter.post('/enterWithGoogle', userController.enterWithGoogle);
userRouter.post('/sendEmail', userController.sendEmail);
userRouter.post('/emailNewPassword', userController.emailNewPassword);
userRouter.get('/confirmAccount', userController.confirmAccount);
userRouter.post('/emailNewPassword', userController.emailNewPassword);
userRouter.get('/newPassword', userController.newPassword);
userRouter.post('/newPassword', userController.changePassword);
userRouter.post('/logout', userController.logout);
userRouter.post('/newPicture', upload.single('file'), userController.updateImg);

export default userRouter
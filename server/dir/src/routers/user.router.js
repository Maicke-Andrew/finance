"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const multer_1 = __importDefault(require("../config/multer"));
const user_controller_1 = __importDefault(require("../controllers/user.controller"));
const userRouter = (0, express_1.Router)();
userRouter.post('/enterWithGoogle', user_controller_1.default.enterWithGoogle);
userRouter.post('/sendEmail', user_controller_1.default.sendEmail);
userRouter.post('/emailNewPassword', user_controller_1.default.emailNewPassword);
userRouter.get('/confirmAccount', user_controller_1.default.confirmAccount);
userRouter.post('/emailNewPassword', user_controller_1.default.emailNewPassword);
userRouter.get('/newPassword', user_controller_1.default.newPassword);
userRouter.post('/newPassword', user_controller_1.default.changePassword);
userRouter.post('/logout', user_controller_1.default.logout);
userRouter.post('/newPicture', multer_1.default.single('file'), user_controller_1.default.updateImg);
exports.default = userRouter;

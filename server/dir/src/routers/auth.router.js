"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_controller_1 = __importDefault(require("../controllers/auth.controller"));
const authRouter = (0, express_1.Router)();
authRouter.post('/login', auth_controller_1.default.makeLogin);
authRouter.post('/validate', auth_controller_1.default.doValidateToken);
authRouter.post('/emailAlreadyUsed', auth_controller_1.default.emailAlreadyUsed);
authRouter.post('/loginAlreadyUsed', auth_controller_1.default.loginAlreadyUsed);
exports.default = authRouter;

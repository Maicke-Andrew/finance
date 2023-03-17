"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const global_middlewares_1 = require("../middlewares/global.middlewares");
const auth_service_1 = require("../services/auth.service");
const authController = {
    makeLogin: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const response = yield (0, auth_service_1.login)(req);
            if (response.error) {
                return res.status(501).send(response.error);
            }
            return res.status(201).send(response);
        }
        catch (e) {
            return res.send(e);
        }
    }),
    doValidateToken: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const response = yield (0, global_middlewares_1.validateToken)(req.body.token);
            if (response.error) {
                return res.status(501).send(response.error);
            }
            return res.status(201).send(response);
        }
        catch (e) {
            return res.send(e);
        }
    }),
    emailAlreadyUsed: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const response = yield (0, auth_service_1.emailUsedOrNot)(req.body.email);
            if (response.error) {
                return res.status(501).send(response.error);
            }
            return res.status(201).send(response);
        }
        catch (e) {
            return res.send(e);
        }
    }),
    loginAlreadyUsed: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const response = yield (0, auth_service_1.loginUsedOrNot)(req.body.login);
            if (response.error) {
                return res.status(501).send(response.error);
            }
            return res.status(201).send(response);
        }
        catch (e) {
            return res.send(e);
        }
    })
};
exports.default = authController;

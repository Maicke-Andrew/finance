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
const user_service_1 = require("../services/user.service");
const userController = {
    enterWithGoogle: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const response = yield (0, user_service_1.googleAuthentic)(req.body.token);
            if (response.error) {
                return res.status(400).send(response.error);
            }
            return res.status(201).send(response);
        }
        catch (e) {
            return res.status(500).send(e);
        }
    }),
    sendEmail: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const response = yield (0, user_service_1.sendEmailNewAccount)(req.body);
            if (response.error) {
                return res.status(400).send(response.error);
            }
            return res.status(201).send(response);
        }
        catch (e) {
            return res.status(500).send(e);
        }
    }),
    confirmAccount: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const response = yield (0, user_service_1.confirmAccountByLink)(req.query.token);
            if (response.newToken) {
                res.cookie('token', response.newToken, { maxAge: 86400, secure: true });
            }
            if (response.nameCookie) {
                res.cookie(response.nameCookie, response.response, { maxAge: 10 * 60 * 100 });
            }
            if (!response.nameCookie || !response.newToken) {
                return res.status(400).send(response);
            }
            return res.status(201).redirect(response.redirectUrl);
        }
        catch (e) {
            return res.status(500).send(e);
        }
    }),
    emailNewPassword: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const response = yield (0, user_service_1.emailUpdatePassword)(req, res);
            res.cookie('token', response.token, { maxAge: 10 * 60 * 1000 });
            if (response.error) {
                return res.status(400).send(response);
            }
            return res.status(201).send(response.response);
        }
        catch (e) {
            return res.status(500).send(e);
        }
    }),
    newPassword: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const response = yield (0, user_service_1.newPasswordRedirect)(req.query.token);
            if (response.nameCookie) {
                res.cookie(response.nameCookie, response.response, { maxAge: 10 * 60 * 1000 });
            }
            else {
                res.cookie('userToken', response.token, { maxAge: 10 * 60 * 1000 });
            }
            if (response.error) {
                return res.status(400).send(response);
            }
            return res.status(201).redirect(response.redirectUrl);
        }
        catch (e) {
            return res.status(500).send(e);
        }
    }),
    changePassword: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const response = yield (0, user_service_1.updatePassword)(req.body.token, req.body.password);
            if (response.error) {
                return res.status(400).send(response);
            }
            return res.status(201).send(response);
        }
        catch (e) {
            return res.status(500).send(e);
        }
    }),
    updateImg: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const response = yield (0, user_service_1.updateImage)(req.body.userId, req.file.location);
            if (response.error) {
                return res.status(400).send(response);
            }
            return res.status(201).send(response);
        }
        catch (e) {
            return res.status(500).send(e);
        }
    }),
    logout: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            return res.status(201).send('sucefully logout');
        }
        catch (e) {
            return res.status(500).send(e);
        }
    }),
};
exports.default = userController;

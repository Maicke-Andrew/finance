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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginWithGoogle = exports.validateTokenPass = exports.loginUsedOrNot = exports.emailUsedOrNot = exports.login = void 0;
const bcrypt = require('bcrypt');
const user_1 = __importDefault(require("../models/user"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const temporaryUser_1 = __importDefault(require("../models/temporaryUser"));
const login = (req) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { login, password } = req.body;
        const user = yield user_1.default.findOne({ login: login }).select("+password");
        if (!user) {
            return { error: "User or Password not found" };
        }
        const passwordIsValid = bcrypt.compareSync(password, user.password);
        if (!passwordIsValid) {
            return { error: "User or Password not found" };
        }
        const token = jsonwebtoken_1.default.sign({ id: user._id }, process.env.SECRET_JWT, { expiresIn: 86400 });
        return { user, token };
    }
    catch (e) {
        return { error: e };
    }
});
exports.login = login;
const emailUsedOrNot = (email) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield user_1.default.findOne({ email: email });
        if (user) {
            return { error: 'Email is already in use' };
        }
        const userTemporary = yield temporaryUser_1.default.findOne({ email: email });
        if (userTemporary) {
            return { error: 'You start create account recently with this email, check your email for validate your account' };
        }
        return false;
    }
    catch (e) {
        return { error: e };
    }
});
exports.emailUsedOrNot = emailUsedOrNot;
const loginUsedOrNot = (login) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield user_1.default.findOne({ login: login });
        if (user) {
            return { error: 'Login is alredy in used' };
        }
        const userTemporary = yield temporaryUser_1.default.findOne({ login: login });
        if (userTemporary) {
            return { error: 'This login was sent recently, if it was you, wait a moment or check your email' };
        }
        return true;
    }
    catch (e) {
        return { error: e };
    }
});
exports.loginUsedOrNot = loginUsedOrNot;
const validateTokenPass = (token) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!token) {
            return { error: 'Has no token try again' };
        }
        try {
            yield jsonwebtoken_1.default.verify(token, process.env.SECRET_JWT);
        }
        catch (_a) {
            return { error: 'Token has expired try again' };
        }
        return true;
    }
    catch (e) {
        return { error: e };
    }
});
exports.validateTokenPass = validateTokenPass;
const loginWithGoogle = (req) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { login, password } = req;
        const user = yield user_1.default.findOne({ login: login }).select("+password");
        if (!user) {
            return { error: "User or Password not found" };
        }
        const passwordIsValid = bcrypt.compareSync(password, user.password);
        if (!passwordIsValid) {
            return { error: "User or Password not found" };
        }
        const token = jsonwebtoken_1.default.sign({ id: user._id }, process.env.SECRET_JWT, { expiresIn: 86400 });
        return { user, token };
    }
    catch (e) {
        return { error: e };
    }
});
exports.loginWithGoogle = loginWithGoogle;

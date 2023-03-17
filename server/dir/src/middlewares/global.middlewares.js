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
exports.fileMulter = exports.validateToken = exports.validUser = exports.validId = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const path_1 = __importDefault(require("path"));
const user_1 = __importDefault(require("../models/user"));
// const multer = require('multer');
const multer_1 = __importDefault(require("multer"));
const jwt = require('jsonwebtoken');
const validId = (req, res, next) => {
    try {
        const id = req.params.id;
        if (!mongoose_1.default.Types.ObjectId.isValid(id)) {
            return res.status(400).send({ message: "id invalido" });
        }
        next();
    }
    catch (err) {
        res.satus(500).send({ message: err.message });
    }
};
exports.validId = validId;
const validUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const user = yield user_1.default.findById(id);
        if (!user) {
            return res.status(404).send({ message: "usuário não encontrado" });
        }
        req.id = id;
        req.user = user;
        next();
    }
    catch (err) {
        res.satus(500).send({ message: err.message });
    }
});
exports.validUser = validUser;
const validateToken = (token) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!token) {
            return "Has no token";
        }
        const id = jwt.verify(token, process.env.SECRET_JWT);
        if (!id) {
            return "token expired";
        }
        const user = yield user_1.default.findById(id).select('+pasword');
        if (!user) {
            return 'error';
        }
        return user;
    }
    catch (err) {
        return err;
    }
});
exports.validateToken = validateToken;
exports.fileMulter = multer_1.default.diskStorage({
    destination: (req, file, cb) => {
        const uploadsDir = path_1.default.join(__dirname, `../../uploads/${req.body.dest}`);
        cb(null, uploadsDir);
    },
    filename: (req, file, cb) => {
        const time = new Date();
        const formatedTime = `${time.getFullYear()}-${time.getMonth() + 1}-${time.getDate()}_${time.getHours()};${time.getMinutes()};${time.getSeconds()}`;
        cb(null, `${formatedTime}_${file.originalname}`);
    }
});

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const userSchema = new mongoose_1.default.Schema({
    id: {
        type: String,
        default: () => Math.random().toString(36).substr(2, 9),
        unique: true
    },
    name: {
        type: String,
        required: true,
    },
    surname: {
        type: String,
        required: true,
    },
    login: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true,
        select: false
    },
    pictureUrl: {
        type: String,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
});
const temporaryUser = mongoose_1.default.model('temporaryUser', userSchema);
exports.default = temporaryUser;

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// const mongoose = require('mongoose');
const mongoose_1 = __importDefault(require("mongoose"));
const connectDatabase = () => {
    console.log('Conneting to DataBase');
    mongoose_1.default.connect(process.env.MONGODB_CONNECT).then(() => console.log("DB Connected"))
        .catch((error) => console.log(error));
};
exports.default = connectDatabase;

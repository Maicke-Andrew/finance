"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const connectDatabase = () => {
    console.log('Conneting to DataBase');
    mongoose_1.default.connect('mongodb+srv://admin:maickeandrew23@financasdb.f0sexnb.mongodb.net/allDB?retryWrites=true&w=majority').then(() => console.log("DB Connected"))
        .catch((e) => console.log(e));
};
exports.default = connectDatabase;

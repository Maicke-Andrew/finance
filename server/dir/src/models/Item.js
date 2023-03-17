"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const ItemSchema = new mongoose_1.default.Schema({
    userId: {
        type: String,
        require: true,
        select: false
    },
    category: {
        type: String,
    },
    value: {
        type: Number,
        required: true,
    },
    title: {
        type: String,
        require: true
    },
    installments: {
        type: Array
    },
    receive: {
        type: Boolean,
        required: true
    },
    createAt: {
        type: Date,
        default: () => Date.now() - 3 * 60 * 60 * 1000,
        required: true
    }
});
const Item = mongoose_1.default.model('item', ItemSchema);
exports.default = Item;

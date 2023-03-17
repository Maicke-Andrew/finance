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
exports.updateItem = exports.deleteItemById = exports.getAllUserItem = exports.createItem = void 0;
const Item_1 = __importDefault(require("../models/Item"));
const createItem = (reqItem) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId, category, value, title, installments, receive } = reqItem;
        if (!userId || !category || !value || receive === null || !title || !installments) {
            return { error: "Some required input empty" };
        }
        const response = yield Item_1.default.insertMany(reqItem);
        if (!response) {
            return { error: 'some error with the insert' };
        }
        return response;
    }
    catch (e) {
        return { error: e };
    }
});
exports.createItem = createItem;
const getAllUserItem = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!id) {
            return { error: 'Need to pass id' };
        }
        const items = yield Item_1.default.find({ userId: id });
        return items;
    }
    catch (e) {
        return { error: e };
    }
});
exports.getAllUserItem = getAllUserItem;
const deleteItemById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!id) {
            return { error: 'id is missing' };
        }
        const response = yield Item_1.default.deleteOne({ _id: id });
        if (!response) {
            return { error: 'some problem to delete' };
        }
        return response;
    }
    catch (e) {
        return { error: e };
    }
});
exports.deleteItemById = deleteItemById;
const updateItem = (reqItem) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!reqItem) {
            return { error: "item is missing" };
        }
        const response = yield Item_1.default.updateOne({ _id: reqItem._id }, reqItem);
        if (!response) {
            return { error: 'some problem to update' };
        }
        return response;
    }
    catch (e) {
        return { error: e };
    }
});
exports.updateItem = updateItem;

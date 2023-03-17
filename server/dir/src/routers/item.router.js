"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const item_controller_1 = __importDefault(require("../controllers/item.controller"));
const global_middlewares_1 = require("../middlewares/global.middlewares");
const itemRouter = (0, express_1.Router)();
itemRouter.post('/create/:id', global_middlewares_1.validId, item_controller_1.default.create);
itemRouter.get('/items/:id', global_middlewares_1.validId, item_controller_1.default.getUserItems);
itemRouter.delete('/delete/:id', global_middlewares_1.validId, item_controller_1.default.delete);
itemRouter.patch('/update/:id', global_middlewares_1.validId, item_controller_1.default.update);
exports.default = itemRouter;

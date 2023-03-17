"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_router_1 = __importDefault(require("./auth.router"));
const feedback_router_1 = __importDefault(require("./feedback.router"));
const item_router_1 = __importDefault(require("./item.router"));
const user_router_1 = __importDefault(require("./user.router"));
const router = (0, express_1.Router)();
router.use('/user', user_router_1.default);
router.use('/auth', auth_router_1.default);
router.use('/item', item_router_1.default);
router.use('/feedback', feedback_router_1.default);
exports.default = router;

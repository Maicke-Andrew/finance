"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const multer_1 = __importDefault(require("multer"));
const feedback_controller_1 = __importDefault(require("../controllers/feedback.controller"));
const global_middlewares_1 = require("../middlewares/global.middlewares");
const upload = (0, multer_1.default)({ storage: global_middlewares_1.fileMulter });
const feedbackRouter = (0, express_1.Router)();
feedbackRouter.post('/sendFeedback', upload.array('files', 10), feedback_controller_1.default.sendFeedback);
exports.default = feedbackRouter;

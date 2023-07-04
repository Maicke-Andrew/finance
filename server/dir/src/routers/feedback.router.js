"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const feedback_controller_1 = __importDefault(require("../controllers/feedback.controller"));
const feedbackRouter = (0, express_1.Router)();
feedbackRouter.post('/sendFeedback', feedback_controller_1.default.sendFeedback);
exports.default = feedbackRouter;

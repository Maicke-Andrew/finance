"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const FeedbackSchema = new mongoose_1.default.Schema({
    text: {
        type: String,
    },
    src: {
        type: Array,
    },
    userEmail: {
        type: String,
        require: true,
    },
    createAt: {
        type: Date,
        default: () => Date.now() - 3 * 60 * 60 * 1000,
        required: true
    }
});
const Feedback = mongoose_1.default.model('feedback', FeedbackSchema);
exports.default = Feedback;
